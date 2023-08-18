import React from 'react';
import { Card } from 'antd';
import { useRouter } from 'next/router';
import { resetChars } from '@/features/slices/charsCountSlice';
import { useAppDispatch } from '@/features/store';
const { Meta } = Card;

type CardBotProps = {
  nameBot: string;
  botID: string;
  onClick: () => void;
};
export const CardBot: React.FC<CardBotProps> = ({
  nameBot,
  botID,
  onClick,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const changeChatbot = async () => {
    dispatch(resetChars());
    await router.push(`/gs-bot?chatbot_id=${botID}`);
  };

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      onClick={changeChatbot}
      data-test={`card-${botID}`}
    >
      <Meta title={nameBot} description={botID} />
    </Card>
  );
};

/**
 * layers:
 *  app
 *  pages
 *  widgets
 *  features - layer
 *    slices:
 *      ChatbotsList - slice
 *        segments:
 *          ui - это чисто рендер {queryUserById(id)}
 *          model - это бизнес логика (расчеты, хуки)
 *          api - запросы любые запосы, которые делает только эта фича
 *            queryUserById - запрос пользователя по его id
 *          lib - хелперы, утилиты
 *  entites
 *
 * ============
 *  shared
 */
// Главное правило - не импортировать в слое компоненты того же слоя или слоев выше

// feature {<Feature2 />}
const Feature1 = ({ trailing }: { trailing: React.ReactNode }) => {
  return (
    <div>
      <h1>Feature</h1>
      {trailing}
    </div>
  );
};

// Pages
// const Page = () => {
//   return (
//     <div>
//       <Feature1 trailing={<Feature2 />} />
//     </div>
//   );
// };
