//libraries
import { Suspense, lazy } from "react";
import ReactModal from "react-modal";
import { Route, Routes } from "react-router-dom";

//components
import ErrorBoundary from "./ErrorBoundary";
import Loader from "./Loader";
import MovieCast from "./MovieCast";
import MovieReviews from "./MovieReviews";
import Navigation from "./Navigation";

//Pages - using React.lazy for dynamic imports
const HomePage = lazy(() => import("../pages/HomePage"));
const MovieDetailsPage = lazy(() => import("../pages/MovieDetailsPage"));
const MoviesPage = lazy(() => import("../pages/MoviesPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

//api

//styles
import "./App.css";

// Constants
const IMAGE_BASE_PATH = "https://image.tmdb.org/t/p/w500";

function App() {
  // Set up ReactModal
  ReactModal.setAppElement("#root");

  return (
    <ErrorBoundary>
      <div className="app">
        <Navigation />

        <main className="app-main">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                path="/"
                element={<HomePage imageBasePath={IMAGE_BASE_PATH} />}
              />
              <Route
                path="/movies"
                element={<MoviesPage imageBasePath={IMAGE_BASE_PATH} />}
              />
              <Route
                path="/movies/:movieId"
                element={<MovieDetailsPage imageBasePath={IMAGE_BASE_PATH} />}
              >
                <Route index element={null} />
                <Route path="reviews" element={<MovieReviews />} />
                <Route
                  path="cast"
                  element={<MovieCast imageBasePath={IMAGE_BASE_PATH} />}
                />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
