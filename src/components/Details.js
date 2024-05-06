import React from 'react';
import { useParams } from 'react-router-dom';

const Details = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Details Page</h1>
      <p>Item Name: {id}</p>
      {/* Display more details about the item */}
    </div>
  );
};

export default Details;
