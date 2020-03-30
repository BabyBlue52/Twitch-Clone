import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  // Display edit & delete button on owned streams
  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return(
        <div className="right floated content"> 
          <Link 
          to={`/streams/edit/${stream.id}`} 
          className="ui button primary">
            Edit
          </Link>
          <Link 
          to={`/streams/delete/${stream.id}`}
          className="ui button negative">
            Delete
          </Link> 
        </div>
      )
    }
  }

  //Displays Button to create new stream
  renderCreate(){
    if (this.props.isSignedIn) {
      return(
        <div style={{ textAlign: 'right' }}>
          <Link to='/streams/new' className="ui button primary">
            Create Streams
          </Link>
        </div>
      )
    }
  }

  // Display List of streams
  renderList() {
    return this.props.streams.map( stream => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
            <div className="content">
              <Link to={`/streams/${stream.id}`} className="header">
              {stream.title}
              </Link>
            <div className="description">{stream.description}</div>  
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <h2> Streams</h2>
          <div className="ui celled list">{this.renderList()}</div>
          {this.renderCreate()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    streams: Object.values(state.stream),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(
  mapStateToProps,
  { fetchStreams }
  )(StreamList);