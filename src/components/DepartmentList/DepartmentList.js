import React, { Component} from 'react';
import { Link } from 'react-router';
import { ListGroup, Grid, Row } from 'react-bootstrap';

import './DepartmentList.scss';

class DepartmentList extends Component {

    render() {

        const { departments } = this.props;

        const departmentList = departments.map( (item) => (
            <li
                key={item.idDepartment}
                className="departments__item">
                <Link
                    to={`/departments/${item.idDepartment}/employees`}
                    className="departments__link">

                    {item.department}
                </Link>
            </li>
            )
        );

        return (
            <Grid>
                <Row>
                    <div className="departments">
                        <h2 className="departments__title">Список отделов организации</h2>
                        <ListGroup componentClass="ul">
                            { departmentList }
                        </ListGroup>
                    </div>
                </Row>
            </Grid>
        );
    }
}

export default DepartmentList;
