import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';
import { GET_EMPLOYEES_SUCCESS, EMPLOYEE_CREATE, EMPLOYEE_SAVE_SUCCESS, EMPLOYEE_UPDATE } from './types';

export const employeeCreate = ({ name, phone, shift }) => {
  const { currentUser } = firebase.auth();
  
  // satisfies requirements of ReduxThunk by making this return an async function
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, phone, shift })
      .then(() => { 
        dispatch({ type: EMPLOYEE_CREATE });
        Actions.employees({ type: 'reset' }); // go to employee scene, but reset view stack (back/forward navigation)
      }); 
  };  
};

export const employeeSave = ({ name, phone, shift, uid }) => {
  const { currentUser } = firebase.auth();

  // return a function since this is async - don't have anything to return right away
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set({ name, phone, shift })
      .then(() => {
        dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
        Actions.employees({ type: 'reset' });
      });
  };
};

export const employeeUpdate = ({ prop, value }) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: { prop, value }
  };
};

export const getEmployees = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    // This will watch for updates to values in our reference for the life of our app
    // and dispatch an action each time a new snapshot is received.
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {
        dispatch({ type: GET_EMPLOYEES_SUCCESS, payload: snapshot.val() });
      });  
  };
};