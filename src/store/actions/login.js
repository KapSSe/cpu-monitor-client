export const logIn = (isLoggedIn) => ({
  type: 'LOG_IN',
  payload: isLoggedIn
})

export const setSession = (sid) => ({
  type:'SET_SESSION',
  payload: sid
})

export const setToken = (token) => ({
  type:'SET_TOKEN',
  payload: token
})