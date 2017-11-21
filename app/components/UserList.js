import React from 'react';
import { Table } from 'reactstrap';
import UserEntry from './UserEntry';
import FloatingActionButton from './FloatingActionButton';
import AlertModal from './AlertModal';
import axios from 'axios';
import { rowStyle } from '../styles/rowStyles.scss';
import { tableStyle } from '../styles/tableStyle.scss';
import _ from 'lodash';


class UserList extends React.Component {
    constructor(props) {
        super(props);

        this.onEditingChanged = this.onEditingChanged.bind(this);
        this.state = {
            users: [],
            editing: null,
            inserting: null,
            alertModalMessage: '',
            alertModalVisible: false,
            alertModalType: ''
        };
    }

    componentDidMount() {
        axios.get('http://localhost:7555/api/users')
        .then( (data) => {
            this.setState({users: data.data});
        });
    }

    onEditingChanged(state) {
        this.setState({
            editing: state
        });
    }

    deleteUser(idx) {
        delete this.state.users[idx];
        this.setState({ users: this.state.users });
    }

    addNewUser() {
        // make sure only one user can be added at a time.
        if(this.state.inserting === this.state.users.length - 1) return;

        const users = _.concat(this.state.users, {
            first_name: '',
            last_name: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            editing: true
        });
        this.setState({
            users: users,
            editing: this.state.users.length,
            inserting: this.state.users.length
        });
    }

    hideModal() {
        this.setState({
            alertModalVisible: false,
            alertModalMessage: '',
            alertModalType: ''
        });
    }

    showAlertModal(type, message) {
        this.setState({
            alertModalVisible: true,
            alertModalType: type,
            alertModalMessage: message
        });
    }

    render() {
        return (
            <div className={tableStyle} >
                <Table className="table-responsive">
                    <thead>
                        <tr className={ rowStyle }>
                            <th>Actions</th>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((obj, index) => {
                            return (
                                <UserEntry
                                id={obj.id}
                                firstName={obj.first_name}
                                lastName={obj.last_name}
                                address={obj.address}
                                city={obj.city}
                                state={obj.state}
                                zip={obj.zip}
                                key={index}
                                index={index}
                                editing={this.state.editing}
                                callbackParent={(newState) => this.onEditingChanged(newState)}
                                unmountMe={(idx) => this.deleteUser(idx)}
                                inserting={this.state.inserting}
                                showAlert={(type, message)=> this.showAlertModal(type, message)}/>
                            );
                        })}
                    </tbody>
                </Table>
                <FloatingActionButton clicked={()=> this.addNewUser()} />
                <AlertModal hideModal={()=>this.hideModal()} hide={this.state.alertModalVisible} message={this.state.alertModalMessage} type={this.state.alertModalType}/>
            </div>
        );
    }
}

export default UserList;
