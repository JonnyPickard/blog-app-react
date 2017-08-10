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
          {post.title}
        </li>
      ))
    );
  }

  render() {
    return (
      <div>
        <div>

          <div className="row" style={{ paddingBottom: 10 }}>

            {/* ListSubtitle */}
            <div className="col-md-6 text-center">
              <h3>Posts</h3>
            </div>

            {/* ButtonNewPost */}
            <div className="col-md-6 text-center">
              <Link style={{ float: 'right' }} className="pull-right btn btn-primary" to="/posts/new">
                  Add a Post
              </Link>
            </div>

          </div>

          {/* PostList */}
          <ul className="list-group">
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
