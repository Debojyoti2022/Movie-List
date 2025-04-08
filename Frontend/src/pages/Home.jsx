import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("the"); // default to load initial movies
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMovies = async () => {
      if (!searchQuery.trim()) return;
      setLoading(true);
      try {
        const results = await searchMovies(searchQuery);
        setMovies(results);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard movie={movie} key={movie.imdbID} />
            ))
          ) : (
            <div>No movies found.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
