import React, { FC } from 'react';
import { Suggestion } from '@/entities/Suggestion/Suggestion';
import { Chatbot } from '@/types/models/globals';

export type SuggestedContainerProps = {
  chatbot: Chatbot;
  buttonLoading: boolean;
  sendMessage: (msg: string) => Promise<void>;
  preview_messages?: string[];
};

const SuggestedContainer: FC<SuggestedContainerProps> = ({
  chatbot,
  buttonLoading,
  sendMessage,
  preview_messages,
}) => {
  /**
   * @COMMENT FOR PREVIEW
   */
  if (preview_messages?.length) {
    return (
      <div className="flex flex-col m-auto w-[88%] border-b border-black pb-4 mb-0 mt-0">
        {preview_messages.map((msg) => {
          return (
            <Suggestion
              disabled={buttonLoading}
              textProp={msg}
              key={msg}
              onclick={() => sendMessage(msg)}
              settings={chatbot.settings}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-col m-auto w-[88%] border-b border-black pb-4 mb-0 mt-0">
      {chatbot.settings.suggested_messages.map((msg) => {
        return (
          <Suggestion
            disabled={buttonLoading}
            textProp={msg}
            key={msg}
            onclick={() => sendMessage(msg)}
            settings={chatbot.settings}
          />
        );
      })}
    </div>
  );
};

export default SuggestedContainer;
