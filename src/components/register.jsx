// RegisterForm.jsx
import React, { useState } from 'react';
import './styles.css'; // Import the CSS file
import './responsive.css'
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  // State variables for form fields
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fname: "", lname: "", email: "", password: "", cpassword: ""
  })

  let name, value;

  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  }
  // Post data to db
  const postData = async (e) => {
    e.preventDefault();
    const { fname, lname, email, password, cpassword } = user


    if (!fname || !lname || !email || !password || !cpassword) {
      alert("Please fill all the fields")


    } else {
      if (password !== cpassword) {
        alert("Password should be match")

      } else {
        const res = await fetch('/register', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fname, lname, email, password, cpassword
          })
        })
        const data = await res.json()

        if (data.status) {
          alert(data.status)

        } else {
          localStorage.setItem('user', JSON.stringify({ ...data, name, password, email }))

          alert("Register successfully")
          navigate('/Login')
          console.log("register successfully");

        }
      }
    }
  }


  return (
    <form className="form2" method='POST'>
      <p className="title">Register</p>
      <p className="message">Let's create your account!</p>
      <div className="flex">
        <label>
          <span>Firstname</span>
          <input
            type="text"
            className="input"
            name='fname'
            value={user.fname}
            onChange={handleInputs}
            placeholder=""
            required
          />

        </label>

        <label>
          <span>Lastname</span>
          <input
            type="text"
            name='lname'
            value={user.lname}
            onChange={handleInputs}
            className="input"
            placeholder=""
          />

        </label>
      </div>

      <label>
      <span>Email</span>
        <input
          type="email"
          className="input"
          value={user.email}
          onChange={handleInputs}
          name='email'
          placeholder=""
          required
        />
   
      </label>

      <label>
      <span>Password</span>
        <input
          type="password"
          name='password'
          value={user.password}
          onChange={handleInputs}
          className="input"
          placeholder=""
          required
        />
  
      </label>

      <label>
      <span>Confirm password</span>
        <input
          type="password"
          className="input"
          value={user.cpassword}
          onChange={handleInputs}
          name='cpassword'
          placeholder=""
          required
        />
 
      </label>
      <button className="submit" type="submit" onClick={postData}>
        Submit
      </button>
      {/* <p className="signin">
  
          <button type='submit'  >Sign in</button>
 
      </p> */}
    </form>
  );
};

export default RegisterForm;
