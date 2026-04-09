import { useState, useEffect } from 'react'

function App() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')
  const [backendStatus, setBackendStatus] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('testItems')
    if (saved) setItems(JSON.parse(saved))
    
    fetch(`${import.meta.env.VITE_API_URL || 'https://demo.hannahevents.org/api'}/health`)
      .then(res => res.json())
      .then(data => {
        setBackendStatus(data)
        setLoading(false)
      })
      .catch(err => {
        setBackendStatus({ error: 'Cannot connect to backend' })
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    localStorage.setItem('testItems', JSON.stringify(items))
  }, [items])

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, { id: Date.now(), text: newItem.trim() }])
      setNewItem('')
    }
  }

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Test Environment</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>Backend Connection</h2>
        {loading ? (
          <p>Checking backend...</p>
        ) : backendStatus?.error ? (
          <p style={{ color: 'red' }}>{backendStatus.error}</p>
        ) : (
          <p style={{ color: 'green' }}>Connected: {JSON.stringify(backendStatus)}</p>
        )}
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Items List (Test CRUD)</h2>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
            placeholder="Add new item..."
            style={{ flex: 1, padding: '0.5rem', fontSize: '1rem' }}
          />
          <button onClick={addItem} style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
            Add
          </button>
        </div>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.length === 0 ? (
            <li style={{ color: '#666', fontStyle: 'italic' }}>No items yet</li>
          ) : (
            items.map(item => (
              <li key={item.id} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '0.75rem',
                marginBottom: '0.5rem',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px'
              }}>
                <span>{item.text}</span>
                <button 
                  onClick={() => deleteItem(item.id)}
                  style={{ 
                    backgroundColor: '#ff4444', 
                    color: 'white', 
                    border: 'none', 
                    padding: '0.25rem 0.75rem',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
        <p style={{ color: '#666', marginTop: '0.5rem' }}>Total: {items.length} items</p>
      </div>
    </div>
  )
}

export default App
