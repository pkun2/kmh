import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

  return (
    <div>
      <h2>Search Results for: {query}</h2>
    </div>
  );
};

export default SearchPage;