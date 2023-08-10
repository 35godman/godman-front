import React from 'react';
import { Button } from 'antd';
import { ChatbotSettings } from '@/types/models/globals';
import s from './Suggestion.module.css';
type SuggestionProps = {
  textProp: string;
  onclick?: () => void;
  disabled?: boolean;
  settings: ChatbotSettings;
};

export const Suggestion: React.FC<SuggestionProps> = ({
  textProp,
  onclick,
  disabled,
  settings,
}) => {
  return (
    <Button
      disabled={disabled}
      onClick={onclick}
      style={{
        backgroundColor: settings.bot_message_color,
        color: settings.bot_font_color,
        borderColor: 'rgb(30, 35, 48)',
      }}
      className={`${s.scaleButton} rounded-lg whitespace-break-spaces  mr-1 mt-1  text-sm justify-center items-center  inline-block h-auto`}
    >
      {textProp}
    </Button>
  );
};
