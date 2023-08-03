import {useParams} from 'react-router';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';

export const MovieView = ({movies, user, setUser, token}) => {
  const {movieId} = useParams();
  const movie = movies.find((m) => m.id === movieId);
  const [isFavorite, setIsFavorite] = useState(
    user && movie && user.FavoriteMovies.some((fm) => fm == movie.id)
  );

  useEffect(() => {
    setIsFavorite(
      user && movie && user.FavoriteMovies.some((fm) => fm == movie.id)
    );
  }, [user, movie]);

  const handleToggleFavorite = () => {
    if (!user || !movie) return;

    fetch(
      `https://myflix-movies-app-3c39c5149294.herokuapp.com/users/${user.Username}/favoriteMovies/${movie.id}`,
      {
        method: isFavorite ? 'DELETE' : 'POST',
        headers: {Authorization: `Bearer ${token}`},
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((updatedUser) => {
        setUser(updatedUser);
        setIsFavorite(updatedUser.FavoriteMovies.some((fm) => fm == movie.id));
      })
      .catch((error) => {
        const contentType = error.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          error
            .json()
            .then((errorMessage) =>
              alert(`An error occurred: ${errorMessage}`)
            );
        } else {
          error.text().then((errorMessage) => alert(errorMessage));
        }
      });
  };

  return (
    <div>
      {movie ? ( // Check if movie is defined before rendering
        <>
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
          <button onClick={handleToggleFavorite}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </>
      ) : (
        <p>Movie not found</p> // Render a fallback UI when movie is not found
      )}
    </div>
  );
};
