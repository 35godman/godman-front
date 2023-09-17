import React, { useState } from 'react';
import './PlusHelpSvg.css';
type PlusHelpSvgProps = {
  isOpen: boolean;
};
export const PlusHelpSvg: React.FC<PlusHelpSvgProps> = ({ isOpen }) => {
  return (
    <div className="swg-help-wrapper">
      <svg
        className={`iconPlus ${isOpen ? 'crossed-help' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
      >
        <path
          className="line top"
          d="M4.0625 13H21.9375"
          stroke="#5EC6FA"
          strokeWidth="1.73333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="line bottom"
          d="M13 4.0625V21.9375"
          stroke="#5EC6FA"
          strokeWidth="1.73333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
