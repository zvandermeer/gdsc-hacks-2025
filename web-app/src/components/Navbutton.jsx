import React from 'react'
import { useState } from 'react'

const Navbutton = ({defaultImage, activeImage, onClick }) => {

  const [isToggled, setIsToggled] = useState(false); 

  const handleClick = () => setIsToggled(!isToggled);

  return (
    
    <button 
      onMouseDown={() => setIsToggled(true)}
      onMouseUp={() => { setIsToggled(false); if (onClick) onClick(); }} 
      onTouchStart={() => setIsToggled(true)}
      onTouchEnd={() => { setIsToggled(false); if (onClick) onClick();}}
      className="w-10 h-auto flex"  
      >
        
  <img src={isToggled ? activeImage : defaultImage} />
</button>

    
  )
}

export default Navbutton