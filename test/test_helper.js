import React from 'react';
import jsdom from 'jsdom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import chaiEnzyme from 'chai-enzyme';
import chai from 'chai';
import { mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';

import reducers from '../src/reducers';

chai.use(chaiEnzyme());

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.navigator = global.window.navigator;

function logUnhandledPromise() {
  process.on('unhandledRejection', (reason) => {
    console.error('UHProm REASON: ', reason);
  });
}

function renderContainer(ContainerName, props = {}, state = {}) {
  logUnhandledPromise();

  return mount(
    <Router>
      <div>
        <Provider store={createStore(reducers, state)}>
          <ContainerName {...props} />
        </Provider>,
      </div>
    </Router>,
  );
}

export default renderContainer;
