// LoginForm.jsx

import React, { useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
const Login = () => {
  const { state, dispatch } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const LoginUser = async (e) => {
    e.preventDefault();


    try {
      const res = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(), // Trim any leading/trailing whitespaces
          password: password.trim(), // Trim any leading/trailing whitespaces
        }),
      });

      console.log('Server Response Status:', res.status);

      if (!res.ok) {
        console.error('Fetch error:', res.status, res.statusText);
        alert('Invalid Credentials');
        return;
      }

      const data = await res.json();

      console.log('Server Response Data:', data);

      if (!data) {
        alert('Invalid Credentials');
      } else {
        dispatch({ type: 'USER', payload: { isLoggedIn: true, user: { ...data, name: data.name, username: data.username } } });

        localStorage.setItem('user', JSON.stringify({ ...data, password, email }));
        alert("Login Successfully");
        console.log("Logged in user:", data.username);
        navigate('/');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Error during login. Please try again.');
    }
  };

  return (
    <form className="form">
      <p className="form-title">Sign in to your account</p>
      <div className="input-container">
        <input type="email" value={email}
          onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
        <span>{/* You can add any additional elements inside the span if needed */}</span>
      </div>
      <div className="input-container">
        <input type="password" value={password}
          onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
      </div>
      <button type="submit" onClick={LoginUser}  className="submit">
        Sign in
      </button>
      <p className="signup-link">
        No account?
        <Link to="/register">
          <button>register</button>
        </Link>
      </p>
    </form>
  );
};

export default Login;
