import React, {useState} from 'react';

export function UpdateUser({profile, setUser, token}) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(
      `https://myflix-movies-app-3c39c5149294.herokuapp.com/users/${profile.Username}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Username: username,
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update profile');
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        setError('Something went wrong. Please try again later.');
      });
  };

  return (
    <div>
      <h2>Update Username</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
