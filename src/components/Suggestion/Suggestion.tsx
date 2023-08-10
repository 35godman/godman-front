import React, { MouseEventHandler, useRef } from 'react';
import { Button } from 'antd';
import { ChatbotSettings } from '@/types/models/globals';
import s from './Suggestion.module.css';
type SuggestionProps = {
  textProp: string;
  onclick?: () => Promise<void>;
  disabled?: boolean;
  settings: ChatbotSettings;
};

export const Suggestion: React.FC<SuggestionProps> = ({
  textProp,
  onclick,
  disabled,
  settings,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <Button
      ref={buttonRef}
      disabled={disabled}
      onClick={async () => {
        if (onclick) await onclick();

        if (buttonRef.current) {
          buttonRef.current.style.scale = String(1.1);
        }
        setTimeout(() => {
          if (buttonRef.current) buttonRef.current.style.scale = String(1);
        }, 300);
      }}
      style={{
        backgroundColor: settings.bot_message_color,
        color: settings.bot_font_color,
        borderColor: 'rgb(30, 35, 48)',
      }}
      className={`${s.scaleButton} rounded-lg whitespace-break-spaces  mr-1 mt-1 justify-center items-center  inline-block h-auto `}
    >
      <span className={'text-[0.93rem]'}>{textProp}</span>
    </Button>
  );
};
