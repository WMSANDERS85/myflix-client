import React, {useEffect, useState} from 'react';
import {UserInfo} from './UserInfo';
import {UpdateUser} from './UpdateUser';
import {DeleteUser} from './DeleteUser';
import {TopMovies} from './TopMovies';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export function ProfileView({token, user, setUser, movies}) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://myflix-movies-app-3c39c5149294.herokuapp.com/users`, {
      headers: {Authorization: `Bearer ${token}`},
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        return response.json();
      })
      .then((data) => {
        const userProfile = data.find((u) => u.Username === user.Username);
        setProfile(userProfile);
      })
      .catch((error) => {
        setError('Something went wrong. Please try again later.');
      });
  }, [token, user]);

  if (error) {
    return <div>{error}</div>;
  }

  return profile ? (
    <>
      <Row className="mb-4">
        <Col>
          <h1>Your Profile</h1>
        </Col>
      </Row>
      <Row>
        <Col className="mb-4" xs={12} sm={6} md={4}>
          <Card className="card h-100">
            <Card.Body className="flex-column">
              <Card.Title> Your Information</Card.Title>
              <UserInfo profile={profile} />
              <div className="align-right mt-auto">
                <DeleteUser profile={profile} setUser={setUser} token={token} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-4" xs={12} sm={6} md={8}>
          <Card className="card">
            <Card.Body>
              <Card.Title className="mb-3">Update Your Information</Card.Title>
              <UpdateUser profile={profile} setUser={setUser} token={token} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className="mt-2">
          <h2>Your Favorite Movies</h2>
        </Col>
        <Row>
          <TopMovies
            profile={profile}
            movies={movies}
            user={user}
            setUser={setUser}
            token={token}
          />
        </Row>
      </Row>
    </>
  ) : (
    <div>Loading...</div>
  );
}
