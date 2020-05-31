export const login = user => ({
    type: 'LOGIN_USER',
    isAuthenticated: true,
    user,
  });
  
export const logout = () => ({
    type: 'LOGOUT_USER',
    user: null,
    isAuthenticated: false,
  });