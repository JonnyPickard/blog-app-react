import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import PostsIndex from './containers/posts_index';
import PostsNew from './containers/posts_new';

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
          <Switch>
            <Route path="/posts/new" component={PostsNew} />
            <Route path="/" component={PostsIndex} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  </Provider>, document.querySelector('.container'),
);
