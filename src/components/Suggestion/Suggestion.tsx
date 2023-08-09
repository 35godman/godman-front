import React from 'react';
import { Button } from 'antd';

type SuggestionProps = {
  textProp: string;
  onclick?: () => void;
  disabled?: boolean;
};

export const Suggestion: React.FC<SuggestionProps> = ({
  textProp,
  onclick,
  disabled,
}) => {
  return (
    <Button
      disabled={disabled}
      onClick={onclick}
      style={{
        backgroundColor: 'rgb(30, 35, 48)',
        color: '#fff',
        borderColor: 'rgb(30, 35, 48)',
      }}
      className="rounded-lg whitespace-nowrap  mr-1 mt-1  text-sm flex justify-center items-center hover:scale-105"
    >
      {textProp}
    </Button>
  );
};
