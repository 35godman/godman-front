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
  return <GeneralSettingsBot user_data={user_data} />;
};
export const getServerSideProps = withAuth(async () => {
  return { props: {} };
});
export default GeneralSettingsBotPage;
