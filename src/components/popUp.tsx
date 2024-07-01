"use client"
import React from 'react'


const PopUp = ({message,type}:{message:string, type:'success' | 'error'}) => {
  return (
    <div className='fixed top-4 right-4 notif '>
    <div className={` shadow p-4 font-bold ${type === 'success' ? 'bg-green-50 text-green-700 border-l-4 border-green-700 ' : 'bg-red-50 text-red-700 border-l-4 border-red-700'} `}>
      {message}

    </div>
    <div className="progress-bar "></div>
    <style jsx>{`
    
    .progress-bar::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: ${message==="success"?"red":"green"};

      animation: progress-animation 5s linear forwards;
    }

 
  `}</style>
  </div>
  )
}

export default PopUp