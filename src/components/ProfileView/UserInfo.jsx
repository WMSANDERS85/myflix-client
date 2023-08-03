import React from 'react';
import Card from 'react-bootstrap/Card';

export function UserInfo({profile}) {
  return (
    <Card>
      <Card.Body>
        <h2>User Information</h2>
        <p>Username: {profile.Username}</p>
        <p>Email: {profile.Email}</p>
        <p>Birthday: {profile.Birthday}</p>
      </Card.Body>
    </Card>
  );
}
