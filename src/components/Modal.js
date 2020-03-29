import React from 'react';
import ReactDOM from 'react-dom';

function handleChildClick(e) {
    e.stopPropagation();
}

const Modal = props => {
    return ReactDOM.createPortal (
        <div
        onClick= {props.onDismiss}
        className= "ui dimmer modals visible active"
        >
            <div 
            onClick={ handleChildClick.bind(this)} 
            className= "ui standeard modal visible active">
                <div className=" header">{props.title}</div>
                <div className="content">{props.content}</div>
                <div className="actions">{props.actions}</div>
            </div>
        </div>,
        document.querySelector('#modal')
    );
};

export default Modal;