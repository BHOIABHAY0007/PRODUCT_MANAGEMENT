import axios from 'axios';

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: 'LOGIN_REQUEST' });
    const response = await axios.get('http://localhost:3002/users');
    const user = response.data.find(u => u.username === username && u.password === password);
    
    if (user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid credentials' });
    }
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('user');
  dispatch({ type: 'LOGOUT' });
};

export const checkAuth = () => (dispatch) => {
  const user = localStorage.getItem('user');
  if (user) {
    dispatch({ type: 'LOGIN_SUCCESS', payload: JSON.parse(user) });
  }
};
