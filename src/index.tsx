import React from 'react';
import { render } from 'react-dom';
import { Provider as ModalProvider } from 'react-modaly';

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import LogRocket from 'logrocket';

LogRocket.init('pitomniksnab/pitomniksnab');

Sentry.init({
  dsn: "https://b74ee8ba68ba47dfb3a315bda3a66f62@o198414.ingest.sentry.io/5420709",
  integrations: [
    new Integrations.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
});

// В ошибках sentry можно будет посмотреть ссылку на сеанс
LogRocket.getSessionURL((sessionURL) => {
  Sentry.configureScope((scope) => {
    scope.setExtra('sessionURL', sessionURL);
  });
});

import App from './App';

import './styles/index.scss';
import ApolloBase from "./ApolloBase";

const MODAL_NODE = document.getElementById('modal')!;
const ROOT_NODE = document.getElementById('root')!;

render(
    <ApolloBase>
      <ModalProvider node={MODAL_NODE}>
        <App />
      </ModalProvider>
    </ApolloBase>,
    ROOT_NODE,
);
