import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  const { favorites = [], toggleFavorite = () => {} } = useContext(MovieContext);

  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

  function onFavoriteClick() {
    toggleFavorite(movie);
  }

  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} />
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
        <button onClick={onFavoriteClick}>
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
