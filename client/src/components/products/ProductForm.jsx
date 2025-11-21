import { useEffect, useState } from 'react'
import './ProductForm.css'

export default function ProductForm({ open, onClose, onSave, initial }){
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  useEffect(()=>{
    if(initial){
      setName(initial.name||'')
      setPrice(String(initial.price||''))
    }else{
      setName('')
      setPrice('')
    }
  },[initial, open])

  if(!open) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e)=>e.stopPropagation()}>
        <div className="modal-header">
          <strong>{initial? 'Edit Product' : 'Add Product'}</strong>
          <button className="icon-btn" onClick={onClose}><span className="material-symbols-outlined">close</span></button>
        </div>
        <div className="modal-body">
          <div className="field">
            <label className="label">Name</label>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Product name" />
          </div>
          <div className="field">
            <label className="label">Price</label>
            <input className="input" type="number" value={price} onChange={e=>setPrice(e.target.value)} placeholder="0.00" />
          </div>
        </div>
        <div className="modal-footer">
          <button className="button outline" onClick={onClose}><span className="material-symbols-outlined">close</span>Cancel</button>
          <button className="button" onClick={()=>onSave({name, price: parseFloat(price||'0')})}><span className="material-symbols-outlined">check</span>Save</button>
        </div>
      </div>
    </div>
  )
}
