import React, { useState } from "react";
import AlbumCard from "../components/AlbumCard";

function CatalogPage({ albums, onAddToCart }) {
  
  const genre = ["All", "Jazz", "Electronic", "Rock", "Classical"];
  const [selectedGenre, setSelectedGenre] = useState("All");

  const validAlbums = albums || [];

  const filteredAlbums =
    selectedGenre === "All"
      ? validAlbums
      : validAlbums.filter((p) => p.genre === selectedGenre);

  return (
    <div className="catalog-container">
      <header className="catalog-hero">
        <h1>Vinyl Vault</h1>
        <p>
          Vintage Vinyl discs and albums for <b>Your Vibe</b>
        </p>
      </header>

      {
 }
<div className="filter-bar">
  {genre.map((cat) => (
    <button
      key={cat}
      className={`filter-pill ${selectedGenre === cat ? "active" : ""}`}
      onClick={() => setSelectedGenre(cat)}
    >
      {cat}
    </button>
  ))}
</div>

      <div className="album-grid">
        {filteredAlbums.map((albums) => (
          <AlbumCard
            key={albums.id}
            albums={albums}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default CatalogPage;