import {useEffect, useState} from 'react';

import {MovieCard} from '../MovieCard/MovieCard';

import {MovieView} from '../MovieView/MovieView';

import {LoginView} from '../LoginView/LoginView';

import {SignupView} from '../SignupView/SignUpView';

export function Mainview() {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [movies, setMovies] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
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

  if (!user) {
    return (
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
    );
  }

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (!movies) {
    return <div>Loading...</div>;
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          handleMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
      <>
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          Logout
        </button>
      </>
    </div>
  );
}
