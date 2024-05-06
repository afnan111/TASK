// src/components/Listing.js
import React, { useState, useEffect } from 'react';
import ListingController from '../controllers/ListingController';
 
 
const Listing = () => {
  const [universities, setUniversities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    ListingController.fetchData()
      .then(data => setUniversities(data))
      .catch(error => setError('Error fetching data. Please try again later.'));
  }, []);

  // Add search functionality
  const filteredUniversities = universities.filter(university =>
    university.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>List of Universities</h1>
      <SearchBar value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      {error && <p>{error}</p>}
      <ul className="list">
        {filteredUniversities.map((university, index) => (
          <li key={index} className="list-item">
            <a href={university.web_pages[0]} target="_blank" rel="noopener noreferrer">{university.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};



export default Listing;
