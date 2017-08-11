import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const CREATE_POST = 'create_post';
export const DELETE_POST = 'delete_post';

const ROOT_URL = 'https://jonnys-blog-app-react.herokuapp.com/api';

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts`);

  return {
    type: FETCH_POSTS,
    payload: request,
  };
}

export function fetchPost(_id) {
  const request = axios.get(`${ROOT_URL}/posts/${_id}`);

  return {
    type: FETCH_POST,
    payload: request,
  };
}

// Expected to be passed a history push callback to navigate back to index
export function createPost(values, callback) {
  const request = axios.post(`${ROOT_URL}/posts`, values)
    .then(callback);

  return {
    type: CREATE_POST,
    payload: request,
  };
}

// Expected to be passed a history push callback to navigate back to/ re render index
export function deletePost(_id, callback) {
  axios.delete(`${ROOT_URL}/posts/${_id}`)
    .then(callback);

  return {
    type: DELETE_POST,
    payload: _id,
  };
}
