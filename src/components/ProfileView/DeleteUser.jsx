import React from 'react';
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function DeleteUser({profile, setUser, token}) {
  const navigate = useNavigate();

  const handleDelete = () => {
    fetch(
      `https://myflix-movies-app-3c39c5149294.herokuapp.com/users/${profile.Username}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(() => {
      setUser(null);
      navigate('/signup');
    });
  };

  return (
    <div>
      <Button variant="danger" onClick={handleDelete}>
        Delete Profile
      </Button>
    </div>
  );
}
