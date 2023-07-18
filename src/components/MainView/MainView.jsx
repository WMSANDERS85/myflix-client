import {useState} from 'react';

import {MovieCard} from '../MovieCard/MovieCard';

import {MovieView} from '../MovieView/MovieView';

export function Mainview() {
  const [movies, setMovies] = useState([
    {
      id: '6499fe3bb6313aad079b7a19',
      title: 'Point Break',
      description:
        'An F.B.I agent goes undercover to catch a gang of surfers who may be bank robbers.',
      genre: 'Action',
      director: 'Kathryn Bigelow',
      image:
        'https://media-cache.cinematerial.com/p/500x/cdqhdf5p/point-break-movie-poster.jpg?v=1535275482',
    },
    {
      id: '649a0172b6313aad079b7a1b',
      title: 'Lethal Weapon',
      description:
        'Two newly paired cops who are complete opposites must put aside their differences in order to catch a gang of drug smugglers.',
      genre: 'Action',
      director: 'Richard Donner',
      image:
        'https://media-cache.cinematerial.com/p/500x/gblhajqn/lethal-weapon-movie-poster.jpg?v=1456257915',
    },
    {
      id: '649a0934b6313aad079b7a1d',
      title: 'Snatch',
      description:
        'Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers and supposedly Jewish jewelers fight to track down a priceless stolen diamond.',
      genre: 'Comedy',
      director: 'Guy Ritchie',
      image:
        'https://media-cache.cinematerial.com/p/500x/gtvcn8ng/snatch-movie-poster.jpg?v=1456114016',
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movies={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          handleMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
}
