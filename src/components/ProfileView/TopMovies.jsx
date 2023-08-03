import React from 'react';
import {MovieCard} from '../MovieCard/MovieCard';
import {useNavigate} from 'react-router-dom';

export function TopMovies({profile, movies, user, setUser, token}) {
  if (!movies) {
    return <div>Loading...</div>;
  }

  let favoriteMovies = movies.filter((m) =>
    profile.FavoriteMovies.includes(m.id)
  );

  return (
    <div>
      <h2>Favorite Movies</h2>
      {favoriteMovies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          user={user}
          setUser={setUser}
          token={token}
        />
      ))}
    </div>
  );
}
