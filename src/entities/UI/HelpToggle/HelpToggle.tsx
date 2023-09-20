import React, { useState } from 'react';
import s from './HelpToggle.module.css';
import { PlusHelpSvg } from '../PlusHelpSvg/PlusHelpSvg';

type HelpToggleProps = {
  heading: string;
  text: string;
};

export const HelpToggle: React.FC<HelpToggleProps> = ({ heading, text }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={s.toggleWrapper}>
      <div className={s.headingWrapper} onClick={handleToggle}>
        <p className={s.heading}>{heading}</p>
        <PlusHelpSvg isOpen={isOpen} />
      </div>
      <p className={`${s.text} ${isOpen ? s.openText : ''}`}>{text}</p>
    </div>
  );
};
