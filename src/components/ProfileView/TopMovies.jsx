import React from 'react';
import {MovieCard} from '../MovieCard/MovieCard';
import {useNavigate} from 'react-router-dom';

export function TopMovies({profile, movies}) {
  if (!movies) {
    return <div>Loading...</div>;
  }

  let favoriteMovies = movies.filter((m) =>
    profile.FavoriteMovies.includes(m._id)
  );

  return (
    <div>
      <h2>Favorite Movies</h2>
      {favoriteMovies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </div>
  );
}
