import { combineReducers } from 'redux'

import { authentication } from './authentication.reducer'
import { registration } from './registration.reducer'
import { registrationTask } from './registration.reducer.task'
import { users } from './users.reducer'
import { tasks } from './tasks.reducer'
import { alert } from './alert.reducer'

const rootReducer = combineReducers({
  authentication,
  registration,
  registrationTask,
  users,
  tasks,
  alert
})

export default rootReducer