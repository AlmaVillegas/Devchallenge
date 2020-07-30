import { taskConstants } from '../constants'

export function registrationTask(state = {}, action) {
  switch (action.type) {
    case taskConstants.REGISTER_REQUEST:
      return { registering: true }
    case taskConstants.REGISTER_SUCCESS:
      return {}
    case taskConstants.REGISTER_FAILURE:
      return {}
    default:
      return state
  }
}