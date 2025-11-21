import { useMemo, useState } from 'react'
import './CategoryTable.css'
import CategoryForm from './CategoryForm.jsx'
import { useToast } from '../../providers/ToastProvider.jsx'

export default function CategoryTable(){
  const { push } = useToast()
  const [items, setItems] = useState([
    { id: 1, name: 'Electronics', description: 'Gadgets and devices' },
    { id: 2, name: 'Fashion', description: 'Clothing and accessories' },
  ])
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const nextId = useMemo(()=> (items.reduce((m,i)=>Math.max(m,i.id),0)+1),[items])

  const openAdd = ()=>{ setEditing(null); setModalOpen(true) }
  const openEdit = (row)=>{ setEditing(row); setModalOpen(true) }
  const onDelete = (id)=>{
    if(confirm('Delete this category?')){
      setItems(prev=>prev.filter(i=>i.id!==id))
      push({ type:'success', title:'Category deleted', message:`Removed category #${id}` })
    }
  }
  const onSave = (data)=>{
    if(editing){
      setItems(prev=>prev.map(i=>i.id===editing.id? {...i,...data} : i))
      push({ type:'success', title:'Category updated', message:data.name })
    }else{
      setItems(prev=>[...prev,{ id: nextId, ...data }])
      push({ type:'success', title:'Category added', message:data.name })
    }
    setModalOpen(false)
  }

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
        <div className="th">Manage Categories</div>
        <button className="button" onClick={openAdd}><span className="material-symbols-outlined">add</span>Add Category</button>
      </div>

      <div className="tr th">
        <div>SR No</div>
        <div>Name</div>
        <div>Description</div>
        <div style={{textAlign:'right'}}>Actions</div>
      </div>
      {items.map((row, idx)=> (
        <div className="tr" key={row.id}>
          <div className="td">{idx+1}</div>
          <div className="td">{row.name}</div>
          <div className="td" style={{color:'var(--muted)'}}>{row.description||'-'}</div>
          <div className="actions">
            <button className="icon-btn" onClick={()=>openEdit(row)} title="Edit"><span className="material-symbols-outlined">edit</span></button>
            <button className="icon-btn danger" onClick={()=>onDelete(row.id)} title="Delete"><span className="material-symbols-outlined">delete</span></button>
          </div>
        </div>
      ))}

      <CategoryForm open={modalOpen} onClose={()=>setModalOpen(false)} onSave={onSave} initial={editing} />
    </div>
  )
}
