import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'fetch_posts';

const ROOT_URL = 'https://jonnys-blog-app-react.herokuapp.com/api';

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts`);

  return {
    type: FETCH_POSTS,
    payload: request,
  };
}

export function createPost(values, callback) {
  const request = axios.post(`${ROOT_URL}/posts`, values)
    .then(callback);

  return {
    type: CREATE_POST,
    payload: request,
  };
}
