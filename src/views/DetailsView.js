import React from 'react';

const DetailsView = ({ item }) => {
  return (
    <div>
      <h1>Details Page</h1>
      <p>Item Name: {item.name}</p>
      {/* Display more details about the item */}
    </div>
  );
};

export default DetailsView;
