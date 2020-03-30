import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component{
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      ); 
    }
    return null;
  }

  renderInput = ({ input, label , meta }) => { 
    /* destructuring out the props */
    const className = `field ${meta.error && meta.touched ? "error" : " "}`;
    return (       
        <div className={className}>
          <label>{label}</label>
          <input {...input} autoComplete="off" /> {/* short hand for attaching redux form*/}
          {this.renderError(meta)}
        </div>
      )  
  }
  
  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  }

  render() {
    return( 
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error"> {/* handle submit is given the callback function to run upon sumbission */}
         {/* Field element only really adds the function to push inputs */}
          <Field name="title" component={this.renderInput} label="Enter Title" /> 
          <Field name="description"component={this.renderInput} label="Enter Description" />
          <button className="ui button primary"> Submit</button>
      </form>
    );  
  }
}

const validate = (formValues) => {
  const err = {};
  if (!formValues.title) {
    err.title = 'You must enter a title';
  }
  if (!formValues.description) {
    err.description = 'You must entera description';
  }

  return err;
}

export default reduxForm({
  form: 'Stream Form', //init the form in the redux store
  validate
})(StreamForm); // returns function w/ redux form
