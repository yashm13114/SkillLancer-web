// MobileMenu.js
import React from 'react';
import { Link } from 'react-router-dom';

const MobileMenu = ({ isLoggedIn, isMenuOpen, toggleMenu, onLogout }) => {
  const handleLinkClick = () => {
    toggleMenu(); // Close the sidebar when a link is clicked
  };

  return (
    <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
      <div className="sidebar">
        <Link to="/" onClick={handleLinkClick}>Home</Link>
        <Link to="/ManageProjects" onClick={handleLinkClick}>Projects</Link>
        <Link to="/post-project" onClick={handleLinkClick}>Post a Project</Link>
        <Link to="/userDashboard" onClick={handleLinkClick}>Dashboard</Link>
        {isLoggedIn ? (
          <button onClick={onLogout}>Logout</button>
        ) : (
          <Link to="/login" onClick={handleLinkClick}>Login</Link>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
