import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import './toast.css'

const ToastContext = createContext(null)

export function ToastProvider({ children }){
  const [toasts, setToasts] = useState([])

  const remove = useCallback((id)=> setToasts(prev=>prev.filter(t=>t.id!==id)),[])

  const push = useCallback((t)=>{
    const id = Math.random().toString(36).slice(2)
    const toast = { id, title: t.title || '', message: t.message || '', type: t.type || 'success', timeout: t.timeout ?? 2200 }
    setToasts(prev=>[...prev, toast])
    if(toast.timeout>0){
      setTimeout(()=> remove(id), toast.timeout)
    }
    return id
  },[remove])

  const value = useMemo(()=>({ push, remove }),[push, remove])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-container">
        {toasts.map(t=> (
          <div key={t.id} className={`toast ${t.type}`}>
            <div className="toast-icon">
              <span className="material-symbols-outlined">{t.type==='success'?'check_circle':'info'}</span>
            </div>
            <div className="toast-body">
              {t.title && <div className="toast-title">{t.title}</div>}
              {t.message && <div className="toast-message">{t.message}</div>}
            </div>
            <button className="toast-close" onClick={()=>remove(t.id)}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(){
  const ctx = useContext(ToastContext)
  if(!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
