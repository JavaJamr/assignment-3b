import React from "react";
import { Link } from "react-router-dom";

const AlbumCard = ({ albums, onAddToCart }) => {
  // sanity check: make sure that product to display is not broken
  if (!albums) return null;

  return (
    <article className="albums-card">
      <Link className="albums-img-link" to={`/albums/${albums.id}`}>
        <img
          className="albums-image"
          src={albums.image}
          alt={albums.name}
          loading="lazy"
        />
      </Link>
      <div className="albums-body">
        <span className="albums-category">{albums.category}</span>
        <h3 className="albums-title">
          <Link to={`/albums/${albums.id}`}>{albums.name}</Link>
        </h3>
        <p className="albums-price">
          $
          {typeof albums.price === "number"
            ? albums.price.toFixed(2)
            : "Contact For Price"}
        </p>
        <button
          className="btn btn-secondary btn-block"
          type="button"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default AlbumCard;