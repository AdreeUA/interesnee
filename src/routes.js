import React from 'react'
import { Router, browserHistory, Route, Redirect, IndexRoute } from 'react-router'
import Root from './containers/Root'
import DepartmentContainer from './containers/DepartmentContainer'
import Employees from './containers/EmployeesContainer'
import Departments from './containers/Departments'

export default (
    <Router history={browserHistory}>
        <Redirect from="/" to="/departments" />
        <Route path="/" component={Root}>
            <Route path="departments" component={Departments}>
                <IndexRoute component={Departments} />
            </Route>
            <Route path="departments/:id/employees" component={DepartmentContainer}/>
            <Route path="employees/:userId" component={Employees}/>
        </Route>
    </Router>
)