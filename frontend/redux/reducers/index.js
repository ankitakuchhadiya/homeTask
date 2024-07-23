import { combineReducers } from 'redux';
import authReducer from './authReducer';
import photoReducer from './photoReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    photos: photoReducer,
});

export default rootReducer;
