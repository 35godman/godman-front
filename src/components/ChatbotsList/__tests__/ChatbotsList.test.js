import React from 'react';
import renderer from 'react-test-renderer';
import { ChatbotsList } from '../ChatbotsList';

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));
jest.mock('../../../features/store', () => ({
  useAppDispatch: () => jest.fn(),
}));
jest.mock('react-redux', () => ({
  useSelector: () => ({
    _id: 'id',
  }),
}));

test('ChatbotsList renders correctly', () => {
  const list = renderer.create(<ChatbotsList />).toJSON();
  expect(list).toMatchSnapshot();
});
