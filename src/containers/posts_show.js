import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { fetchPost } from '../actions';

class PostsShow extends Component {
  componentDidMount() {
    const { _id } = this.props.match.params;
    this.props.fetchPost(_id);
  }

  render() {
    const { post, post: { title, categories, content } } = this.props;

    if (!post) return <div>Loading...</div>;

    return (
      <div>
        <div className="row" style={{ paddingBottom: 10 }}>

          {/* PostTitle */}
          <div className="col-xs-6 text-center">
            <h3 className="subtitle">{title}</h3>
          </div>

          {/* BackToPostsIndexButton */}
          <div className="col-xs-6 text-center">
            <Link className="btn btn-primary" to="/">
              Back to Posts
            </Link>
          </div>

        </div>

        <div>
          {/* PostDetail */}
          <h6>Categories: {categories}</h6>
          <hr />
          <div className="blog-post-content">
            <p>{content}</p>
          </div>
        </div>
      </div>
    );
  }
}

PostsShow.propTypes = {
  fetchPost: PropTypes.func.isRequired,
  _id: PropTypes.number,
  match: PropTypes.object.isRequired,
  params: PropTypes.object,
  post: PropTypes.shape({
    title: PropTypes.string,
    categories: PropTypes.string,
    content: PropTypes.string,
  }),
};

PostsShow.defaultProps = {
  post: {
    title: '',
    categories: '',
    content: '',
  },
  params: {},
  _id: 0,
};

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params._id] };
}
export default connect(mapStateToProps, { fetchPost })(PostsShow);
