import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../actions';

const styles = {
  alertStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBotton: 10,
  },
  cancelButtonStyle: {
    marginLeft: 5,
  },
};

class PostsNew extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    const { props } = this;

    props.createPost(values, () => {
      props.history.push('/');
    });
  }

  renderField({ input, label, meta: { touched, error }, textArea }) {
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    const textarea = (
      <textarea
        className="form-control"
        type="text"
        {...input}
      />);

    const inputfield = (
      <input
        className="form-control"
        type="text"
        {...input}
      />);

    const alert = (
      <div style={styles.alertStyle} className="alert alert-danger">
        {touched ? error : ''}
      </div>
    );

    return (
      <div className={className}>
        <label htmlFor={label}>{label}</label>
        <div>
          {textArea ? textarea : inputfield}
        </div>
        {touched && error ? alert : ''}
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h3 className="subtitle">New Post</h3>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            label="Title"
            name="title"
            component={this.renderField}
          />
          <Field
            label="Categories"
            name="categories"
            component={this.renderField}
          />
          <Field
            label="Post Content"
            name="content"
            component={this.renderField}
            textArea
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link style={styles.cancelButtonStyle} to="/" className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a title!';
  }

  if (!values.categories) {
    errors.categories = 'Enter some categories!';
  }

  if (!values.content) {
    errors.content = 'Enter some content!';
  }

  return errors;
}

PostsNew.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  validate,
  form: 'PostsNewForm',
})(connect(null, { createPost })(PostsNew));
