import axios from "axios";

// API Configuration
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxN2IwYzE1NTNiNjUzZDZmNjZjNzNmMDcxOWE5N2IwZCIsIm5iZiI6MTc1NjI5OTk1OC44NjgsInN1YiI6IjY4YWYwMmI2OTc5MjUzYTRjMjYyNDllNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RKoqVumtTR0eMO2UKHD2-Fug9IQBqY6lWjUUhBabil4";

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Response Error:", error);
    if (error.response?.status === 401) {
      console.error("Authentication failed. Please check your API token.");
    }
    return Promise.reject(error);
  }
);

// API Service class
class MovieApiService {
  constructor() {
    this.baseParams = {
      include_adult: false,
    };
  }

  // Fetch trending movies
  async getTrendingMovies(page = 1) {
    try {
      const params = new URLSearchParams({
        ...this.baseParams,
        page: page.toString(),
      });

      const response = await apiClient.get(`/trending/movie/week?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch trending movies: ${error.message}`);
    }
  }

  // Search movies by name
  async searchMovies(query, page = 1) {
    try {
      if (!query.trim()) {
        throw new Error("Search query is required");
      }

      const params = new URLSearchParams({
        ...this.baseParams,
        page: page.toString(),
        query: query.trim(),
      });

      const response = await apiClient.get(`/search/movie?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to search movies: ${error.message}`);
    }
  }

  // Get movie details
  async getMovieDetails(movieId) {
    try {
      if (!movieId) {
        throw new Error("Movie ID is required");
      }

      const response = await apiClient.get(`/movie/${movieId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch movie details: ${error.message}`);
    }
  }

  // Get movie credits (cast)
  async getMovieCredits(movieId) {
    try {
      if (!movieId) {
        throw new Error("Movie ID is required");
      }

      const response = await apiClient.get(`/movie/${movieId}/credits`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch movie credits: ${error.message}`);
    }
  }

  // Get movie reviews
  async getMovieReviews(movieId) {
    try {
      if (!movieId) {
        throw new Error("Movie ID is required");
      }

      const response = await apiClient.get(`/movie/${movieId}/reviews`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch movie reviews: ${error.message}`);
    }
  }
}

// Create and export singleton instance
export const movieApiService = new MovieApiService();

// Export for testing purposes
export { apiClient };
