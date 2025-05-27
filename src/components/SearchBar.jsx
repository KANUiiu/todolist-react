import React from 'react';

function SearchBar({ searchKeyword, setSearchKeyword }) {
  return (
    <input
      type="text"
      placeholder="Search tasks..."
      value={searchKeyword}
      onChange={(e) => setSearchKeyword(e.target.value)}
      className="border px-2 py-1 w-full rounded"
    />
  );
}

export default SearchBar;
