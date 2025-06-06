import React from 'react';
import profile from '../assets/profile.png';
import profileOnClick from '../assets/profileOnClick.png';
import settings from '../assets/settings.png';
import settingsOnClick from '../assets/settingsOnClick.png';
import calendar from '../assets/calendar.png';
import calendarOnClick from '../assets/calendarOnClick.png';
import logo from '../assets/logo.svg';
import Navbutton from './Navbutton';

const Navbar = ({ setSettingsMenu, setUserMenu, setEndMenu, notificationRegister }) => {

  return (

    <ul className="fixed w-full h-auto bg-[#FFFFFF] flex flex-row px-2 py-2 border-b border-black items-center gap-2 shadow-md">
      <li className="mr-auto">
        <div className="flex items-center gap-1">
          <button 
          onClick={() => notificationRegister()}
          ><img src={logo} className="w-8 h-auto object-contain"/></button>
          <h1 className="text-[#000000] text-xl ml-2">chirp</h1>
        </div>
      </li>
    
      <li>
        <Navbutton defaultImage={settings} activeImage={settingsOnClick} onClick={() => setSettingsMenu(true)} />

      </li>
    
      <li>
        <Navbutton defaultImage={profile} activeImage={profileOnClick} onClick={() => setUserMenu(true)} />
      </li>

      <li>
        <Navbutton defaultImage={calendar} activeImage={calendarOnClick} onClick ={() => setEndMenu(true)} />
      </li>
      
    </ul>

  )

};

export default Navbar;
