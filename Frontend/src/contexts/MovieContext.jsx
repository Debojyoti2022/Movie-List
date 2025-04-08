import { createContext, useState } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.imdbID === movie.imdbID);
      if (exists) {
        return prev.filter((fav) => fav.imdbID !== movie.imdbID);
      } else {
        return [...prev, movie];
      }
    });
  };

  return (
    <MovieContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </MovieContext.Provider>
  );
};
