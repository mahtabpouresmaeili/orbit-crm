import type { ChangeEvent } from 'react';
import { useAuth } from '../hooks/useAuth';

export function UserSwitcher() {
  const { user, users, setUser } = useAuth();

  function handleUserChange(event: ChangeEvent<HTMLSelectElement>) {
    const selectedUser = users.find((item) => item.id === event.target.value);
    if (selectedUser) {
      setUser(selectedUser);
    }
  }

  const initials = user.fullName
    .split(' ')
    .map((name) => name[0])
    .join('');

  return (
    <div className="user-switcher">
      <div className="user-switcher__identity" aria-hidden="true">
        <span className="user-switcher__avatar">{initials}</span>
        <span>
          <strong>{user.fullName}</strong>
          <small>{user.role.replace('-', ' ')}</small>
        </span>
      </div>
      <label className="user-switcher__label" htmlFor="current-user">
        Switch workspace identity
      </label>
      <select id="current-user" value={user.id} onChange={handleUserChange}>
        {users.map((item) => (
          <option key={item.id} value={item.id}>
            {item.fullName} — {item.role}
          </option>
        ))}
      </select>
    </div>
  );
}
