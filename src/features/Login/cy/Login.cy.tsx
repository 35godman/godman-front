import React from 'react';
import { LogIn } from '../ui/LogIn';

describe('<Login />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LogIn />);
  });
});
