import { useParams } from "react-router-dom";
import { useMovieReviews } from "../../hooks/useMovies";
import Error from "../Error";
import Loader from "../Loader";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const { data: reviews, loading, error } = useMovieReviews(movieId);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error} />;
  }

  if (!reviews || !reviews.results || reviews.results.length === 0) {
    return (
      <div className={css.emptyState}>
        <h2>Reviews</h2>
        <p>No reviews available for this movie yet.</p>
      </div>
    );
  }

  return (
    <div className={css.container}>
      <h2>Reviews</h2>
      <div className={css.reviewsList}>
        {reviews.results.map((review) => (
          <div key={review.id} className={css.reviewCard}>
            <div className={css.reviewHeader}>
              <div className={css.authorInfo}>
                <h3 className={css.authorName}>{review.author}</h3>
                {review.created_at && (
                  <p className={css.reviewDate}>
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                )}
              </div>
              {review.author_details.rating && (
                <div className={css.rating}>
                  <span className={css.ratingValue}>
                    {review.author_details.rating}/10
                  </span>
                </div>
              )}
            </div>

            <div className={css.reviewContent}>
              <p className={css.reviewText}>
                {review.content.length > 500
                  ? `${review.content.substring(0, 500)}...`
                  : review.content}
              </p>

              {review.content.length > 500 && (
                <a
                  href={review.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={css.readMore}
                >
                  Read full review
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {reviews.total_results > reviews.results.length && (
        <p className={css.moreInfo}>
          Showing {reviews.results.length} of {reviews.total_results} reviews
        </p>
      )}
    </div>
  );
}
