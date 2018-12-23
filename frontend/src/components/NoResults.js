import React from "react";
import { Link } from 'react-router-dom';

const NoResults = () => {
  return (
    <div className="products">
      <div className="no-results">
        <h2>Sorry, Page Not Found</h2>
        <Link to='/'> Visit Home </Link>
      </div>
    </div>
  );
};

export default NoResults;