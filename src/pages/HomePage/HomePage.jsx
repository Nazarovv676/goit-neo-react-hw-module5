import PropTypes from "prop-types";
import Error from "../../components/Error";
import LoadMoreBtn from "../../components/LoadMoreBtn";
import Loader from "../../components/Loader";
import MovieList from "../../components/MovieList";
import { useTrendingMovies } from "../../hooks/useMovies";
import css from "./HomePage.module.css";

export default function HomePage({ imageBasePath }) {
  const {
    data: trending,
    loading,
    error,
    hasMore,
    loadMore,
  } = useTrendingMovies();

  const handleLoadMore = () => {
    loadMore();
  };

  if (loading && trending.length === 0) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className={css.container}>
      <h1>Trending Movies</h1>

      {trending.length > 0 && (
        <div className={css.content}>
          <MovieList movies={trending} imageBasePath={imageBasePath} />

          {hasMore && (
            <div className={css.loadMoreContainer}>
              <LoadMoreBtn onClick={handleLoadMore} disabled={loading} />
            </div>
          )}
        </div>
      )}

      {loading && trending.length > 0 && (
        <div className={css.loadingOverlay}>
          <Loader />
        </div>
      )}

      {trending.length === 0 && !loading && !error && (
        <div className={css.emptyState}>
          <p>No trending movies available at the moment.</p>
        </div>
      )}
    </div>
  );
}

HomePage.propTypes = {
  imageBasePath: PropTypes.string.isRequired,
};
