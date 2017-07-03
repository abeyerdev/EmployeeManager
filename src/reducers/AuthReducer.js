import { EMAIL_CHANGED, PASSWORD_CHANGED } from '../actions/types';

const INITIAL_STATE = { 
  email: '',
  password: '',
  loading: false,
  error: '',
  user: null
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    case EMAIL_CHANGED: 
      return {
        ...state,
        email: action.payload // this line will overwrite existing property if it exists 
      };
    case PASSWORD_CHANGED:
      return {
        ...state,
        password: action.payload
      };
    default:
      return state;
  }
};