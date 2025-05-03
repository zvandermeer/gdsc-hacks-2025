import React from 'react'


function ProgressBar({numerator, denominator}){
    const percentage = denominator > 0 ? (numerator/denominator) * 100 : 0;
    return(
        <div
        className="flex w-80 h-3 bg-gray-200 rounded-full overflow-hidden"
      >
        <div
          className="flex flex-col justify-center rounded-full overflow-hidden bg-black text-xs text-white text-center whitespace-nowrap transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    )
}

export default ProgressBar
