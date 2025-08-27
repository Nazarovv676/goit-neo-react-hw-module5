import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import Error from "../../components/Error";
import LoadMoreBtn from "../../components/LoadMoreBtn";
import Loader from "../../components/Loader";
import MovieList from "../../components/MovieList";
import { useMovieSearch } from "../../hooks/useMovies";
import css from "./MoviesPage.module.css";

export default function MoviesPage({ imageBasePath }) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const {
    data: movies,
    loading,
    error,
    hasMore,
    loadMore,
  } = useMovieSearch(query);

  const handleLoadMore = () => {
    loadMore();
  };

  if (loading && movies.length === 0) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className={css.container}>
      <h1>Movie Search</h1>

      {!query && (
        <div className={css.searchPrompt}>
          <p>Use the search bar above to find movies.</p>
        </div>
      )}

      {query && movies.length > 0 && (
        <div className={css.content}>
          <div className={css.searchResults}>
            <h2>Search Results for "{query}"</h2>
            <p className={css.resultCount}>
              Found {movies.length} movie{movies.length !== 1 ? "s" : ""}
            </p>
          </div>

          <MovieList movies={movies} imageBasePath={imageBasePath} />

          {hasMore && (
            <div className={css.loadMoreContainer}>
              <LoadMoreBtn onClick={handleLoadMore} disabled={loading} />
            </div>
          )}
        </div>
      )}

      {query && movies.length === 0 && !loading && !error && (
        <div className={css.emptyState}>
          <h2>No movies found</h2>
          <p>No movies found for "{query}". Try a different search term.</p>
        </div>
      )}

      {loading && movies.length > 0 && (
        <div className={css.loadingOverlay}>
          <Loader />
        </div>
      )}
    </div>
  );
}

MoviesPage.propTypes = {
  imageBasePath: PropTypes.string.isRequired,
};
