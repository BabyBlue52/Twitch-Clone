import { SIGN_IN, SIGN_OUT } from "../actions/types";

const INITIAL_STATE = {  //sets the state for the following funcition CAPS means do not change
    isSignedIn: null,
    userId: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, isSignedIn: true, userId: action.payload }
        case SIGN_OUT:
            return{ ...state, isSignedIn: false, userId: null }
        default:
            return state;
    }
};