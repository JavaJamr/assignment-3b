import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

const AlbumDetailPage = ({ albums, onAddToCart }) => {
  // create the state of the component
  const { id } = useParams();
  const [qty, setQty] = useState(1);


  //   which album to display on this page?
  const album = albums.find((p) => p.id === id);

  //   sanity check: if album is missing?
  if (!album) {
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
        <Link to="/">Catalog</Link> &gt; <span>{album.title}</span>
      </nav>

      <div className="detail-grid">
        <img src={album.image} alt={album.title} className="detail-img" />

        <div className="detail-info">
          <span className="albums-genre">{album.genre}</span>
          <h1 className="detail-title">{album.title}</h1>
          <p className="detail-price">{album.price.toFixed(2)}</p>
          <p className="detail-desc">{album.description}</p>
        <h3>Tracklist</h3>
        <div className="track-list-section">
            <ol className="tracklist-list">
                {album.tracklist.map((track, index) => (
                <li className="track-list-item" key={index}>{track}</li>))}
            </ol>
        </div>
        <h3>Specifications</h3>
        <div className="detail-specs">
            
            <ol className="specs-list">
                <li>Catalog Number: {album.specs.catalogNumber}</li>
                <li>Weight: {album.specs.weight}</li>
                <li>Speed: {album.specs.speed}</li>
                <li>Label: {album.specs.label}</li>
            </ol>
        </div>
        <div className="stock-tag">
            {album.stock > 0
              ? `✓ In Stock (${album.stock} units available)`
              : "Out of Stock"}
        </div>

          <div className="detail-actions">
            <div className="qty-input-group">
              <label htmlFor="detail-qty">Quantity: </label>
                <input
                  type="number"
                  id="detail-qty"
                  min="1"
                  max={album.stock}
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  onBlur={() =>
                    setQty(
                      Math.min(
                        album.stock,
                        Math.max(1, parseInt(qty, 10) || 1)
                      )
                    )
                  }
                />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => onAddToCart(album, qty)}
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