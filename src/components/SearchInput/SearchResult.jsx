import React from "react";
import { useState, useEffect } from "react";
import "./SearchResult.css";

function SearchResult({ username }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!username) return;

      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUser(data);
        console.log(data);
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();
  }, [username]);

  return user ? (
    <div className="search-result">
      <img
        className="search-result-avatar"
        src={user.avatar_url}
        alt="user avatar"
      />
      <div className="search-result-info">
        <h3 className="search-result-username">{user.name}</h3>
        <p className="search-result-discription">{user.bio}</p>
      </div>
    </div>
  ) : null;

  // filteredData.length > 0 ? (
  //   filteredData.map((item) => (
  //     <SearchResult key={item.id} item={item} searchTerm={searchTerm} />
  //   ))
  // ) : searchTerm.length >= 3 ? (
  //   <p className="search-result-fail">
  //     No results found for "{searchTerm}"
  //   </p>
  // ) : null}
}

export default SearchResult;
