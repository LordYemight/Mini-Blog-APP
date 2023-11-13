import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import '../design/auth.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from 'react-toastify';

function RegisterPage() {
  const [userData, setUserData] = useState({ username: '', email: '', password: '' }); // Use a state for username, email, and password
  const [registrationError, setRegistrationError] = useState(null);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  async function register(e) {
    e.preventDefault();

    try {
      const response = await axios.post('/register', userData, {});

      if (response.status === 200) {
        toast.success('Registration successful! You can now log in.');
        navigate('/login');
        setUserData({ username: '', email: '', password: '' });
        setRegistrationError('');
      }
    } catch (error) {
      console.error('Error during registration:', error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setRegistrationError(error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        setRegistrationError('No response received. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setRegistrationError('An error occurred during registration. Please try again later.');
      }
    }
  }

  return (
    <form className="login-container" onSubmit={register}>
      <h2>Register</h2>
      <input
        className='inputText'
        type="text"
        id="username"
        placeholder="username"
        value={userData.username}
        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
      />

      <input
        className='inputText'
        type="email"
        id="email"
        placeholder="email"
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />

      <input
        className='inputText'
        type={visible ? "text" : "password"}
        id="password"
        placeholder="password"
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />
      {visible ? (
        <AiOutlineEye
          className="visible"
          size={20}
          onClick={() => setVisible(false)}
        />
      ) : (
        <AiOutlineEyeInvisible
          className="visible"
          size={20}
          onClick={() => setVisible(true)}
        />
      )}
      {registrationError && <span className="error">{registrationError}</span>}
      <button className="btnLog">Register</button>
      <span>Already have an account, Click here to {<Link to='/login' className='linka' >Login</Link>}</span>
    </form>
  );
}

export default RegisterPage;
