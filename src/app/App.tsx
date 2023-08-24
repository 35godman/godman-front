import { Provider } from 'react-redux';
import store from '@/app/store/store';
import React, { FC } from 'react';
import NextNProgress from 'nextjs-progressbar';

export const App: FC = ({ children }) => {
  return (
    <Provider store={store}>
      <NextNProgress />
      <>{children}</>
    </Provider>
  );
};
