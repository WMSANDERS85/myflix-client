import {useState} from 'react';

export const LoginView = ({onLoggedIn}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const data = {
    Username: username,
    Password: password,
  };

  fetch('https://myflix-movies-app-3c39c5149294.herokuapp.com/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Login response', data);
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        onLoggedIn(data.user, data.token);
      } else {
        alert('User does not exist');
      }
    })
    .catch((e) => {
      alert('Something went wrong! Please try again.');
    });
};
