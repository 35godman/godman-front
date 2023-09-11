import React from 'react';
import Button from 'antd/lib/button';
import s from './Buttons.module.css';

type btnProps = {
  width?: number;
  height?: number;
  onClick?: () => void;
  type: string;
  text: string;
  style?: any;
};

export const BtnUniv: React.FC<btnProps> = ({
  width,
  height,
  onClick,
  type,
  text,
  style,
}) => {
  if (type === 'regular') {
    return (
      <Button
        style={{ width: `${width}px`, height: `${height}px`, ...style }}
        onClick={onClick}
        className={s.btnRegular}
      >
        {text}
      </Button>
    );
  } else {
    return (
      <Button
        style={{ width: `${width}px`, height: `${height}px`, ...style }}
        onClick={onClick}
        className={s.btnPrimary}
      >
        {text}
      </Button>
    );
  }
};
