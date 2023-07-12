import React from 'react';
import { DataSource } from '../../src/components/DataSource/DataSource';
import { HomeBtn } from '@/components/HomeBtn/HomeBtn';

const dataSourcePage = () => {
  return (
    <div>
      <HomeBtn />
      <DataSource />
    </div>
  );
};

export default dataSourcePage;
