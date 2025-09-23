import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom';
import Login from './Login';
import Footer from './Footer';

const Body = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer />
    </div>
  )
}

export default Body;