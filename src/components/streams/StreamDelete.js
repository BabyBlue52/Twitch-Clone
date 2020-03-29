import React from 'react';
import Modal from '../Modal';
import history from '../../history';

const StreamDelete = () => {
  const actions = ( //React Fragments w/ JSX
    <>
      <button className="ui button negative">Delete</button>
      <button className="ui button">Cancel</button>
    </>
  )
  return(
    <div>
      Streams Delete 
      <Modal
        title="Delete Stream"
        content="Are you sure you want to delete this stream?"
        actions= {actions}
        onDismiss={() => history.push('/')}
      />
    </div>
  ) 
};

export default StreamDelete;