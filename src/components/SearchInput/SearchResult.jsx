// SearchResult.jsx
import React from "react";
import "./SearchResult.css";

function SearchResult({ user, onSelect }) {
  if (!user) return null;

  return (
    <div className="search-result" onClick={() => onSelect(user.login)}>
      <img
        className="search-result-avatar"
        src={user.avatar_url}
        alt={user.login}
      />
      <div className="search-result-info">
        <h3 className="search-result-username">
          {user.name || user.login}
        </h3>
        <p className="search-result-description">
          {user.bio || "No bio available"}
        </p>
      </div>
    </div>
  );
}

export default SearchResult;