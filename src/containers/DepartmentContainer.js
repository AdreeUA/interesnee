import React, {PropTypes, Component} from 'react';
import Department from '../components/Department/Department'

import { Badge, Grid } from 'react-bootstrap';

class DepartmentContainer extends Component {

    static contextTypes = {
        departmentsArray: PropTypes.array,
        peoples: PropTypes.array,
        avatars: PropTypes.array
    }

    render() {
        const { peoples } = this.context;

        const departmentId = +this.props.params.id;
        const peopleDepartment = peoples.filter( (people) => people.idDepartment === departmentId);
        const template = peopleDepartment.map((item) => {

            return <Department peopleDepartment={ item } key={item.id}/>
        });

        return (
            <div className="department">
                <Grid>
                    <h3 className="department__title">Cотрудников в отделе: <Badge>{peopleDepartment.length}</Badge></h3>

                    <ul className="department__list">
                        {template}
                    </ul>

                </Grid>
            </div>
        );
    }
}

export default DepartmentContainer;
