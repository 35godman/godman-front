import React, { FC } from 'react';
import { GeneralSettingsBot } from '@/components/GeneralSettingsBot/GeneralSettingsBot';
import { withAuth } from '@/auth/withAuth';
import { User } from '@/types/models/globals';

type GeneralSettingsBotPageProps = {
  user_data: User;
};

const GeneralSettingsBotPage: FC<GeneralSettingsBotPageProps> = ({
  user_data,
}) => {
  return <GeneralSettingsBot />;
};
export const getServerSideProps = withAuth(async (context) => {
  return { props: {} };
});
export default GeneralSettingsBotPage;
