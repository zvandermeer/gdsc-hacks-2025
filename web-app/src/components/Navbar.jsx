import React from 'react';
import profile from '../assets/profile.png';
import profileOnClick from '../assets/profileOnClick.png';
import settings from '../assets/settings.png';
import settingsOnClick from '../assets/settingsOnClick.png';
import logo from '../assets/logo.png';
import Navbutton from './Navbutton';

const Navbar = () => {

  return (

    <div className="fixed w-full h-auto bg-[#FFFFFF] flex px-6 py-2 border-b-2 border-black items-center justify-between">

      <div className="flex items-center gap-8">

        <img src={logo} alt="Logo" className="w-14 h-auto object-contain"></img>

        <h1 className="text-[#000000] text-3xl font-bold">chirp</h1>

      </div>

      <ul className="flex gap-8">

        <li> <Navbutton defaultImage = {settings} activeImage = {settingsOnClick} /> </li>

        <li> <Navbutton defaultImage = {profile} activeImage = {profileOnClick} /></li>

      </ul>

    </div>

  )

};

export default Navbar;
