// UserDashboard.js

import React from 'react';
import './styles.css'; // Import your stylesheet
import './responsive.css'

const UserDashboard = () => {
  return (
    <div className="user-dashboard-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <h1>Welcome, [User Name]!</h1>
        <p>Your Dashboard Overview</p>
      </header>

      {/* Quick Stats Section */}
      <section className="quick-stats">
        <div className="stat-box">
          <h2>Total Projects</h2>
          <p>[Number]</p>
        </div>
        <div className="stat-box">
          <h2>Active Projects</h2>
          <p>[Number]</p>
        </div>
        <div className="stat-box">
          <h2>Completed Projects</h2>
          <p>[Number]</p>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section className="recent-projects">
        <h2>Recent Projects</h2>
        {/* Display a list of recent projects with project details */}
        <ul>
          <li>[Project 1]</li>
          <li>[Project 2]</li>
          {/* Add more projects as needed */}
        </ul>
      </section>

      {/* Account Settings Section */}
      <section className="account-settings">
        <h2>Account Settings</h2>
        <button>Edit Profile</button>
        <button>Change Password</button>
        <button>Logout</button>
      </section>

      {/* Footer Section */}
      <footer className="dashboard-footer">
        <p>&copy; 2023 Skilllancer. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UserDashboard;
