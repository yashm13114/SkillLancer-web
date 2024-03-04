// ProjectListing.js

import React from 'react';
import './styles.css'; //
import './responsive.css'
import ManageProjects from './ManageProjects';

const ProjectListing = ({ project }) => {
  
  // Check if 'project' is defined before accessing properties
  if (!project) {
    return null; // or handle the absence of data in another way
  }
  return (
    <>
    <ManageProjects />
    </>
    // <div style={{ backgroundColor: 'navy', color: 'white', padding: '20px' }}>
    //   <h2>Project Listings</h2>
    //   <div className="project-card">
    //   <div className="project-header">
    //     <h3>{project.title}</h3>
    //   </div>
    //   <div className="project-details">
    //     <p>{project.description}</p>
    //     <p>Skills Required: {project.skills.join(', ')}</p>
    //   </div>
    //   <div className="project-footer">
    //     <p>Posted by: {project.author}</p>
    //     <p>Posted on: {project.datePosted}</p>
    //   </div>
    // </div>
    // </div>
  );
};

export default ProjectListing;