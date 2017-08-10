import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

const styles = {
  alertStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBotton: 10,
  },
};

class PostsNew extends Component {
  renderField({ input, label, meta, textArea }) {
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

    return (
      <div className="form-group">
        <label htmlFor={label}>{label}</label>
        <div>
          { textArea ? textarea : inputfield }
        </div>
        <div style={styles.alertStyle} className="alert alert-danger">
          {meta.error}
        </div>
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
        </form>
        <button type="submit" className="btn btn-primary">Submit</button>
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

export default reduxForm({
  validate,
  form: 'PostsNewForm',
})(PostsNew);
