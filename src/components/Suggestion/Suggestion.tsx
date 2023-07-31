import React from 'react';
import { Button } from 'antd';

type SuggestionProps = {
  textProp: string;
  onclick?: () => void;
};

export const Suggestion: React.FC<SuggestionProps> = ({
  textProp,
  onclick,
}) => {
  return (
    <Button
      onClick={onclick}
      className="rounded-xl whitespace-nowrap  mr-1 mt-1 px-3 text-sm   bg-zinc-100 hover:bg-zinc-200"
    >
      {textProp}
    </Button>
  );
};
