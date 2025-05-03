import React from 'react'
import { useState } from 'react'
import close from '../assets/close.png';
import closeOnClick from '../assets/closeOnClick.png';
import Closebutton from './Closebutton';

// for all new pages like settings and profile
const NewPage = () => {

  return (

    <div>
    
      <div className="fixed w-full h-full bg-[#000000] px-6 py-2 z-1000 opacity-50 items-center">

        {/* W & H ARE WIDTH AND HEIGHT*/}

        <div className="fixed bg-white w-[80%] h-[40%] rounded-lg right-[10%] top-[10%] px-2 py-2">

          <Closebutton defaultImage = {close} activeImage = {closeOnClick} />

          <p className = "ml-3 mt-2 mb-2">TEXT TEXT TEXT TEXT TEXT TEXT TEXT</p>
  
        </div>

      </div>
  
    </div>

  )
  
}

export default NewPage