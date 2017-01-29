import React, {PropTypes, Component} from 'react';
import { Link } from 'react-router';

export const LOCALSTORAGE_PEOPES = 'payloadPeoples';
export const LOCALSTORAGE_DEPARTMENT = 'payloadDepartments';

import logo from '../logo.svg';

class Root extends Component {

    state = {
        loaded: false,
        departments: [],
        peoples: []
    }

    static childContextTypes = {
        departmentsArray: PropTypes.array,
        peoples: PropTypes.array,
        updateData: PropTypes.func
    }

    getChildContext() {
        return {
            departmentsArray: this.state.departments,
            peoples: this.state.peoples,
            updateData: this.updateData
        }
    }

    localStorageData () {
        const departments  = JSON.parse(localStorage.getItem(LOCALSTORAGE_DEPARTMENT));
        const peoples  = JSON.parse(localStorage.getItem(LOCALSTORAGE_PEOPES));

        if (departments && peoples) {

            return {
                departments,
                peoples
            }
        }
    }

    componentWillMount () {
        const payload = this.localStorageData();

        this.setState({
            ...payload,
            loaded: true
        });

        if ( payload ) return;

        this.fetchData();

    }

    fetchData () {
        console.log('fetchData')
        fetch('http://localhost:4000/api')
            .then(response => response.json())
            .then(data => {
                const { peoples, departments } = data;

                this.setState({
                    loaded: true,
                    departments,
                    peoples
                });

                this.convertImages(peoples);

                localStorage.setItem(LOCALSTORAGE_DEPARTMENT, JSON.stringify(departments));

            })
            .catch(e => e);
    }

    convertImages (peoples) {
        const peoplesUpdate = peoples.map((item) => {
            const obj = {
                ...item
            };
            const image = new Image();
            image.setAttribute('crossOrigin', 'anonymous');
            image.src = item.avatarUrl;

            image.onload = function () {
                const canvas = document.createElement('canvas');
                canvas.width = this.naturalWidth;
                canvas.height = this.naturalHeight;

                canvas.getContext('2d').drawImage(this, 0, 0);

                obj.avatarBase64 = canvas.toDataURL();
            };

            return obj
        });

        this.setState({
            peoples: peoplesUpdate
        });

        setTimeout( () => { localStorage.setItem(LOCALSTORAGE_PEOPES, JSON.stringify(peoplesUpdate)) }, 2000);

    }

    updateData = (key, data) => {
        const { id, avatarBase64 } = data;
        const { peoples } = this.state;

        const updatePeople = peoples.map((item) => {
            if (item.id == id) {
                return {...item, avatarBase64 }
            } else {
                return item
            }
        });

        this.setState({ peoples: updatePeople });
        localStorage.setItem(LOCALSTORAGE_PEOPES, JSON.stringify(updatePeople));
    }

    render() {

        return (
            <div className="page__wrapper">

                <div className="header">
                    <Link className="header__logo"  to="/"><img src={logo} alt="React"/></Link>
                    <h1 className="header__title">React App</h1>
                </div>

                <div className="page__content">
                    { !this.state.loaded
                        ?
                        <h1 className="preloader">Загрузка ...</h1>
                        :
                        this.props.children
                    }
                </div>
                <div className="footer">
                    <div className="footer__text">Copyright © КОПИРАЙТ, 2017</div>
                </div>

            </div>
        );
    }
}

export default Root;

