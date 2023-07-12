import React from 'react';
import { Button } from 'antd';
import s from './Suggestion.module.css';

type SuggestionProps = {
  textProp: string;
  backgroundColor: string;
};

export const Suggestion: React.FC<SuggestionProps> = ({
  textProp,
  backgroundColor,
}) => {
  return (
    <Button
      style={{ backgroundColor: backgroundColor }}
      className={s.SuggestionBtn}
    >
      {textProp}
    </Button>
  );
};
