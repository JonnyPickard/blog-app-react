import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
  renderTextInputField({ input, label }) {
    return (
      <div className="form-group">
        <label htmlFor={label}>{label}</label>
        <input
          className="form-control"
          type="text"
          {...input}
        />
      </div>
    );
  }

  renderTextAreaField({ input, label }) {
    return (
      <div className="form-group">
        <label htmlFor={label}>{label}</label>
        <textarea
          className="form-control"
          type="text"
          {...input}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <h3 style={{ paddingBottom: 10 }}>New Post</h3>
        <form>
          <Field
            label="Title"
            name="title"
            component={this.renderTextInputField}
          />
          <Field
            label="Categories"
            name="categories"
            component={this.renderTextInputField}
          />
          <Field
            label="Post Content"
            name="content"
            component={this.renderTextAreaField}
          />
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
    errors.title = 'Enter some categories!';
  }

  if (!values.content) {
    errors.title = 'Enter some content!';
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm',
})(PostsNew);
