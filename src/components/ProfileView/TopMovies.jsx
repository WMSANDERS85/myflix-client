import React from 'react';
import {MovieCard} from '../MovieCard/MovieCard';
import {useNavigate} from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export function TopMovies({profile, movies, user, setUser, token}) {
  if (!movies) {
    return <div>Loading...</div>;
  }

  let favoriteMovies = movies.filter((m) =>
    profile.FavoriteMovies.includes(m.id)
  );

  return (
    <Row>
      {favoriteMovies.map((movie) => (
        <Col className="mb-4" key={movie.id} md={3}>
          <MovieCard
            key={movie.id}
            movie={movie}
            user={user}
            setUser={setUser}
            token={token}
          />
        </Col>
      ))}
    </Row>
  );
}
