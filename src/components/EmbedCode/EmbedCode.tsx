import React, { FC, useEffect, useState } from 'react';
import { Chatbot } from '@/types/models/globals';
import ConfirmModal from '@/components/UI/ConfirmModal/ConfirmModal';
import globalService from '@/service/globalService';
import { message, Modal } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';

type EmbedCodeProps = {
  chatbot: Chatbot;
  getChatbot: () => Promise<Chatbot | undefined>;
  selected: string;
};

const EmbedCode: FC<EmbedCodeProps> = ({ chatbot, getChatbot, selected }) => {
  const [showModal, setShowModal] = useState<boolean>(true);
  const [newChatbot, setNewChatbot] = useState<Chatbot>(chatbot);
  const changeVisibility = async () => {
    const response = await globalService.post(
      `chatbot/generate-iframe?chatbot_id=${chatbot._id}`,
    );
    if (response.status === 201) {
      const updatedChatbot = await getChatbot();
      if (updatedChatbot) {
        setNewChatbot(updatedChatbot);
        message.info('Успешно обновлена видимость');
      }
    }
  };
  /**
   * @COMMENT
   * as we need to re-update the state of modal when this component mounts
   * im using this approach to show modal when we click on embed tab
   */
  useEffect(() => {
    if (selected === 'embed') {
      setShowModal(true);
    }
  }, [selected]);

  return (
    <>
      {newChatbot.settings.visibility === 'public' ? (
        <>
          <Paragraph code>{chatbot.embed_code.iframe}</Paragraph>

          <Paragraph code>{chatbot.embed_code.script}</Paragraph>
        </>
      ) : (
        <>
          {selected === 'embed' && (
            <ConfirmModal
              show={showModal}
              onConfirm={changeVisibility}
              onCancel={() => setShowModal(false)}
              text={
                'Ваш чатбот приватный. Для генерации iframe, сделаем его публичным, ок?'
              }
            />
          )}
        </>
      )}
    </>
  );
};

export default EmbedCode;
