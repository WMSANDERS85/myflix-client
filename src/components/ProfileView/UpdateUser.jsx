import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function UpdateUser({profile, setUser, token}) {
  const [username, setUsername] = useState(profile.Username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(profile.Email);
  const [dob, setDob] = useState(profile.Birthday);
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
          Password: password,
          Email: email,
          Birthday: dob,
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
      <h2>Update Information</h2>
      {error && <div>{error}</div>}
      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDob">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
}
