// PostProjectForm.jsx
import React, { useState } from 'react';
import './postprojectform.css'; // Import your CSS file
import './responsive.css'

const PostProjectForm = ({ onPostProject }) => {
  const [projects, setProjects] = useState({
    title: "", discription: "", skills: "", budget: ""
  })
  let name, value;

  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setProjects({ ...projects, [name]: value });
  }
  const PostProjects = async (e) => {
    e.preventDefault();
    const { title, discription, skills, budget } = projects


    if (!title || !discription || !skills || !budget) {
      alert("Please fill all the fields")
    } else {
      const res = await fetch('/projectposting', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title, discription, skills, budget
        })
      })
      const data = await res.json()

      if (data.status) {
        alert(data.status)

      } else {

        alert("Project posted successfully")
      
        console.log("Project posted successfully");

      }

    }
  }

  return (
    <div className="post-project-form-container">
      <h2 className="form-title">Post a Project</h2>
      <form className="post-project-form" >
        <label>
          Title:
          <input type="text"  name='title'
            value={projects.title}
            onChange={handleInputs}/>
        </label>
        <label>
          Description:
          <textarea name='discription'
            value={projects.discription}
            onChange={handleInputs} />
        </label>
        <label>
          Skills (comma-separated):
          <input type="text" name='skills'
            value={projects.skills}
            onChange={handleInputs}/>
        </label>
        <label>
          Budget:
          <input type="text" name='budget'
            value={projects.budget}
            onChange={handleInputs}/>
        </label>
        <button type="submit" className="submit-button" onClick={PostProjects}>Post Project</button>
      </form>
    </div>
  );
};

export default PostProjectForm;
