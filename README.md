# Movie Search Application

A modern React application for searching and browsing movies using The Movie Database (TMDB) API. This application has been completely refactored following React best practices and modern design patterns.

## Features

- **Trending Movies**: Browse currently trending movies on the home page
- **Movie Search**: Search for movies by title with real-time results
- **Movie Details**: View comprehensive movie information including:
  - Movie poster and backdrop images
  - Title, rating, and release date
  - Genre information
  - Movie overview and tagline
  - Production countries and runtime
- **Cast Information**: View the cast and crew for each movie
- **Movie Reviews**: Read user reviews and ratings
- **Responsive Design**: Optimized for desktop viewing
- **Modern UI**: Clean, dark theme with smooth animations

## Tech Stack

- **React 19.1.0** - Latest React with hooks and modern patterns
- **React Router DOM 7.8.0** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Icons** - Icon library
- **React Hot Toast** - Toast notifications
- **React Spinners** - Loading animations
- **CSS Modules** - Scoped styling
- **Vite** - Build tool and development server

## Architecture

### Service Layer

- `src/services/api.js` - Centralized API service with proper error handling
- Singleton pattern for API client
- Request/response interceptors for logging and error handling

### Custom Hooks

- `src/hooks/useMovies.js` - Reusable hooks for data fetching:
  - `useTrendingMovies()` - Fetch trending movies
  - `useMovieSearch(query)` - Search movies by query
  - `useMovieDetails(movieId)` - Get movie details
  - `useMovieCredits(movieId)` - Get cast information
  - `useMovieReviews(movieId)` - Get movie reviews

### Component Structure

- **Error Boundary**: Graceful error handling with fallback UI
- **Layout Components**: Navigation, SearchBar, Loader, Error
- **Page Components**: HomePage, MoviesPage, MovieDetailsPage
- **Feature Components**: MovieList, MovieCast, MovieReviews

### State Management

- Custom hooks for data fetching and state management
- Proper loading and error states
- Optimistic updates and caching

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ErrorBoundary/   # Error boundary component
│   ├── Loader/         # Loading spinner
│   ├── MovieList/      # Movie grid component
│   ├── Navigation/     # Header navigation
│   ├── SearchBar/      # Search input component
│   └── ...
├── hooks/              # Custom React hooks
│   └── useMovies.js    # Data fetching hooks
├── pages/              # Page components
│   ├── HomePage/       # Trending movies page
│   ├── MoviesPage/     # Search results page
│   └── MovieDetailsPage/ # Movie details page
├── services/           # API and external services
│   └── api.js         # TMDB API service
└── index.css          # Global styles and CSS variables
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd goit-neo-react-hw-module5
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Configuration

The application uses The Movie Database (TMDB) API. The API token is configured in `src/services/api.js`. For production, consider moving this to environment variables.

## Design System

### Color Palette

- **Primary**: `#7ead71` (Green)
- **Background**: `#0b0f17` (Dark blue)
- **Surface**: `#111826` (Lighter dark blue)
- **Text**: `#e6eaf2` (Light gray)
- **Muted Text**: `#a7b0c0` (Medium gray)

### Typography

- System font stack with fallbacks
- Responsive font sizes
- Consistent line heights and spacing

### Spacing

- 4px base unit system
- Consistent spacing variables
- Responsive padding and margins

## Best Practices Implemented

### React Patterns

- Functional components with hooks
- Custom hooks for reusable logic
- Proper prop validation with PropTypes
- Error boundaries for graceful error handling
- Component composition over inheritance

### Performance

- Lazy loading for images
- Optimized re-renders with proper dependencies
- Efficient data fetching with custom hooks
- Minimal bundle size with tree shaking

### Code Quality

- ESLint configuration for code consistency
- Prettier for code formatting
- TypeScript-like prop validation
- Comprehensive error handling
- Clean and maintainable code structure

### Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Proper focus management

## Browser Support

This application is optimized for modern browsers and desktop viewing. It uses modern CSS features and JavaScript APIs.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
