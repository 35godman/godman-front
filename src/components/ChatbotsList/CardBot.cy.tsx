import React from 'react';
import { CardBot } from './CardBot';
import MockRouter from '../../../cypress/utils/router';
describe('<CardBot />', () => {
  beforeEach('should have the right initial state', () => {
    cy.window()
      .its('store')
      .invoke('getState')
      .should('deep.equal', { contacts: [], isModalCreationOpen: false });
  });
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <MockRouter asPath="/path/to/route#hash">
        <CardBot nameBot={'test'} botID={'test-123'} />
      </MockRouter>,
    );
  });
});
