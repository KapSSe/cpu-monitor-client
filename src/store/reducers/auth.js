
const auth = (state = false, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        isLoggedIn: action.payload
      }
    case 'SET_SESSION':
      return {
        ...state,
        sid: action.payload
      }
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload
      }
    default:
      return state
  }
}

export default auth
