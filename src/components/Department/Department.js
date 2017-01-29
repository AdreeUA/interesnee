import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router';

import './Department.scss'

const Department = (params) => {

    const { peopleDepartment } = params;
    const { id, avatarBase64, avatarUrl, firstName, lastName } = peopleDepartment;

    return (
        <li
            key={id}
            className="department__item">

            <Link
                    className="department__link"
                    to={`employees/${id}`}>

                <span className="department__avatar-wrap">
                    <Image
                        src={avatarBase64 || avatarUrl}
                        className="department__avatar"
                        alt={`${firstName} ${lastName}`}
                    />
                </span>

                <span className="department__name">
                    {`${firstName} ${lastName}`}
                </span>
            </Link>
        </li>
    );
};

export default Department;


