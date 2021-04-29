const getIsAuthenticated = state => state.auth.isAuthenticated;

const getError = state => state.auth.error;

const getLoading = state => state.auth.loading;

const getUsername = state => state.auth.user.name;

const getAvatar = state => state.auth.user.avatarURL;

const selectors = {
  getIsAuthenticated,
  getUsername,
  getError,
  getLoading,
  getAvatar,
};

export default selectors;
