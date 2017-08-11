import _ from 'lodash';

import { FETCH_POSTS, FETCH_POST } from '../actions';

export default function (state = {}, { payload, type }) {
  switch (type) {
    case FETCH_POST:
      return { ...state, [payload.data._id]: payload.data };
    case FETCH_POSTS:
      return _.mapKeys(payload.data, '_id');
    default:
      return state;
  }
}
