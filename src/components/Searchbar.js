// src/components/SearchBar.js
import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search universities..."
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchBar;
