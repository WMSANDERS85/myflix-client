import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';

export const MovieCard = ({handleMovieClick, movie}) => {
  // const handleClick = () => {
  //   handleMovieClick(movie);
  // };

  return (
    <Card>
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director.Name}</Card.Text>
      </Card.Body>
      <Button onClick={() => handleMovieClick(movie)} variant="link">
        More
      </Button>
      MovieCard
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.object.isRequired,
    director: PropTypes.object.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  handleMovieClick: PropTypes.func.isRequired,
};
