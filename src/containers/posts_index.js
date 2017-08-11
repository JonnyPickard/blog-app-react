import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { fetchPosts } from '../actions';

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return (
      _.map(this.props.posts, post => (
        <li className="list-group-item" key={post._id}>
          <Link to={`/posts/${post._id}`}>
            {post.title}
          </Link>
        </li>
      ))
    );
  }

  render() {
    return (
      <div>
        <div>

          <div className="subtitle-wrapper">
            <div className="subtitle-block">
              {/* ListSubtitle */}
              <div>
                <h3 className="subtitle">Posts</h3>
              </div>

              {/* ButtonNewPost */}
              <div>
                <Link id="add-post-button" className="btn btn-primary" to="/posts/new">
                Add a Post
                </Link>
              </div>
            </div>
          </div>

          {/* PostList */}
          <ul className="posts-list list-group">
            {this.renderPosts()}
          </ul>
        </div>
      </div>
    );
  }
}

PostsIndex.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
