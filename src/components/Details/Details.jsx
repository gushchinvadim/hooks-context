// src/components/Details/Details.jsx

import { useState, useEffect } from 'react'

function Details({ info }) {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Эффект для загрузки деталей пользователя при изменении id
  useEffect(() => {
    if (!info?.id) return

    const fetchUserDetails = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(
          `https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${info.id}.json`
        )
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных пользователя')
        }
        const data = await response.json()
        setUserData(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserDetails()
  }, [info.id]) // Перезагружаем только при изменении id

  if (loading) {
    return (
      <div className="details-container">
        <div className="loading">Загрузка данных...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="details-container">
        <div className="error">{error}</div>
      </div>
    )
  }

  if (!userData) {
    return null
  }



return (
  <div className="details-container">
    <div className="user-card">
      <div className="user-avatar">
        <img 
        src={`${userData.avatar}?userId=${info.id}`} 
        alt={userData.name}
        />
      </div>
      <h2 className="user-name">{userData.name}</h2>
      <div className="user-info">
        <p><strong>City:</strong> {userData.details?.city || '—'}</p>
        <p><strong>Company:</strong> {userData.details?.company || '—'}</p>
        <p><strong>Position:</strong> {userData.details?.position || '—'}</p>
      </div>
    </div>
  </div>
)
}

export default Details