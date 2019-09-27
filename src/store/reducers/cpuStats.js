const cpuStats = (state = false, action) => {
  switch (action.type) {
    case 'SET_CURRENT':
      return {
        ...state,
        current: action.payload
      }
    case 'SET_SEC':
      return {
        ...state,
        seconds: action.payload
      }
    case 'SET_MIN':
      return {
        ...state,
        minutes: action.payload
      }
    case 'SET_HOUR':
      return {
        ...state,
        hours: action.payload
      }
    default:
      return state
  }
}

export default cpuStats
