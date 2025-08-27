import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies, imageBasePath }) {
  const location = useLocation();

  if (!movies || movies.length === 0) {
    return (
      <div className={css.emptyState}>
        <p>No movies to display.</p>
      </div>
    );
  }

  return (
    <div className={css.container}>
      <ul className={css.movieGrid}>
        {movies
          .filter((movie) => movie.poster_path !== null)
          .map((movie) => (
            <li key={movie.id} className={css.movieItem}>
              <Link
                to={`/movies/${movie.id}`}
                state={{ from: location }}
                className={css.movieLink}
              >
                <div className={css.movieCard}>
                  <div className={css.posterContainer}>
                    <img
                      className={css.poster}
                      src={`${imageBasePath}${movie.poster_path}`}
                      alt={movie.title || movie.name}
                      loading="lazy"
                    />
                    <div className={css.overlay}>
                      <span className={css.viewDetails}>View Details</span>
                    </div>
                  </div>
                  <div className={css.movieInfo}>
                    <h3 className={css.movieTitle}>
                      {movie.title || movie.name}
                    </h3>
                    {movie.release_date && (
                      <p className={css.releaseDate}>
                        {new Date(movie.release_date).getFullYear()}
                      </p>
                    )}
                    {movie.vote_average && (
                      <div className={css.rating}>
                        <span className={css.ratingValue}>
                          {movie.vote_average.toFixed(1)}
                        </span>
                        <span className={css.ratingLabel}>/10</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      name: PropTypes.string,
      poster_path: PropTypes.string,
      release_date: PropTypes.string,
      vote_average: PropTypes.number,
    })
  ).isRequired,
  imageBasePath: PropTypes.string.isRequired,
};
