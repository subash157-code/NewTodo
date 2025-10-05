import React, { useCallback } from "react";
import "./SearchBar.css"; 

export default function SearchBar({ search, onSearch }) {
  const handle = useCallback((e) => onSearch(e.target.value), [onSearch]);

  return (
    <div className="search-container">
      <input
        id="search-input"
        type="text"
        className="search-bar"
        placeholder="Search tasks, category or date..."
        value={search}
        onChange={handle}
      />
      {search && (
        <button
          className="clear-btn"
          onClick={() => onSearch("")}
          title="Clear search"
        >
          ✖
        </button>
      )}
    </div>
  );
}
