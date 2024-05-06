// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListingView from './views/ListView';
import DetailsView from './views/DetailsView';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ListingView />} />
          <Route path="/details/:id" element={<DetailsView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
