import { taskConstants } from '../constants'

export function tasks(state = {}, action) {
  switch (action.type) {
    case taskConstants.GETALL_REQUEST:
      return {
        loading: true
      }
    case taskConstants.GETALL_SUCCESS:
      return {
        items: action.tasks
      }
    case taskConstants.GETALL_FAILURE:
      return { 
        error: action.error
      }
    case taskConstants.DELETE_REQUEST:
      return {
        ...state,
        items: state.items.map(task =>
            task.id === action.id
            ? { ...task, deleting: true }
            : task
        )
      }
    case taskConstants.DELETE_SUCCESS:
      return {
        items: state.items.filter(task => task.id !== action.id)
      }
    case taskConstants.DELETE_FAILURE:
      return {
        ...state,
        items: state.items.map(task => {
          if (task.id === action.id) {
            const { deleting, ...userCopy } = task
            return { ...userCopy, deleteError: action.error }
          }
          return task
        })
      }
    default:
      return state
  }
}