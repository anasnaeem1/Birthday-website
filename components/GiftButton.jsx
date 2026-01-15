'use client'
import React from "react";

const GiftButton = ({ children, onClick, onMouseEnter, style, className = "" }) => {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      style={style}
      className={`
        bg-red-500 
        text-white 
        font-bold 
        py-4 md:py-5 
        px-14 md:px-18 
        text-xl md:text-2xl 
        rounded-full
        shadow-md 
        hover:bg-red-600 
        active:bg-red-700 
        transition-colors 
        duration-150
        relative
        overflow-hidden
        ${className}
      `}
    >
      {/* Glossy effect overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white to-transparent rounded-t-full"></div>
        <div className="absolute top-2 left-4 w-8 h-8 bg-white rounded-full blur-sm"></div>
        <div className="absolute top-2 right-4 w-8 h-8 bg-white rounded-full blur-sm"></div>
      </div>
      
      <span className="relative z-10 underline decoration-2 decoration-white">
        {children}
      </span>
    </button>
  );
};

export default GiftButton;

