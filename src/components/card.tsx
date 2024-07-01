"use client"
import React from "react";

type State = "done" | "doing" | "to do";

interface CardProps {
  children: React.ReactNode;
  state: State;
}

const Card: React.FC<CardProps> = ({ children, state }) => {
  return (
    state === "done" ? (
      <div className="w-[300px] h-[150px] bg-white border-t-4 border-primary rounded-lg flex flex-col justify-between shadow-lg p-3 mb-4">
        {children}
      </div>
    ) : (
        state==="doing" || state==="to do" ?(
        <div className="w-[300px] h-[150px] bg-white border-t-4 border-secondary rounded-lg flex flex-col justify-between shadow-lg p-3 mb-4">
            {children}
        </div>
    ): undefined
    )
    
  );
}

export default Card;
