import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../App';


const Logout = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await fetch('/logout', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          dispatch({ type: 'USER', payload: false });
          localStorage.removeItem('user');
          navigate('/Login');
          alert("Log Out Successfully")
        } else {
          console.error('Failed to log out');
          const error = new Error('Failed to log out');
          throw error;
        }
      } catch (err) {
        console.error(err);
      }
    };

    logoutUser();
  }, []); // Empty dependency array to run the effect only once on mount

  // Your component should return JSX, make sure to return something here
  return <div ></div>;
};

export default Logout;
