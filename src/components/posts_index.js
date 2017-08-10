import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
  constructor(props) {
    super(props);
    // this.state = { posts: '' };
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return <div>Posts Index</div>;
  }
}

export default connect(null, { fetchPosts })(PostsIndex);
