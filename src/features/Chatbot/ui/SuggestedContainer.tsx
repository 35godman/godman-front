import React, { FC } from 'react';
import { Suggestion } from '@/components/Suggestion/Suggestion';
import { Chatbot } from '@/types/models/globals';

export type SuggestedContainerProps = {
  chatbot: Chatbot;
  buttonLoading: boolean;
  sendMessage: (msg: string) => Promise<void>;
};

const SuggestedContainer: FC<SuggestedContainerProps> = ({
  chatbot,
  buttonLoading,
  sendMessage,
}) => {
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
