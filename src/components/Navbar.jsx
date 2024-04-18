import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const handleLogout = () => {
    // Perform logout actions (e.g., clear session storage)
    sessionStorage.removeItem('isLoggedIn'); // Remove the isLoggedIn key from session storage
    window.location.href = '/login'; // Redirect to the login page
  };

  // Check if the user is logged in
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">My App</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className={`nav-link ${location.pathname === '/BMI' && 'active'}`} to="/BMI">Friend BMI Api</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={`nav-link ${location.pathname === '/meal-db' && 'active'}`} to="/meal-db">Public API Meal DB</NavLink>
            </li>
          </ul>
          {/* Conditional rendering of Logout button */}
          {isLoggedIn ? (
            <button className="btn btn-outline-light ms-auto" onClick={handleLogout}>Logout</button>
          ) : (
            <NavLink className="btn btn-outline-light ms-auto" to="/login">Login</NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
