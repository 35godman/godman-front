import React, { FC } from 'react';
import { ChatbotsList } from '@/components/ChatbotsList/ChatbotsList';
import { withAuth } from '@/auth/withAuth';
import { User } from '@/types/models/globals';

type ChatbotsListProps = {
  user_data: User;
};

const ChatbotListPage: FC<ChatbotsListProps> = ({ user_data }) => {
  return (
    <>
      <ChatbotsList user_data={user_data} />
    </>
  );
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// export const getServerSideProps = withAuth(async (context) => {
//   return { props: {} };
// });
export default ChatbotListPage;
