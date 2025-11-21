import { useMemo, useState } from 'react'
import './ProductTable.css'
import ProductForm from './ProductForm.jsx'
import { useToast } from '../../providers/ToastProvider.jsx'

export default function ProductTable(){
  const { push } = useToast()
  const [items, setItems] = useState([
    { id: 1, name: 'iPhone 15', price: 999.00 },
    { id: 2, name: 'Running Shoes', price: 69.99 },
  ])
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const nextId = useMemo(()=> (items.reduce((m,i)=>Math.max(m,i.id),0)+1),[items])

  const openAdd = ()=>{ setEditing(null); setModalOpen(true) }
  const openEdit = (row)=>{ setEditing(row); setModalOpen(true) }
  const onDelete = (id)=>{
    if(confirm('Delete this product?')){
      setItems(prev=>prev.filter(i=>i.id!==id))
      push({ type:'success', title:'Product deleted', message:`Removed product #${id}` })
    }
  }
  const onSave = (data)=>{
    if(editing){
      setItems(prev=>prev.map(i=>i.id===editing.id? {...i,...data} : i))
      push({ type:'success', title:'Product updated', message:data.name })
    }else{
      setItems(prev=>[...prev,{ id: nextId, ...data }])
      push({ type:'success', title:'Product added', message:data.name })
    }
    setModalOpen(false)
  }

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
        <div className="th">Manage Products</div>
        <button className="button" onClick={openAdd}><span className="material-symbols-outlined">add</span>Add Product</button>
      </div>

      <div className="tr th">
        <div>SR No</div>
        <div>Name</div>
        <div>Price</div>
        <div style={{textAlign:'right'}}>Actions</div>
      </div>
      {items.map((row, idx)=> (
        <div className="tr" key={row.id}>
          <div className="td">{idx+1}</div>
          <div className="td">{row.name}</div>
          <div className="td" style={{color:'var(--muted)'}}>${row.price.toFixed(2)}</div>
          <div className="actions">
            <button className="icon-btn" onClick={()=>openEdit(row)} title="Edit"><span className="material-symbols-outlined">edit</span></button>
            <button className="icon-btn danger" onClick={()=>onDelete(row.id)} title="Delete"><span className="material-symbols-outlined">delete</span></button>
          </div>
        </div>
      ))}

      <ProductForm open={modalOpen} onClose={()=>setModalOpen(false)} onSave={onSave} initial={editing} />
    </div>
  )
}
