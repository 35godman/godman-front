import React from 'react';
import Button from 'antd/lib/button';
import s from './Buttons.module.css';
import cn from 'classnames';

type btnProps = {
  width?: number;
  height?: number;
  onClick?: () => void;
  type: string;
  text: string;
  style?: any;
  clasName?: string;
};

export const BtnUniv: React.FC<btnProps> = ({
  width,
  height,
  onClick,
  type,
  text,
  style,
  clasName,
}) => {
  if (type === 'regular') {
    return (
      <Button
        style={{ width: `${width}px`, height: `${height}px`, ...style }}
        onClick={onClick}
        className={clasName ? cn(s.btnRegular, clasName) : s.btnRegular}
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
