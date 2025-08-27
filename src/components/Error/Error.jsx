import PropTypes from "prop-types";
import css from "./Error.module.css";

export default function Error({ message = "Something went wrong" }) {
  return (
    <div className={css.error}>
      <div className={css.errorContent}>
        <h2>Oops!</h2>
        <p>{message}</p>
        <button
          onClick={() => window.location.reload()}
          className={css.retryButton}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

Error.propTypes = {
  message: PropTypes.string,
};
