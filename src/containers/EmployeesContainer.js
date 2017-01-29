import React, {PropTypes, Component} from 'react';
import Employees from '../components/Employees/Employees'
import { LOCALSTORAGE_PEOPES } from './Root';

class EmployeesContainer extends Component {

    static contextTypes = {
        router: PropTypes.object,
        peoples: PropTypes.array,
        updateData: PropTypes.func
    }

    state = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        loaded: false,
        id: '',
        avatarBase64: ''
    }

    componentDidMount() {
        const { router, peoples } = this.context;
        const idPeople = router.params.userId;

        const data = this.getPeopleId(peoples, idPeople);
        router.push(`/employees/${idPeople}`);
        this.updateState(data)
    }

    updateState (payload) {
        this.setState({
            ...payload,
            loaded: true
        })
    }

    updateAvatar (avatarBase64) {
        this.setState({ avatarBase64 });
        this.handlerUpdateData()
    }

    handlerUpdateData () {
        const { updateData } = this.context;
        const data = {
            id: this.state.id,
            avatarBase64: this.state.avatarBase64
        };

        updateData(LOCALSTORAGE_PEOPES, data)
    }

    changeAvatar = (e) => {
        const file = e.target.files[0];
        const reader  = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
        }

        reader.onloadend = () => this.updateAvatar(reader.result);
    }

    getPeopleId (peoples, id) {
        const currentPeople = peoples.filter( (people, index) => people.id == id );
        const { avatarUrl, avatarBase64, firstName, lastName, phoneNumber } = currentPeople[0];

        return {
            avatarUrl, avatarBase64, firstName, lastName, phoneNumber, id
        }
    }

    render() {
        const { loaded } = this.state;

        return (
            loaded
                ?
                <Employees changeAvatar={this.changeAvatar} data={this.state}/>
                :
                <h1> Загрузка...</h1>
        );
    }
}

export default EmployeesContainer;
