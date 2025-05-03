import React from 'react';
import profile from '../assets/profile.png';
import profileOnClick from '../assets/profileOnClick.png';
import settings from '../assets/settings.png';
import settingsOnClick from '../assets/settingsOnClick.png';
import logo from '../assets/logo.svg';
import Navbutton from './Navbutton';

const Navbar = () => {

  return (

    <ul className="fixed w-full h-auto bg-[#FFFFFF] flex flex-row px-2 py-2 border-b border-black items-center gap-2">
      <li className="mr-auto">
        <div className="flex items-center gap-1">
          <img src={logo} alt="Logo" className="w-8 h-auto object-contain" />
          <h1 className="text-[#000000] text-xl font-bold">chirp</h1>
        </div>
      </li>
    
      <li>
        <Navbutton defaultImage={settings} activeImage={settingsOnClick} />
      </li>
    
      <li>
        <Navbutton defaultImage={profile} activeImage={profileOnClick} />
      </li>
    </ul>

  )

};

export default Navbar;
