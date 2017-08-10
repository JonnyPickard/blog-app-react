import _ from 'lodash';

import FETCH_POSTS from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      // Convert the object to store custom state object with an id field
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
