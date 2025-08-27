import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useMovieCredits } from "../../hooks/useMovies";
import Error from "../Error";
import Loader from "../Loader";
import css from "./MovieCast.module.css";

export default function MovieCast({ imageBasePath }) {
  const { movieId } = useParams();
  const { data: credits, loading, error } = useMovieCredits(movieId);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error} />;
  }

  if (!credits || !credits.cast || credits.cast.length === 0) {
    return (
      <div className={css.emptyState}>
        <h2>Cast</h2>
        <p>No cast information available for this movie.</p>
      </div>
    );
  }

  // Get top 10 cast members
  const topCast = credits.cast.slice(0, 10);

  return (
    <div className={css.container}>
      <h2>Cast</h2>
      <div className={css.castGrid}>
        {topCast.map((actor) => (
          <div key={actor.id} className={css.castMember}>
            <div className={css.actorImage}>
              {actor.profile_path ? (
                <img
                  src={`${imageBasePath}${actor.profile_path}`}
                  alt={actor.name}
                  loading="lazy"
                />
              ) : (
                <div className={css.noImage}>
                  <span>{actor.name.charAt(0)}</span>
                </div>
              )}
            </div>
            <div className={css.actorInfo}>
              <h3 className={css.actorName}>{actor.name}</h3>
              <p className={css.characterName}>{actor.character}</p>
            </div>
          </div>
        ))}
      </div>

      {credits.cast.length > 10 && (
        <p className={css.moreInfo}>
          And {credits.cast.length - 10} more cast members...
        </p>
      )}
    </div>
  );
}

MovieCast.propTypes = {
  imageBasePath: PropTypes.string.isRequired,
};
