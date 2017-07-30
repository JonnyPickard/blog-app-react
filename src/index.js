import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

const styles = {
  divStyles: {
    paddingTop: 10,
  },
};

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <div style={styles.divStyles}>
      <App />
    </div>
  </Provider>, document.querySelector('.container'),
);
