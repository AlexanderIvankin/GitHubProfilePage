// SearchInput.jsx
import React, { useState, useEffect } from "react";
import "./SearchInput.css";
import SearchIcon from "./SearchIcon";
import SearchResult from "./SearchResult";

function SearchInput({ onSelectProfile }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [exactUser, setExactUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setExactUser(null);
      setNotFound(false);
    }
  }, [searchTerm]);

  const handleSearch = async () => {
    try {
      if (!searchTerm.trim()) return;

      setLoading(true);
      setNotFound(false);
      setExactUser(null);

      const response = await fetch(
        `https://api.github.com/users/${encodeURIComponent(searchTerm)}`,
      );

      if (response.status === 404) {
        setNotFound(true);
      } else if (response.ok) {
        const user = await response.json();
        setExactUser(user);
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSelectUser = (username) => {
    onSelectProfile(username);
    setSearchTerm("");
    setExactUser(null);
  };

  return (
    <div className="search-wrapper">
      <div className="search-input-container">
        <div className="search-button" onClick={handleSearch}>
          <SearchIcon color="var(--text-color-description)" size="20" />
        </div>

        <input
          id="search"
          className="search-input"
          type="text"
          maxLength={50}
          minLength={2}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter GitHub username..."
        />

        <div className="search-result-wrapper">
          {loading && <div className="search-loading">Searching...</div>}

          {notFound && (
            <div className="search-result-fail">
              No user found for "{searchTerm}"
            </div>
          )}

          {exactUser && (
            <SearchResult user={exactUser} onSelect={handleSelectUser} />
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchInput;
