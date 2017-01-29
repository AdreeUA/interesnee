import React from 'react';

import { Image } from 'react-bootstrap';

import './Employees.scss'

const Employees = (props) => {
    const { firstName, lastName, phoneNumber, avatarBase64, avatarUrl } = props.data;
    const changeAvatar = props.changeAvatar;

    return (
        <div className="employees">
            <div className="employees__inner">
                <input
                    className="employees__input"
                    type="file"
                    onChange={ (e) => changeAvatar(e) }
                />
                <div className="employees__avatar-wrap">
                    <Image
                        src={avatarBase64 || avatarUrl}
                        className="employees__avatar"
                        alt={`${firstName} ${lastName}`}
                    />
                </div>
            </div>

            <div className="employees__title">{`${firstName} ${lastName}`}</div>
            <div className="employees__phone">{phoneNumber}</div>
        </div>
    );
};

export default Employees;
