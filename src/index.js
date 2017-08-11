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
    paddingTop: 10,
  },
  headingStyle: {
    paddingBottom: 10,
  },
};

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <div style={styles.divStyles}>
      <h1 style={styles.headingStyle}>Bloggit</h1>
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/posts/new" component={PostsNew} />
            <Route path="/posts/:_id" component={PostsShow} />
            <Route path="/" component={PostsIndex} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  </Provider>, document.querySelector('.container'),
);
