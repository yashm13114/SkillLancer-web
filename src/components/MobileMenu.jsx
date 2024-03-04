// MobileMenu.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const MobileMenu = ({ isLoggedIn, isMenuOpen, toggleMenu, onLogout }) => {
  return (
    <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
      <div className="menu-items">
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <Link to="/projects" onClick={toggleMenu}>Projects</Link>
        {isLoggedIn ? (
          <>
            <Link to="/chats" onClick={toggleMenu}>Chats</Link>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login" onClick={toggleMenu}>
            <button>Login</button>
          </Link>
        )}
        <Link to="/post-project" onClick={toggleMenu}>
          <button>Post a Project</button>
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
