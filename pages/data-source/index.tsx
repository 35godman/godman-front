import React, { FC } from 'react';
import { DataSource } from '../../src/components/DataSource/DataSource';
import { HomeBtn } from '@/components/HomeBtn/HomeBtn';
import { withAuth } from '@/auth/withAuth';
import { User } from '@/types/models/globals';

type DataSourceProps = {
  user_data: User;
};
const dataSourcePage: FC<DataSourceProps> = ({ user_data }) => {
  return (
    <div>
      <HomeBtn />
      <DataSource user={user_data} />
    </div>
  );
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getServerSideProps = withAuth(async (context) => {
  return { props: {} };
});
export default dataSourcePage;
