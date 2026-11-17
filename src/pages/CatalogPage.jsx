import React, { useState } from "react";
import AlbumCard from "../components/AlbumCard";

function CatalogPage({ products, onAddToCart }) {
  
  const categories = ["All", "Jazz", "Electronic", "Rock", "Classical"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const validProducts = products || [];

  const filteredProducts =
    selectedCategory === "All"
      ? validProducts
      : validProducts.filter((p) => p.category === selectedCategory);

  return (
    <div className="catalog-container">
      <header className="catalog-hero">
        <h1>Vintage Vibes</h1>
        <p>
          Vintage discs and albums for <b>Your Vibe</b>
        </p>
      </header>

      {
 }
      <div className="filter-bar">
        {categories.map((cat) => {
          <button
            key={cat}
            className={`filter-pill ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>;
        })}
      </div>

      <div className="product-grid">
        {filteredProducts.map((albums) => (
          <AlbumCard
            key={albums.id}
            product={albums.title}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default CatalogPage;