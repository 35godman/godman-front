import React from 'react';
import { CardBot } from './CardBot';
import MockRouter from '../../../cypress/utils/router';
import { Provider } from 'react-redux';
import { getStore } from '@/features/store';
import { mount } from 'cypress/react18';
import { userStub } from '../../../test/stubs/user';
import { chatbotStub } from '../../../test/stubs/chatbot';
import { useRouter } from 'next/router';
describe('<CardBot />', () => {
  beforeEach('renders correctly', () => {
    // Set initial state
    cy.window().invoke('setTestReduxState', {
      chars: [
        { id: 'test1', chars: 100 },
        { id: 'test2', chars: 150 },
      ],
    });
    cy.mount(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <Provider store={window.store}>
        <MockRouter asPath="/path/to/route#hash">
          <CardBot nameBot={'test'} botID={'test-123'} />
        </MockRouter>
      </Provider>,
    );
  });

  it('should correctly render CardBot', () => {
    cy.getBySelector('card-test-123').should('be.visible').contains('test');
  });

  it('reset chars after click', () => {
    cy.getBySelector('card-test-123').click();
    cy.window()
      .its('store')
      .invoke('getState')
      .its('chars')
      .should('deep.equal', []);
  });

  it('should navigate to correct URL on card click', () => {
    cy.getBySelector('card-test-123').click();

    cy.spy().as('changeChatbot');
    cy.get('@router-push').should(
      'have.been.calledWith',
      '/gs-bot?chatbot_id=test-123',
    );
  });
});
