// NavBar.js
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import MobileMenu from './MobileMenu'; // Import the MobileMenu component
import './styles.css'; // Import the CSS file for styling
import './responsive.css';
import { UserContext } from '../App';
const NavBar = ({ isLoggedIn, onToggleLogin, onLogout }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state, dispatch } = useContext(UserContext);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the threshold as needed
    };

    // Set initial mobile state
    handleResize();

    // Attach the event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const RenderMenu = () => {
    if (state) {
      return (
        <>
        
        <nav className={`navbar-container ${isMobile ? 'mobile' : ''}`}>
      <div className="logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          <img src="/logo.png" alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
        </Link>
      </div>
      {isMobile && (
        <>
          <div className="menu-icon" onClick={toggleMenu}>
            &#9776;
          </div>
          <MobileMenu
            isLoggedIn={isLoggedIn}
            isMenuOpen={isMenuOpen} // Pass isMenuOpen as a prop to MobileMenu
            toggleMenu={toggleMenu}
            onLogout={onLogout}
          />
        </>
      )}
      {!isMobile && (
        <div className="menu-items">
          <Link to="/">Home</Link>
          <Link to="/ManageProjects">Projects</Link>
          <Link to="/post-project">
            <button>Post a Project</button>
          </Link>
          <Link to="/userDashboard">Dashboard</Link>
          {isLoggedIn ? (
            <button onClick={onLogout}></button>
          ) : (
            <Link to="/login">
              <button>Logout</button>
            </Link>
          )}
        </div>
      )}
    </nav>
        </>
      )
    } else {
      return (
        <>
          <nav className={`navbar-container ${isMobile ? 'mobile' : ''}`}>

            <div className="logo">
              <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                <img src="/logo.png" alt="Logo" style={{ height: '40px', marginRight: '1zpx' }} />
                {/* Replace "/path/to/logo.png" with the actual path to your logo image */}
              </Link>
            </div>
            {isMobile && (
              <>
                <MobileMenu
                  isLoggedIn={isLoggedIn}
                  isMenuOpen={isMenuOpen} // Pass isMenuOpen as a prop to MobileMenu
                  toggleMenu={toggleMenu}
                  onLogout={onLogout}
                />
                <div className="menu-icon" onClick={toggleMenu}>
                  &#9776;
                </div>
              </>
            )}
            {!isMobile && (
              <div className="menu-items">
                <Link to="/">Home</Link>
                {/* <Link to="/projects">Projects</Link>
                <Link to="/post-project">
                  <button></button>
                </Link> */}

                {isLoggedIn ? (
                  <>
                    <button onClick={onLogout}>Login</button>
                  </>
                ) : (
                  <Link to="/login">
                    <button>Login</button>
                  </Link>
                )}
              </div>
            )}
          </nav>
        </>
      )
    }
  }
  return (
    <>
      <div>
        <RenderMenu />
      </div>
    </>
  );
};

export default NavBar;
