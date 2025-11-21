import { useState } from 'react'
import './Dashboard.css'
import Sidebar from '../sidebar/Sidebar.jsx'
import CategoryTable from '../categories/CategoryTable.jsx'
import ProductTable from '../products/ProductTable.jsx'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('categories')

  return (
    <div className="dashboard">
      <Sidebar onSelect={setActiveTab} activeTab={activeTab} />
      <main className="content">
        <header className="content-header">
          <h1>{activeTab === 'categories' ? 'Categories' : 'Products'}</h1>
          <div className="header-actions">
            <span className="material-symbols-outlined">dashboard</span>
          </div>
        </header>
        <section className="content-body">
          {activeTab === 'categories' ? (
            <CategoryTable />
          ) : (
            <ProductTable />
          )}
        </section>
      </main>
    </div>
  )
}
