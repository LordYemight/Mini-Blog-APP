import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import UserContext from "../context/userContext";
import '../design/auth.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from 'react-toastify';

function LoginPage() {
  const [userData, setUserData] = useState({ username: '', password: '' }); // Use a state for username and password
  const [loginError, setLoginError] = useState(null);
  const [visible, setVisible] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();

    try {
      const response = await axios.post('/login', userData, {});

      if (response.status === 200) {
        setUserInfo(response.data);
        toast.success('Login successful!');
        navigate('/');
        setUserData({ username: '', password: '' });
        setLoginError('');
      }
    } catch (error) {
      console.error('Error during login:', error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setLoginError(error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        setLoginError('No response received. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setLoginError('An error occurred during login. Please try again later.');
      }
    }
  }

  return (
    <form onSubmit={login} className="login-container">
      <h2>Login</h2>
      <input
        className='inputText'
        type="text"
        placeholder="username"
        value={userData.username}
        id="logIn"
        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
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
      {loginError && <span className="error">{loginError}</span>}
      <button className="btnLog">Login</button>
      <span>Don't have an account, Click here to {<Link to='/register' className='linka' >Register</Link>}</span>
    </form>
  );
}

export default LoginPage;
