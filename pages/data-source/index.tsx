import React, { FC } from 'react';
import { HomeBtn } from '@/components/HomeBtn/HomeBtn';
import { withAuth } from '@/auth/withAuth';
import { User } from '@/types/models/globals';

type DataSourceProps = {
  user_data?: User;
};
const dataSourcePage: FC<DataSourceProps> = () => {
  return (
    <div>
      <HomeBtn />
      {/*<DataSource />*/}
    </div>
  );
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getServerSideProps = withAuth(async (context) => {
  return { props: {} };
});
export default dataSourcePage;
