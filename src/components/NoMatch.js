import React from 'react';
import {Link} from 'react-router-dom';
  
  const NoMatch = () => {
    return (
      <div>
        <h3>Error 404</h3>
        <Link to="/">Home</Link>
      </div>
    );
  };
  
 export default NoMatch;