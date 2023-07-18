export const MovieCard = ({handleMovieClick, movie}) => {
  const handleClick = () => {
    handleMovieClick(movie);
  };

  return (
    <div style={{border: '2px solid black'}} onClick={handleClick}>
      {movie.title}
    </div>
  );
};
