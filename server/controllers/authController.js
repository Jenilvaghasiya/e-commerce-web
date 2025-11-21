import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

const signToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password, number, address, city, status = true, country } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "name, email, password required" });
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(409).json({ message: "Email already registered" });
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, passwordHash, number, address, city, status, country });
    const token = signToken(user);
    res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, number: user.number, address: user.address, city: user.city, status: user.status, country: user.country } });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "email and password required" });
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });
    const token = signToken(user);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
