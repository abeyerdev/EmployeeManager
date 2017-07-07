import { EMPLOYEE_CREATE, EMPLOYEE_UPDATE } from '../actions/types';

const INITIAL_STATE = {
  name: '',
  phone: '',
  shift: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEE_CREATE:
      return INITIAL_STATE;
    case EMPLOYEE_UPDATE:
      // payload will look like { prop: 'name', value: 'Adam' }
      // [ action.payload.prop ] is NOT referring to an array -> its key interpolation from ES6
      // so in the above example it'll resolve to name: Adam.
      return { ...state, [action.payload.prop]: action.payload.value }; 
    default:
      return state;
  }
};