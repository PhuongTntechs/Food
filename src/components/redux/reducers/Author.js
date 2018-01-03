'user trict';

const currentUser = null;

const authorReducer = (state = currentUser, action) => {
  if (action.type === 'LOGIN') return action.user;
  if (action.type === 'LOGOUT') return null;
  return state;
};
export default authorReducer;
