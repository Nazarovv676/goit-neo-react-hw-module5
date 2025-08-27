import { lazy } from "react";

const MoviesPage = lazy(() => import("./MoviesPage"));
const HomePage = lazy(() => import("./HomePage"));
const MovieDetailsPage = lazy(() => import("./MovieDetailsPage"));
const NotFoundPage = lazy(() => import("./NotFoundPage"));

export { MoviesPage, HomePage, MovieDetailsPage, NotFoundPage }