import React from 'react';
import { Settings } from '@/components/Settings/Settings';
import { Layout } from '../../layouts/Layout';
import { withAuth } from '@/auth/withAuth';

const dataSourcePage = () => {
  // return <Settings />;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getServerSideProps = withAuth(async (context) => {
  return { props: {} };
});

export default dataSourcePage;
