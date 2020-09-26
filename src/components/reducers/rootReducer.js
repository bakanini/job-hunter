import authReducer from './authReducer';
import jobReducer from './jobReducer';

import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    job: jobReducer,
});

export default rootReducer;