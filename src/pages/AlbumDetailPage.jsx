import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

const AlbumDetailPage = ({ albums, onAddToCart }) => {
  // create the state of the component
  const { AlbumId } = useParams();
  const [qty, setQty] = useState(1);

  //   which product to display on this page?
  const product = albums.find((p) => p.id === albums.id);

  //   sanity check: if product is missing?
  if (!albums) {
    return (
      <div className="detail-error">
        <h2>Album Not Found</h2>
        <Link className="btn btn-secondary" to="/">
          Return To Main Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <nav className="breadcrumb">
        <Link to="/">Catalog</Link> &gt; <span>{albums.name}</span>
      </nav>

      <div className="detail-grid">
        <img src={albums.image} alt={albums.name} className="detail-img" />

        <div className="detail-info">
          <span className="albums-category">{albums.category}</span>
          <h1 className="detail-title">{albums.name}</h1>
          <p className="detail-price">{albums.price.toFixed(2)}</p>
          <p className="detail-desc">{albums.description}</p>
        <div className="track-list-section">
            <h3>Tracklist</h3>
            <ol className="tracklist-list">
                {albums.tracklist.map((track, index) => (
                <li key={index}>{track}</li>))}
            </ol>
        </div>
        <div className="detail-specs">
            <h3>Specifications</h3>
            <ol className="specs-list">
                <li>Catalog Number: {albums.specs.catalogNumber}</li>
                <li>Weight: {albums.specs.weight}</li>
                <li>Speed: {albums.specs.speed}</li>
                <li>Label: {albums.specs.label}</li>
            </ol>
        </div>
        <div className="stock-tag">
            {product.stock > 0
              ? "✓ In Stock ({albums.stock} units available)"
              : "Out of Stock"}
        </div>

          <div className="detail-actions">
            <div className="qty-input-group">
              <label htmlFor="detail-qty">Quantity: </label>
              <input
                type="number"
                id="detail-qty"
                min="1"
                max={albums.stock}
                value={qty}
                onChange={(e) =>
                  setQty(Math.max(1, parseInt(e.target.value, 10) || 1))
                }
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => onAddToCart(albums, qty)}
            >
              Add {qty} to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetailPage;