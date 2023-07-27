import React from 'react';
import { Button } from 'antd';
import s from './Suggestion.module.css';

type SuggestionProps = {
  textProp: string;
};

export const Suggestion: React.FC<SuggestionProps> = ({ textProp }) => {
  return (
    <Button className="rounded-xl whitespace-nowrap  mr-1 mt-1 px-3 text-sm   bg-zinc-100 hover:bg-zinc-200">
      {textProp}
    </Button>
  );
};
