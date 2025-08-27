import PropTypes from "prop-types";
import { FaSearch } from "react-icons/fa";
import css from "./SearchBar.module.css";

export default function SearchBar({
  onSubmit,
  placeholder = "Search movies...",
}) {
  return (
    <form className={css.form} onSubmit={onSubmit}>
      <div className={css.inputContainer}>
        <FaSearch className={css.searchIcon} />
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          placeholder={placeholder}
          aria-label="Search movies"
        />
      </div>
      <button type="submit" className={css.searchButton}>
        Search
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};
