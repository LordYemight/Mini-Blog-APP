import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/header'

function Layout () {
  return(
    <main>
      <Header /> 
      <Outlet />
    </main>
  )
}

export default Layout;