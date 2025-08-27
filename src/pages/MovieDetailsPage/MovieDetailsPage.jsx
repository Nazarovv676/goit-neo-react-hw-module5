import clsx from "clsx";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import { useImageColors } from "../../hooks/useImageColors";
import { useMovieDetails } from "../../hooks/useMovies";
import css from "./MovieDetailsPage.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function MovieDetailsPage({ imageBasePath }) {
  const { movieId } = useParams();
  const location = useLocation();
  const { data: movie, loading, error } = useMovieDetails(movieId);
  const [scrollY, setScrollY] = useState(0);

  // Extract colors from movie poster
  const posterUrl = movie?.poster_path
    ? `${imageBasePath}${movie.poster_path}`
    : null;
  const { theme } = useImageColors(posterUrl);

  // Handle scroll for animated header
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error} />;
  }

  if (!movie) {
    return <Error message="Movie not found" />;
  }

  const getRatingClass = (rating) => {
    if (rating >= 8) return css.ratingExcellent;
    if (rating >= 6) return css.ratingGood;
    return css.ratingPoor;
  };

  // Check if we're on a sub-route (cast or reviews)
  const isOnSubRoute =
    location.pathname.includes("/cast") ||
    location.pathname.includes("/reviews");

  // Calculate header opacity based on scroll
  const headerOpacity = Math.min(scrollY / 200, 1);
  const headerVisible = scrollY > 100;

  // Apply dynamic theme styles
  const themeStyles = theme
    ? {
        "--theme-primary": theme.primary,
        "--theme-secondary": theme.secondary,
        "--theme-accent": theme.accent,
        "--theme-background": theme.background,
        "--theme-surface": theme.surface,
        "--theme-text": theme.text,
        "--theme-muted": theme.muted,
      }
    : {};

  return (
    <div className={css.container} style={themeStyles}>
      {/* Blurred Backdrop */}
      {movie.backdrop_path && (
        <div className={css.backdropContainer}>
          <div
            className={css.backdropImage}
            style={{
              backgroundImage: `url(${imageBasePath}${movie.backdrop_path})`,
            }}
          />
          <div className={css.backdropOverlay} />
        </div>
      )}

      {/* Animated Header Bar */}
      <div
        className={clsx(css.animatedHeader, headerVisible && css.headerVisible)}
        style={{ opacity: headerOpacity }}
      >
        <div className={css.headerContent}>
          <div className={css.headerPoster}>
            <img
              src={`${imageBasePath}${movie.poster_path}`}
              alt={movie.title || movie.name}
            />
          </div>
          <div className={css.headerInfo}>
            <h2 className={css.headerTitle}>{movie.title || movie.name}</h2>
            <div className={css.headerMeta}>
              {movie.release_date && (
                <span className={css.headerYear}>
                  {new Date(movie.release_date).getFullYear()}
                </span>
              )}
              {movie.runtime && (
                <span className={css.headerRuntime}>{movie.runtime} min</span>
              )}
              <div
                className={clsx(
                  css.headerRating,
                  getRatingClass(movie.vote_average)
                )}
              >
                {movie.vote_average?.toFixed(1) || "N/A"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={css.mainContent}>
        <div className={css.movieHeader}>
          <div className={css.posterSection}>
            <img
              className={css.poster}
              src={`${imageBasePath}${movie.poster_path}`}
              alt={movie.title || movie.name}
            />

            <div className={css.navigation}>
              <NavLink
                className={buildLinkClass}
                to="cast"
                state={{ from: location }}
              >
                Cast
              </NavLink>
              <NavLink
                className={buildLinkClass}
                to="reviews"
                state={{ from: location }}
              >
                Reviews
              </NavLink>
            </div>
          </div>

          <div className={css.detailsSection}>
            <div className={css.titleSection}>
              <h1 className={css.title}>{movie.title || movie.name}</h1>
              <div
                className={clsx(css.rating, getRatingClass(movie.vote_average))}
              >
                {movie.vote_average?.toFixed(1) || "N/A"}
              </div>
            </div>

            {movie.tagline && (
              <div className={css.tagline}>
                <FaQuoteLeft className={css.quoteIcon} />
                <p>{movie.tagline}</p>
                <FaQuoteRight className={css.quoteIcon} />
              </div>
            )}

            {movie.genres && movie.genres.length > 0 && (
              <div className={css.genres}>
                <h3>Genres</h3>
                <div className={css.genreList}>
                  {movie.genres.map((genre) => (
                    <span key={genre.id} className={css.genre}>
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {movie.overview && (
              <div className={css.overview}>
                <h3>Overview</h3>
                <p>{movie.overview}</p>
              </div>
            )}

            <div className={css.metadata}>
              {movie.release_date && (
                <div className={css.metadataItem}>
                  <strong>Release Date:</strong>{" "}
                  {new Date(movie.release_date).toLocaleDateString()}
                </div>
              )}

              {movie.runtime && (
                <div className={css.metadataItem}>
                  <strong>Runtime:</strong> {movie.runtime} minutes
                </div>
              )}

              {movie.production_countries &&
                movie.production_countries.length > 0 && (
                  <div className={css.metadataItem}>
                    <strong>Countries:</strong>{" "}
                    {movie.production_countries.map((c) => c.name).join(", ")}
                  </div>
                )}
            </div>
          </div>
        </div>

        <div className={css.contentSection}>
          {isOnSubRoute ? (
            <Outlet />
          ) : (
            <div className={css.defaultContent}>
              <p>Select "Cast" or "Reviews" to view additional information.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

MovieDetailsPage.propTypes = {
  imageBasePath: PropTypes.string.isRequired,
};
