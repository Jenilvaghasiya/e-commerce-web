import { useEffect, useState } from 'react'
import './CategoryForm.css'

export default function CategoryForm({ open, onClose, onSave, initial }){
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(()=>{
    if(initial){
      setName(initial.name||'')
      setDescription(initial.description||'')
    }else{
      setName('')
      setDescription('')
    }
  },[initial, open])

  if(!open) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e)=>e.stopPropagation()}>
        <div className="modal-header">
          <strong>{initial? 'Edit Category' : 'Add Category'}</strong>
          <button className="icon-btn" onClick={onClose}><span className="material-symbols-outlined">close</span></button>
        </div>
        <div className="modal-body">
          <div className="field">
            <label className="label">Name</label>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Category name" />
          </div>
          <div className="field">
            <label className="label">Description</label>
            <textarea className="textarea" value={description} onChange={e=>setDescription(e.target.value)} placeholder="Optional description" />
          </div>
        </div>
        <div className="modal-footer">
          <button className="button outline" onClick={onClose}><span className="material-symbols-outlined">close</span>Cancel</button>
          <button className="button" onClick={()=>onSave({name, description})}><span className="material-symbols-outlined">check</span>Save</button>
        </div>
      </div>
    </div>
  )
}
