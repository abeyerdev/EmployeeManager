// ActionCreator file

import { EMAIL_CHANGED, PASSWORD_CHANGED } from './types';
import * as firebase from 'firebase';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

// Because of ReduxThunk, we can return functions from our ActionCreators 
// in addition to objects with a type property. Dispatch allows us to manually send an action
// when we want ie. after an async operation has finished.
export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
          dispatch({
            type: 'login_user_success',
            payload: user
          });
        });
  }; 
};