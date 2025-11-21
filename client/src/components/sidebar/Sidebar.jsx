import './Sidebar.css'

export default function Sidebar({ onSelect, activeTab }){
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="material-symbols-outlined">storefront</span>
        <span className="title">E-Commerce</span>
      </div>

      <nav className="nav">
        <button className={`nav-item ${activeTab==='categories'?'active':''}`} onClick={()=>onSelect('categories')}>
          <span className="material-symbols-outlined">category</span>
          <span>Categories</span>
        </button>
        <button className={`nav-item ${activeTab==='products'?'active':''}`} onClick={()=>onSelect('products')}>
          <span className="material-symbols-outlined">inventory_2</span>
          <span>Products</span>
        </button>
      </nav>

      <div className="bottom-zone">
        <button className="logout">
          <span className="material-symbols-outlined">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
