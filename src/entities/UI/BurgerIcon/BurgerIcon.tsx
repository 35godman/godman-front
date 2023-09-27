import React, { useEffect, useState } from 'react';
import './BurgerIcon.css';

type BurgerIconProps = {
  externalSetState?: (state: boolean) => void;
  externalConst?: boolean;
};
export const BurgerIcon: React.FC<BurgerIconProps> = ({
  externalSetState,
  externalConst,
}) => {
  const [isCrossed, setIsCrossed] = useState(false);

  const toggleCross = () => {
    setIsCrossed(!isCrossed);
    if (externalSetState) {
      externalSetState(!isCrossed);
    }
  };
  useEffect(() => {
    if (externalConst !== undefined) {
      setIsCrossed(externalConst);
    }
  }, [externalConst]);

  return (
    <svg
      className={`burger-icon ${isCrossed ? 'crossed' : ''}`}
      width="32"
      height="8"
      viewBox="0 0 32 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={toggleCross}
    >
      <path
        className="line top"
        d="M1 1.5H31"
        stroke="#5EC6FA"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="line bottom"
        d="M1 6.5H31"
        stroke="#5EC6FA"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
