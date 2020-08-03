import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { taskActions } from '../actions'

class TaskPage extends React.Component {
    componentDidMount() {
        this.props.getTasks()
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteTask(id)
    }

    render() {
        const { task, tasks } = this.props
        return (
            <div className="col-md-offset-3">
                <h1>Hi {task.name}!</h1>
                <p>You're logged in with React!!</p>
                <h3>All registered users:</h3>
                {tasks.loading && <em>Loading users...</em>}
                {tasks.error && <span className="text-danger">ERROR: {tasks.error}</span>}
                {tasks.items &&
                    <ul>
                        {tasks.items.map((task, index) =>
                            <li key={task.id}>
                                {task.name}
                                {
                                    task.deleting ? <em> - Deleting...</em>
                                    : task.deleteError ? <span className="text-danger"> - ERROR: {task.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(task.id)}>Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
                }
                <p>
                  <Link to="/create">Crear Tarea</Link>
                </p>
            </div>
        ) 
    }
}

function mapState(state) {
    const { tasks, authentication } = state
    const { task } = authentication
    return { task, tasks }
}

const actionCreators = {
    getTasks: taskActions.getAll,
    deleteTask: taskActions.delete
}

const connectedTaskPage = connect(mapState, actionCreators)(TaskPage)
export { connectedTaskPage as TaskPage }
