import { Provider } from 'redux';
import { store } from './store';

export const App = ({ children }) => {
  return (
    <Provider store={store}>
      <UserContextProvider>{children}</UserContextProvider>
    </Provider>
  );
};
