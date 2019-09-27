import auth from './auth'
import { combineReducers } from 'redux'
import cpuStats from'./cpuStats'

const rootReducer = combineReducers({
  auth,
  cpuStats
})

export default rootReducer