import {useEffect, useState} from 'react';

import {MovieCard} from '../MovieCard/MovieCard';

import {MovieView} from '../MovieView/MovieView';

export function Mainview() {
  const [movies, setMovies] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch('https://myflix-movies-app-3c39c5149294.herokuapp.com/movies')
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
  }, []);

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
    </div>
  );
}
