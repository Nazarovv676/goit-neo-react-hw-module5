import PropTypes from "prop-types";
import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onClick, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={css.loadMoreButton}
    >
      {disabled ? "Loading..." : "Load More"}
    </button>
  );
}

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
