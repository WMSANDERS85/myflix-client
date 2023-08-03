import {useEffect, useState} from 'react';
import {MovieCard} from '../MovieCard/MovieCard';
import {MovieView} from '../MovieView/MovieView';
import {LoginView} from '../LoginView/LoginView';
import {SignupView} from '../SignupView/SignUpView';
import {NavigationBar} from '../NavigationBar/NavigationBar';
import {ProfileView} from '../ProfileView/ProfileView';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

export function Mainview() {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);

  const normalizeMoviesData = (data) =>
    data.map((movie) => ({
      id: movie._id,
      title: movie.Title,
      description: movie.Description,
      genre: movie.Genre,
      director: movie.Director,
      image: movie.ImagePath,
    }));

  useEffect(() => {
    if (!token) return;
    fetch('https://myflix-movies-app-3c39c5149294.herokuapp.com/movies', {
      headers: {Authorization: `Bearer ${token}`},
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = normalizeMoviesData(data);
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        setError('Something went wrong. Please try again later.');
      });
  }, [token]);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Row className="justify-content-md-center">
        <NavigationBar isLoggedIn={!!user} onLogout={logout} />
        <Routes>
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <SignupView />
                </Col>
              )
            }
          />
          <Route
            path="/profile"
            element={
              user && movies ? (
                <ProfileView
                  token={token}
                  user={user}
                  setUser={setUser}
                  movies={movies}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <LoginView onLoggedIn={(user) => setUser(user)} />
                </Col>
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : !movies ? (
                <Col>Loading...</Col>
              ) : (
                <Col md={8}>
                  <MovieView movies={movies} />
                </Col>
              )
            }
          />

          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : !movies ? (
                <Col>Loading...</Col>
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                movies.map((movie) => (
                  <Col className="mb-4" key={movie.id} md={3}>
                    <MovieCard movie={movie} />
                  </Col>
                ))
              )
            }
          />
        </Routes>
        {error && <div>{error}</div>}
      </Row>
    </BrowserRouter>
  );
}
