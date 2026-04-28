import { useState, useEffect } from 'react' 
import List from './components/List/List'
import Details from './components/Details/Details'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [errorUsers, setErrorUsers] = useState(null)

  // Эффект для загрузки списка пользователей (один раз при старте)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoadingUsers(true)
        setErrorUsers(null)
        const response = await fetch('https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json')
        if (!response.ok) {
          throw new Error('Ошибка загрузки списка пользователей')
        }
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setErrorUsers(err.message)
      } finally {
        setLoadingUsers(false)
      }
    }

    fetchUsers()
  }, [])

  const handleUserClick = (user) => {
    setSelectedUser(user)
  }

  return (
    <div className="app">
      <div className="container">
        <div className="list-section">
          {loadingUsers && <div className="loading">Загрузка списка...</div>}
          {errorUsers && <div className="error">{errorUsers}</div>}
          {!loadingUsers && !errorUsers && (
            <List users={users} selectedUser={selectedUser} onUserClick={handleUserClick} />
          )}
        </div>
        <div className="details-section">
          {selectedUser ? (
            <Details info={selectedUser} />
          ) : (
            <div className="empty-details">Выберите пользователя из списка</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App