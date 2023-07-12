import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
const { Meta } = Card;

type CardBotProps = {
  photoLink?: string;
  nameBot?: string;
  botID?: string;
};
export const CardBot: React.FC<CardBotProps> = ({
  photoLink,
  nameBot,
  botID,
}) => {
  const [cardPhoto, setCardPhoto] = useState('./chatbot-image.png');
  const [botName, setBotName] = useState('General');
  const [botIDCurrent, setBotIDCurrent] = useState('HHu23uuss31');

  useEffect(() => {
    if (photoLink && photoLink.length > 0) {
      setCardPhoto(photoLink);
    }
    if (nameBot && nameBot.length > 0) {
      setBotName(nameBot);
    }
    if (botID && botID.length > 0) {
      setBotIDCurrent(botID);
    }
  }, [photoLink, nameBot, botID]);
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src={cardPhoto} />}
    >
      <Meta title={botName} description={botIDCurrent} />
    </Card>
  );
};
