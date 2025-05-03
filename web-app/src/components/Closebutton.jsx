import React from 'react'
import { useState } from 'react'

const Closebutton = ({defaultImage, activeImage}) => {

  const [isToggled, setIsToggled] = useState(false); 

  const handleClick = () => setIsToggled(!isToggled);

  return (
    
    <button onMouseDown={() => setIsToggled(true)}
    onMouseUp={() => setIsToggled(false)}
    onTouchStart={() => setIsToggled(true)}
    onTouchEnd={() => setIsToggled(false)} 
    
    className ="w-6 h-auto flex"> 

            <img src = { isToggled ? activeImage : defaultImage }></img> {/* creates a button component which has image parameter */}

    </button>
    
  )
}

export default Closebutton