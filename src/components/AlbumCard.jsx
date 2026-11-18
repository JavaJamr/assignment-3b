import React from "react";
import { Link } from "react-router-dom";

const AlbumCard = ({ albums, onAddToCart }) => {
  // sanity check: make sure that product to display is not broken
  if (!albums) return null;

  return (
    <article className="album-card">
      <Link className="albums-img-link" to={`/albums/${albums.id}`}>
        <img
          className="album-image"
          src={albums.image}
          alt={albums.title}
          loading="lazy"
        />
      </Link>
      <div className="album-body">
        <span className="album-genre">{albums.genre}</span>
        <h3 className="album-title">
          <Link to={`/albums/${albums.id}`}>{albums.title}</Link>
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
          onClick={() => onAddToCart(albums)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default AlbumCard;