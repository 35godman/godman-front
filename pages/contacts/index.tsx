import React from 'react';
import { ContactTeam } from '@/entities/MainPage/ContactTeam/ContactTeam';

const index = () => {
  return (
    <>
      <ContactTeam />
    </>
  );
};
export async function getServerSideProps() {
  return { props: { noLayout: true } };
}

export default index;
