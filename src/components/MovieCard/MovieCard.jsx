import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export const MovieCard = ({movie, user, setUser, token}) => {
  // Ensure user and movie are defined before checking if it's a favorite
  const [isFavorite, setIsFavorite] = useState(
    user && movie && user.FavoriteMovies.includes(movie.id)
  );

  useEffect(() => {
    setIsFavorite(user && movie && user.FavoriteMovies.includes(movie.id));
  }, [user, movie]);

  const handleToggleFavorite = async () => {
    if (!user || !movie) return;

    let response;

    if (isFavorite) {
      // Remove the movie from the favorites
      response = await fetch(
        `https://myflix-movies-app-3c39c5149294.herokuapp.com/users/${user.Username}/favoriteMovies/${movie.id}`,
        {
          method: 'DELETE',
          headers: {Authorization: `Bearer ${token}`},
        }
      );
    } else {
      // Add the movie to the favorites
      response = await fetch(
        `https://myflix-movies-app-3c39c5149294.herokuapp.com/users/${user.Username}/favoriteMovies/${movie.id}`,
        {
          method: 'POST',
          headers: {Authorization: `Bearer ${token}`},
        }
      );
    }

    if (response.ok) {
      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsFavorite(updatedUser.FavoriteMovies.some((fm) => fm == movie.id));
    } else {
      console.error('Failed to update favorite movies.');
    }
  };

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">More</Button>
        </Link>
        <Button onClick={handleToggleFavorite}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.object.isRequired,
    director: PropTypes.object.isRequired, // Corrected PropTypes for director
    image: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.object, // New PropTypes for user
  setUser: PropTypes.func.isRequired, // New PropTypes for setUser
  token: PropTypes.string.isRequired, // New PropTypes for token
};
