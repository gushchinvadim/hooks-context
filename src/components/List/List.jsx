// src/components/List/List.jsx

function List({ users, selectedUser, onUserClick }) {
  return (
    <div className="list-container">
      <h2>Список пользователей</h2>
      <ul className="user-list">
        {users.map((user) => (
          <li
            key={user.id}
            className={`user-item ${selectedUser?.id === user.id ? 'active' : ''}`}
            onClick={() => onUserClick(user)}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List