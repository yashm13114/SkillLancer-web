// Footer.js
import React from 'react';
import './styles.css';
import './responsive.css';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'skyblue', padding: '10px', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo Section */}
        <div>
          <img src="logo.png" alt="Logo" className='footer-logo'/>
        </div>

        {/* Links Section */}
        <div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Social Media Icons Section */}
        <div>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="fbicon.png" alt="Facebook"  className='fb'/>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="twittericon.png" alt="Twitter" className='twitter'/>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="instaicon.png" alt="Instagram" className='insta'/>
          </a>
        </div>
      </div>

      {/* Copyright Section (Centered) */}
      <p style={{ color: 'black', marginTop: '50px', textAlign: 'center' }}>&copy; 2023 skill-lancer Website</p>
    </footer>
  );
};

export default Footer;
