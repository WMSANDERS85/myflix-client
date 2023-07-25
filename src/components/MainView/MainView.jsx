import {useEffect, useState} from 'react';

import {MovieCard} from '../MovieCard/MovieCard';

import {MovieView} from '../MovieView/MovieView';

import {LoginView} from '../LoginView/LoginView';

import {SignupView} from '../SignupView/SignUpView';

import Button from 'react-bootstrap/Button';

import Row from 'react-bootstrap/Row';

import Col from 'react-bootstrap/Col';

import Card from 'react-bootstrap/Card';

import Container from 'react-bootstrap/Container';

export function Mainview() {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [movies, setMovies] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const handleSignup = (user) => {
    setShowSignup(false);
    setUser(user);
  };

  useEffect(() => {
    console.log({token});
    if (!token) return;
    fetch('https://myflix-movies-app-3c39c5149294.herokuapp.com/movies', {
      headers: {Authorization: `Bearer ${token}`},
    })
      .then((response) => {
        console.log({response});
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Movie data from API', data);
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          title: movie.Title,
          description: movie.Description,
          genre: movie.Genre,
          director: movie.Director,
          image: movie.ImagePath,
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error('Something went wrong', error);
      });
  }, [token]);

  return (
    <Row>
      {!user ? (
        showLogin ? (
          <>
            <Container>
              <Card>
                <Card.Body>
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />

                    <Button variant="link" onClick={() => setShowLogin(false)}>
                      Not a memeber? Sign Up here!
                    </Button>
                  </Col>
                </Card.Body>
              </Card>
            </Container>
          </>
        ) : (
          <>
            <Container>
              <Card>
                <Card.Body>
                  <Col md={6}>
                    <SignupView onSignedUp={handleSignup} />

                    <Button
                      variant="link"
                      type="submit"
                      onClick={() => setShowLogin(true)}
                    >
                      Already a member? Login here!
                    </Button>
                  </Col>
                </Card.Body>
              </Card>
            </Container>
          </>
        )
      ) : selectedMovie ? (
        <Col md={6}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : !movies ? (
        <div>Loading...</div>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className="mb-5" key={movie.id} md={3}>
              <MovieCard
                key={movie.id}
                movie={movie}
                handleMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
          <Button
            variant="danger"
            size="md"
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Logout
          </Button>
        </>
      )}
    </Row>
  );
}
