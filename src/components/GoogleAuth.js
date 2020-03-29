import React from "react";
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions'; 

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => { //window allows the scope of the code to the browetr window
            window.gapi.client.init({ //returns promise
                clientId: '922894550568-h3s3sr6j9u7l6bqhslvle2g71j74tipd.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance(); 

                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange)
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if ( isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else { 
            this.props.signOut();
        }
    };

    //Sign in method
    handleSignIn = () => {
        this.auth.signIn();
    };

    //Sign Out method
    handleSignOut = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.handleSignOut} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            )
        } else  {
            return (
                <button onClick={this.handleSignIn} className="ui red google button">
                    <i className="google icon" />
                    Sign In with Google
                </button>
            )
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId } // authentication status 
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);