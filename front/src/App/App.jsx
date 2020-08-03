import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { history } from '../helpers'
import { alertActions } from '../actions'
import { PrivateRoute } from '../components'
import { HomePage } from '../HomePage'
import { LoginPage } from '../LoginPage'
import { RegisterPage } from '../RegisterPage'
import { RegisterTask } from '../RegisterTask'
import { TaskPage } from '../TaskPage'

class App extends React.Component {
    constructor(props) {
        super(props)

        history.listen((location, action) => {
            this.props.clearAlerts()
        }) 
    }

    render() {
        const { alert } = this.props 
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <Switch>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Route path="/create" component={RegisterTask} />
                                <Route path="/list" component={TaskPage}/>
                                <Redirect from="*" to="/" />
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        )
    }
}

function mapState(state) {
    const { alert } = state
    return { alert }
}

const actionCreators = {
    clearAlerts: alertActions.clear
} 

const connectedApp = connect(mapState, actionCreators)(App)
export { connectedApp as App }