import React, { useState } from "react";
import "./SearchInput.css";
import SearchIcon from "./SearchIcon";
import SearchResult from "./SearchResult";

function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const handleSearch = async () => {
    try {
      if (!searchTerm.trim()) return;

      // Делаем запрос
      const response = await fetch(
        `https://api.github.com/search/users?q=${searchTerm}+in:login`,
      );

      const data = await response.json();

      // Смотрим, что пришло
      console.log("Весь ответ:", data);
      console.log("Всего найдено:", data.total_count);
      console.log("Массив пользователей:", data.items);

      setTotalCount(data.total_count);
      setResults(data.items);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-wrapper">
      <div className="search-input-container">
        <div className="search-button" onClick={handleSearch}>
          {" "}
          <SearchIcon color="var(--text-color-discription)" size="20" />
        </div>

        <input
          id="search"
          className="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {totalCount > 0 &&
        (() => {
          const user = results.filter((user) => {
            return user.login.toLowerCase() === searchTerm.toLowerCase();
          });

          return user.length === 1 && <SearchResult username={user[0].login} />;
        })()}
    </div>
  );
}

export default SearchInput;
