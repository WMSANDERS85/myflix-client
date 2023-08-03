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
      <Container>
        <Card>
          <Card.Body>
            <Row>
              <Col xs={12} md={6}>
                <UserInfo profile={profile} />
              </Col>
              <Col>
                <UpdateUser profile={profile} setUser={setUser} token={token} />
              </Col>
              <DeleteUser profile={profile} setUser={setUser} token={token} />
              <TopMovies
                profile={profile}
                movies={movies}
                user={user}
                setUser={setUser}
                token={token}
              />
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  ) : (
    <div>Loading...</div>
  );
}
