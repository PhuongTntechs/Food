import { combineReducers } from 'redux';

import authorReducer from './Author';

const reducer = combineReducers({
  currentUser: authorReducer,
});
const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = {
          currentUser: null,
        };
    }

    return reducer(state, action);
};
export default rootReducer;
