import { SET_ALUMNI } from '../actionTypes';
import isEmpty from '../validation/is-empty';



const initialState = {
  isAuthenticated: false,
  alumni: {},
  flag: false
};

const alumniReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALUMNI:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        alumni: action.payload,
      };
    default:
      return state;
  }
};

export default alumniReducer;
