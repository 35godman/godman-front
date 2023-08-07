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
        height: '35px',
      }}
      className="rounded-xl whitespace-nowrap  mr-1 mt-1  text-xl font-[Montserrat] "
    >
      {textProp}
    </Button>
  );
};
