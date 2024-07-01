"use client";
import React, { useState, CSSProperties } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'blueviolet',
};


const Spinner = () => {
    const [color, setColor] = useState('#ffffff');
  return (
    <div className='w-full h-[100vh] flex items-center justify-center'>
        <ClipLoader
          color={color}
          loading={true}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
  )
}

export default Spinner