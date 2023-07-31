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
export default dataSourcePage;
