import clsx from "clsx";
import { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";
import css from "./Navigation.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const backLinkLocationRef = useRef(location.state?.from ?? "/");

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const inputValue = e.target[0].value.trim();
    if (!inputValue) {
      toast.error("Please enter a search term");
      return;
    }

    navigate(`/movies?query=${encodeURIComponent(inputValue)}`);
    e.target.reset();
  };

  const canGoBack =
    location.pathname !== "/" && location.pathname !== "/movies";

  return (
    <header className={css.header}>
      <nav className={css.navigation}>
        <div className={css.navContainer}>
          {canGoBack && (
            <Link
              className={css.backLink}
              to={location.state?.from || backLinkLocationRef.current}
            >
              ← Go Back
            </Link>
          )}

          <div className={css.searchContainer}>
            <SearchBar onSubmit={handleSearchSubmit} />
          </div>

          <div className={css.navLinks}>
            <NavLink to="/" className={buildLinkClass}>
              Home
            </NavLink>
            <NavLink to="/movies" className={buildLinkClass}>
              Movies
            </NavLink>
          </div>
        </div>
      </nav>

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--color-surface)",
            color: "var(--color-text)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          },
        }}
      />
    </header>
  );
}
