import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  componentDidMount() {
    const { _id } = this.props.match.params;
    this.props.fetchPost(_id);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onDeleteClick() {
    const { props } = this;
    const { _id } = props.match.params;

    props.deletePost(_id, () => {
      props.history.push('/');
    });
  }

  render() {
    const { post, post: { title, categories, content } } = this.props;

    console.log('post', post);
    if (!post) return <div>Loading...</div>;

    return (
      <div>
        <div className="subtitle-block">

          <div className="left-aligned">
            {/* PostTitle */}
            <div>
              <h3 className="subtitle">{title}</h3>
            </div>

            {/* FlexBoxSpacing */}
            <div style={{ padding: 5 }} />

            {/* PostDetail */}
            <div>
              <h6>Categories: {categories}</h6>
            </div>
          </div>

          {/* BackToPostsIndexButton */}
          <div className="right-aligned">
            <div>
              <Link className="btn btn-primary" to="/">
              Back to Posts
              </Link>
            </div>

            {/* FlexBoxSpacing */}
            <div style={{ padding: 5 }} />

            {/* DeletePostButton */}
            <div>
              <button
                className="btn btn-danger pull-xs-right"
                onClick={this.onDeleteClick}
              >
                Delete Post
              </button>
            </div>

          </div>
        </div>

        <div>
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
export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
