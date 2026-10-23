// SearchFilterBar.jsx - search input and category filter
import React from "react";

function SearchFilterBar({ searchTerm, onSearchChange, category, onCategoryChange, categories }) {
  return (
    <section aria-label="Search and filter" className="card toolbar">
      <div className="field">
        <label htmlFor="search">Search articles</label>
        <input id="search" type="search" placeholder="Search by title or author" value={searchTerm} onChange={onSearchChange} />
      </div>
      <div className="field">
        <label htmlFor="category-filter">Filter by category</label>
        <select id="category-filter" value={category} onChange={onCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
    </section>
  );
}

export default React.memo(SearchFilterBar);
