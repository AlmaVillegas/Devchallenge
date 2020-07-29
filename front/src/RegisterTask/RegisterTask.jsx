import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { taskActions } from '../actions'

function RegisterTask() {
    const [task, setTask] = useState({
        name: '',
        description: '',
        time: '',
        status: ''
    })
    const [submitted, setSubmitted] = useState(false)
    const registering = useSelector(state => state.registration.registering)
    const dispatch = useDispatch()


    function handleChange(e) {
        const { name, value } = e.target
        console.log('Hola en handleChange')
        setTask(task => ({ ...task, [name]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault()

        setSubmitted(true)
        if (task.name && task.description && task.time && task.status) {
            dispatch(taskActions.create(task))
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Insertar tareas</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre</label>
                    <input type="text" name="name" value={task.name} onChange={handleChange} className={'form-control' + (submitted && !task.name ? ' is-invalid' : '')} />
                    {submitted && !task.name &&
                        <div className="invalid-feedback">Es requerido</div>
                    }
                </div>
                <div className="form-group">
                    <label>Descripción</label>
                    <input type="text" name="description" value={task.description} onChange={handleChange} className={'form-control' + (submitted && !task.description ? ' is-invalid' : '')} />
                    {submitted && !task.description &&
                        <div className="invalid-feedback">Es requerido</div>
                    }
                </div>
                <div className="form-group">
                    <label>Tiempo p/realizar tarea</label>
                    <input type="text" name="time" value={task.time} onChange={handleChange} className={'form-control' + (submitted && !task.time ? ' is-invalid' : '')} />
                    {submitted && !task.time &&
                        <div className="invalid-feedback">Es requerido</div>
                    }
                </div>
                <div className="form-group">
                    <label>Estatus</label>
                    <input type="text" name="status" value={task.status} onChange={handleChange} className={'form-control' + (submitted && !task.status ? ' is-invalid' : '')} />
                    {submitted && !task.status &&
                        <div className="invalid-feedback">Es requerido</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Guardar
                    </button>
                    <Link to="/" className="btn btn-link">Cancel</Link>
                </div>
            </form>
        </div>
    )
}

export { RegisterTask }