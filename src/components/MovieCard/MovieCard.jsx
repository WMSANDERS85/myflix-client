import PropTypes from 'prop-types';

export const MovieCard = ({handleMovieClick, movie}) => {
  const handleClick = () => {
    handleMovieClick(movie);
  };

  return <div onClick={handleClick}>{movie.title}</div>;
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
