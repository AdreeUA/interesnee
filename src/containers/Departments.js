import React, {PropTypes, Component} from 'react';
import DepartmentList from '../components/DepartmentList/DepartmentList'

class Departments extends Component {

    static contextTypes = {
        departmentsArray: PropTypes.array
    }

    render() {
        // console.log(this.context.departmentsArray)
        return (
            <div>
                <DepartmentList departments={this.context.departmentsArray}/>
            </div>
        );
    }
}

export default Departments;
