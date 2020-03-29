import React from 'react';
import  { connect } from 'react-redux';
import _ from 'lodash';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues);
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return(
        <div>
          <h3>Edit a Stream </h3>
          <StreamForm  /* passing initial values to default into Redux Form */
            initialValues={_.pick(this.props.stream, 'title', 'description')} //specify which data point you need from full object
            onSubmit={this.onSubmit} />
        </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.stream[ownProps.match.params.id] } 
  // whenever instructor references streams from redux store
  // use stream (without 'S')
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);