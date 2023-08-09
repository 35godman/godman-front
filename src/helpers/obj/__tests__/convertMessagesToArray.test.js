// import { fireEvent } from '@testing-library/react';
import { convertMessagesToArray } from '../convertMessagesToArray';

// const Button = ({ text, onClick }) => (
//   <button testID="button-test" onClick={onClick}>
//     {text}
//   </button>
// );

test('convertMessagesToArray', () => {
  // const testFunc = jest.fn();
  // const testComponent = renderer
  //   .create(<Button text="Test" onClick={testFunc} />)
  //   .toJSON();

  // const but = testComponent.getByTestId('button-test');
  // fireEvent.click(but);

  expect(convertMessagesToArray('hello\nworld').length).toEqual(2);
  // expect(testFunc).toBeCalled();
});
