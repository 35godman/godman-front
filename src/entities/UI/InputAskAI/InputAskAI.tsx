import React from 'react';
import { Input, Button } from 'antd';
import s from './InputAskAI.module.css';

export const InputAskAI = () => {
  return (
    <div className={s.wrapper}>
      <Input className={s.input} placeholder="Ask the AI about Godman" />
      <Button className={s.btn}>Enter</Button>
    </div>
  );
};
