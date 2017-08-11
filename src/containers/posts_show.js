import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
        <div>
          <h3 className="subtitle">{title}</h3>
          <h6>Categories: {categories}</h6>
          <p>{content}</p>
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
