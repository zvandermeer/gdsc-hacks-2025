import React from 'react'
import { useState } from 'react'

const Closebutton = ({defaultImage, activeImage, onClose}) => {

  const [isToggled, setIsToggled] = useState(false); 

  const handleClick = () => setIsToggled(!isToggled);

  return (
    
    <button onMouseDown={() => setIsToggled(true)}
    onMouseUp={() => {
      setIsToggled(false);
      if (onClose) onClose();
    }}
    onTouchStart={() => setIsToggled(true)}
    onTouchEnd={() => {
      setIsToggled(false);
      if (onClose) onClose();
    }}
    
    className ="w-6 h-auto flex"> 

            <img src = { isToggled ? activeImage : defaultImage }></img> {/* creates a button component which has image parameter */}

    </button>
    
  )
}

export default Closebutton