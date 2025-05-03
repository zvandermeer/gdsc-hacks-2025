import React from 'react'
import { useState } from 'react'
import close from '../assets/close.png';
import closeOnClick from '../assets/closeOnClick.png';
import Closebutton from './Closebutton';

// for all new pages like settings and profile
const NewPage = ({children}) => {

  return (

    <div>
    
    <div className="fixed inset-0 bg-[#808080] opacity-70 z-10"></div>
        {/* W & H ARE WIDTH AND HEIGHT*/}

        <div className="fixed bg-white border border-black w-[80%] h-[40%] right-[10%] top-[10%] z-20 px-2 py-2">

          <Closebutton defaultImage = {close} activeImage = {closeOnClick} />
          
          {children}
          
  
        </div>
  
    </div>

  )
  
}

export default NewPage