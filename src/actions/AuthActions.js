import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
  EMAIL_CHANGED,
  PASSWORD_CHANGED, 
  LOGIN_USER, 
  LOGIN_USER_SUCCESS, 
  LOGIN_USER_FAIL 
} from './types';

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
    dispatch({ type: LOGIN_USER }); // login started

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => {
        console.log(error); // helpful to troubleshoot firebase issues
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user))
          .catch(() => loginUserFail(dispatch));
      });
  }; 
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  // navigate to employee list component in main bucket
  Actions.main();
};