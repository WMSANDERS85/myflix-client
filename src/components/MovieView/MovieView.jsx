import {useParams} from 'react-router';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Figure from 'react-bootstrap/Figure';

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
      .then((updatedUserResponse) => {
        setUser(updatedUserResponse.user);
        setIsFavorite(
          updatedUserResponse.user.FavoriteMovies.some((fm) => fm == movie.id)
        );
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
          <Figure>
            <Figure.Image
              width={200}
              height={210}
              src={movie.image}
              alt="200 x 210"
            ></Figure.Image>
            <Figure.Caption>
              <span style={{fontSize: '18px'}}>
                <strong>Title:</strong>{' '}
              </span>
              <span style={{fontSize: '18px'}}>{movie.title}</span>

              <div>
                <span>
                  <strong style={{fontSize: '18px'}}>Description:</strong>{' '}
                </span>
                <span style={{fontSize: '18px'}}>{movie.description}</span>
              </div>
              <div>
                <span style={{fontSize: '18px'}}>
                  <strong>Genre:</strong>{' '}
                </span>
                <span style={{fontSize: '18px'}}>{movie.genre.Name}</span>
              </div>
              <div>
                <span style={{fontSize: '18px'}}>
                  <strong>Director:</strong>{' '}
                </span>
                <span style={{fontSize: '18px'}}>{movie.director.Name}</span>
              </div>
              <div>
                <Link to={'/'}>
                  <Button style={{marginTop: '6px'}} variant="secondary">
                    Back
                  </Button>
                </Link>

                <Button
                  variant={isFavorite ? 'danger' : 'success'}
                  onClick={handleToggleFavorite}
                  style={{marginTop: '6px', marginLeft: '6px'}}
                >
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
              </div>
            </Figure.Caption>
          </Figure>
        </>
      ) : (
        <p>Movie not found</p> // Render a fallback UI when movie is not found
      )}
    </div>
  );
};
