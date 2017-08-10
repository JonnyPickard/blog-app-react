import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import PostsIndex from './components/posts_index';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const styles = {
  divStyles: {
    paddingTop: 10,
  },
};

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <div style={styles.divStyles}>
      <BrowserRouter>
        <div>
          <Route path="/" component={PostsIndex} />
        </div>
      </BrowserRouter>
    </div>
  </Provider>, document.querySelector('.container'),
);
