import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import { PostsIndex, PostsNew, PostsShow } from './containers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const styles = {
  divStyles: {
    padding: 10,
  },
};

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <div style={styles.divStyles}>
      <BrowserRouter>
        <Switch>
          <Route path="/posts/new" component={PostsNew} />
          <Route path="/posts/:_id" component={PostsShow} />
          <Route path="/" component={PostsIndex} />
        </Switch>
      </BrowserRouter>
    </div>
  </Provider>, document.querySelector('.bundle'),
);
