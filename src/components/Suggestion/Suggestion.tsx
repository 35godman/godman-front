import React from 'react';
import { Button } from 'antd';
import s from './Suggestion.module.css';

type SuggestionProps = {
  textProp: string;
};

export const Suggestion: React.FC<SuggestionProps> = ({ textProp }) => {
  return <Button className={s.SuggestionBtn}>{textProp}</Button>;
};
