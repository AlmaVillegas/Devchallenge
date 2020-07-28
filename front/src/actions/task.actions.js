import { taskConstants } from '../constants'
import { taskService } from '../services'
import { alertActions } from './'
import { history } from '../helpers'

export const taskActions = {
    create,
    getAll,
    delete: _delete
}


function create(task) {
    return dispatch => {
        dispatch(request(task))

        taskService.register(task)
            .then(
                task => { 
                    dispatch(success())
                    history.push('/')
                    dispatch(alertActions.success('Tarea registrada'))
                },
                error => {
                    dispatch(failure(error.toString()))
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request(task) { return { type: taskConstants.REGISTER_REQUEST, task } }
    function success(task) { return { type: taskConstants.REGISTER_SUCCESS, task } }
    function failure(error) { return { type: taskConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request())

        taskService.getAll()
            .then(
                task => dispatch(success(task)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: taskConstants.GETALL_REQUEST } }
    function success(task) { return { type: taskConstants.GETALL_SUCCESS, task } }
    function failure(error) { return { type: taskConstants.GETALL_FAILURE, error } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        taskService.delete(id)
            .then(
                task => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: taskConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: taskConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: taskConstants.DELETE_FAILURE, id, error } }
}