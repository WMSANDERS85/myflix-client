import {useState} from 'react';

export const LoginView = ({onLoggedIn}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const data = {
    access: username,
    secret: password,
  };

  fetch('https://myflix-movies-app-3c39c5149294.herokuapp.com/movies', {
    method: 'POST',
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.ok) {
      onLoggedIn(username);
    } else {
      response.json(401).message('Login failed');
    }
  });
};
