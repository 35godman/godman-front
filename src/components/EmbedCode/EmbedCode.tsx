import React, { FC, useEffect, useState } from 'react';
import { Chatbot } from '@/types/models/globals';
import ConfirmModal from '@/components/UI/ConfirmModal/ConfirmModal';
import globalService from '@/shared/service/globalService';
import { message } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import { useIntl } from 'react-intl';

type EmbedCodeProps = {
  chatbot: Chatbot;
  getChatbot: () => Promise<Chatbot | undefined>;
  selected: string;
};

const EmbedCode: FC<EmbedCodeProps> = ({ chatbot, getChatbot, selected }) => {
  const [showModal, setShowModal] = useState<boolean>(true);
  const intl = useIntl();
  const [newChatbot, setNewChatbot] = useState<Chatbot>(chatbot);
  const changeVisibility = async () => {
    message.loading(intl.formatMessage({ id: 'message.loading' }));
    const response = await globalService.post(
      `chatbot/generate-iframe?chatbot_id=${chatbot._id}`,
    );
    if (response.status === 201) {
      const updatedChatbot = await getChatbot();
      if (updatedChatbot) {
        setNewChatbot(updatedChatbot);
        message.success(intl.formatMessage({ id: 'message.success' }));
      }
    } else {
      message.error(intl.formatMessage({ id: 'message.error' }));
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
              text={intl.formatMessage({ id: 'embedCode.private-bot-alert' })}
            />
          )}
        </>
      )}
    </>
  );
};

export default EmbedCode;
