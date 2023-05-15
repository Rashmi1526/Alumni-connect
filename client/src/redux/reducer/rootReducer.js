import { combineReducers } from 'redux';
import facultyReducer from './facultyReducer'
import adminReducer from './adminReducer'
import studentReducer from './studentReducer'
import errorReducerHelper from './errorReducerHelper'
import errorReducer from './errorReducer'
import alumniReducer from './alumniReducer';


export default combineReducers({
    faculty: facultyReducer,
    admin: adminReducer,
    alumni: alumniReducer,
    student: studentReducer,
    error: errorReducer,
    errorHelper: errorReducerHelper
});