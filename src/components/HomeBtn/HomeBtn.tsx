import React from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/router';

export const HomeBtn = () => {
  const router = useRouter();
  return (
    <Button onClick={() => router.push('/general-navigation')}>
      Home navigation
    </Button>
  );
};
