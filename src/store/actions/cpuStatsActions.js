export const setCurrent = (current) => ({
  type: 'SET_CURRENT',
  payload: current
})

export const setSeconds = (seconds) => ({
  type: 'SET_SEC',
  payload: seconds
})

export const setMinutes = (minutes) => ({
  type: 'SET_MIN',
  payload: minutes
})

export const setHours = (hours) => ({
  type: 'LOG_HOUR',
  payload: hours
})