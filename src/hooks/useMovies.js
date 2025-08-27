import { useCallback, useEffect, useState } from "react";
import { movieApiService } from "../services/api";

// Custom hook for managing movie data fetching
export const useMovies = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);

  // Reset state when dependencies change
  useEffect(() => {
    setData([]);
    setPage(1);
    setError(null);
    setHasMore(false);
  }, dependencies);

  // Fetch data function
  const fetchData = useCallback(
    async (pageNumber = 1, append = false) => {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchFunction(pageNumber);

        if (append) {
          setData((prev) => [...prev, ...result.results]);
        } else {
          setData(result.results);
        }

        // Check if there are more pages
        const totalPages = Math.ceil(result.total_results / 20); // TMDB default page size
        setHasMore(pageNumber < totalPages);

        return result;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchFunction]
  );

  // Load more function
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      return fetchData(nextPage, true);
    }
  }, [loading, hasMore, page, fetchData]);

  // Initial fetch
  useEffect(() => {
    if (dependencies.every((dep) => dep !== undefined && dep !== null)) {
      fetchData(1, false);
    }
  }, dependencies);

  return {
    data,
    loading,
    error,
    hasMore,
    loadMore,
    refetch: () => fetchData(1, false),
  };
};

// Hook for trending movies
export const useTrendingMovies = () => {
  const fetchTrending = useCallback(async (page) => {
    return await movieApiService.getTrendingMovies(page);
  }, []);

  return useMovies(fetchTrending, []);
};

// Hook for movie search
export const useMovieSearch = (query) => {
  const fetchSearch = useCallback(
    async (page) => {
      if (!query?.trim()) {
        return { results: [], total_results: 0 };
      }
      return await movieApiService.searchMovies(query, page);
    },
    [query]
  );

  return useMovies(fetchSearch, [query]);
};

// Hook for single movie details
export const useMovieDetails = (movieId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) {
      setData(null);
      return;
    }

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const details = await movieApiService.getMovieDetails(movieId);
        setData(details);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  return { data, loading, error };
};

// Hook for movie credits
export const useMovieCredits = (movieId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) {
      setData(null);
      return;
    }

    const fetchCredits = async () => {
      try {
        setLoading(true);
        setError(null);
        const credits = await movieApiService.getMovieCredits(movieId);
        setData(credits);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, [movieId]);

  return { data, loading, error };
};

// Hook for movie reviews
export const useMovieReviews = (movieId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) {
      setData(null);
      return;
    }

    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const reviews = await movieApiService.getMovieReviews(movieId);
        setData(reviews);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  return { data, loading, error };
};
