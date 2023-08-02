import {useParams} from 'react-router';
import {Link} from 'react-router-dom';

export const MovieView = ({movies}) => {
  const {movieId} = useParams();

  const movie = movies.find((m) => m.id === movieId);

  return (
    <div>
      <div>
        <img src={movie.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre.Name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.Name}</span>
      </div>
      <Link to={'/'}>
        <button>Back</button>
      </Link>
    </div>
  );
};
