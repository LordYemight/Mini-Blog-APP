import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import UserContext from '../context/userContext';
import '../design/header.css'

function Header () {
  const {setUserInfo, userInfo} = useContext(UserContext);
  useEffect (()=> {
    fetch('http://localhost:5000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo)
      })
    })
  }, []);
  

  function logout () {
    fetch('http://localhost:5000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }
  const username = userInfo?.username;
  return (
    <header>
        <Link to = "/" className='logo'>Dami-Blog</Link>
        <nav>
          {username && (
            <>
            <Link to = '/create'>Create post</Link>
            <a onClick={logout}>Logout</a>
            <span>{username}</span>
            </>
          )} 
          {!username && (
            <>
              <Link to = "/login" className='login' >Login</Link>
              <Link to = "/register" >Register</Link>
            </>
          )}
         
        </nav>
    </header> 
  )
}

export default Header;