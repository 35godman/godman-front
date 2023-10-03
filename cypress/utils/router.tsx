import { NextRouter } from 'next/router';
import React from 'react';

const createRouter = (params: Partial<NextRouter>) => ({
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  basePath: '',
  back: cy.spy().as('router-back'),
  beforePopState: cy.spy().as('router-beforePopState'),
  prefetch: cy.stub().as('prefetch').resolves(),
  push: cy.spy().as('router-push'),
  reload: cy.spy().as('router-reload'),
  replace: cy.spy().as('router-replace'),
  events: {
    emit: cy.spy().as('router-emit'),
    off: cy.spy().as('router-off'),
    on: cy.spy().as('router-on'),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  defaultLocale: 'en',
  domainLocales: [],
  isPreview: false,
  ...params,
});

interface MockRouterProps extends Partial<NextRouter> {
  children: React.ReactNode;
}

const MockRouter = ({ children, ...props }: MockRouterProps) => {
  const router = createRouter(props);

  return <></>;
};

export default MockRouter;
