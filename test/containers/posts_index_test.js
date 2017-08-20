import { expect } from 'chai';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import _ from 'lodash';

import renderContainer from '../test_helper';
import { PostsIndex } from '../../src/containers';

const mock = new MockAdapter(axios);
const mockPosts = [
  { _id: 1,
    title: 'Hi!',
    categories: 'Computer, Friends',
    content: 'Post about Friends',
  },
  {
    _id: 2,
    title: 'New Post',
    categories: 'Candy',
    content: 'Post about Candy',
  },
];
const mockPostsStateObject = _.mapKeys(mockPosts, '_id');

describe('PostsIndex', () => {
  let wrapper;

  describe('shows elements', () => {
    beforeEach(() => {
      mock.onGet('http://localhost:3000/api/posts').reply(200, mockPosts);
      wrapper = renderContainer(PostsIndex, null, { posts: mockPostsStateObject });
    });

    afterEach(() => {
      mock.reset();
    });

    it('shows 1 .posts-index div', () => {
      expect(wrapper.find('.posts-index')).to.have.length(1);
      expect(wrapper.find('.posts-index').is('div')).to.equal(true);
    });

    it('shows 1 .subtitle-block div', () => {
      expect(wrapper.find('.subtitle-block')).to.have.length(1);
    });

    it('shows 1 .subtitle h3 element', () => {
      expect(wrapper.find('.subtitle')).to.have.length(1);
      expect(wrapper.find('.subtitle').parent().is('div')).to.equal(true);
      expect(wrapper.find('.subtitle').is('h3')).to.equal(true);
    });

    it('shows 1 #add-post-button Link', () => {
      expect(wrapper.find('#add-post-button')).to.have.length(1);
    });
  });

  describe('renders the posts list UL correctly', () => {
    before(() => {
      PostsIndex.prototype.componentDidMount = () => {
        // componentDidMount is called
        expect(true).to.equal(true);
      };

      mock.onGet('http://localhost:3000/api/posts').reply(200, mockPosts);
      wrapper = renderContainer(PostsIndex, null, { posts: mockPostsStateObject });
    });

    it('shows 1 LI per retrieved post', () => {
      expect(wrapper.find('.posts-list-item')).to.have.length(2);
      expect(wrapper.find('.posts-list-item').first().is('li')).to.equal(true);
      expect(wrapper.find('.posts-list-item').first().text()).to.equal('Hi!Delete Post');
    });
  });
});
