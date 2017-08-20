import { expect } from 'chai';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import renderContainer from '../test_helper';
import { PostsIndex } from '../../src/containers';

const mock = new MockAdapter(axios);

describe('PostsIndex', () => {
  let wrapper;

  before(() => {
    // Mocking componentDidMount
    mock.onGet('http://localhost:3000/api/posts').reply(200,
      [
        { id: 1,
          title: 'Hi!',
          categories: 'Computer, Friends',
          content: 'Post about Friends',
        },
        {
          id: 2,
          title: 'New Post',
          categories: 'Candy',
          content: 'Post about Candy',
        },
      ],
    );
  });

  beforeEach(() => {
    wrapper = renderContainer(PostsIndex);
  });

  after(() => {
    mock.restore();
  });

  describe('shows components', () => {
    it('shows 1 .posts-index div', () => {
      expect(wrapper.find('.posts-index')).to.have.length(1);
      expect(wrapper.find('.posts-index').is('div')).to.equal(true);
    });

    it('shows 1 .subtitle-block div', () => {
      expect(wrapper.find('.subtitle-block')).to.have.length(1);
    });

    it('shows 1 .subtitle h3 component', () => {
      expect(wrapper.find('.subtitle')).to.have.length(1);
      expect(wrapper.find('.subtitle').parent().is('div')).to.equal(true);
      expect(wrapper.find('.subtitle').is('h3')).to.equal(true);
    });

    it('shows 1 #add-post-button Link', () => {
      expect(wrapper.find('#add-post-button')).to.have.length(1);
    });
  });
});
