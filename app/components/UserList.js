import React from 'react';
import { Table } from 'reactstrap';
import UserEntry from './UserEntry';
import FloatingActionButton from './FloatingActionButton';
import AlertModal from './AlertModal';
import axios from 'axios';
import { rowStyle } from '../styles/rowStyles.scss';
import { tableStyle } from '../styles/tableStyle.scss';
import BootstrapPagination from './Pagination';
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
            alertModalType: '',
            currentPage: 1,
            firstIndex: 0,
            lastIndex: 4,
            currentUsers: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:7555/api/users')
        .then( (data) => {
            this.setState({
                users: data.data,
                pages: Math.ceil(data.data.length / 5),
                currentUsers: [data.data[0], data.data[1], data.data[2], data.data[3], data.data[4]]
            });
        });
    }

    onEditingChanged(state) {
        if(state === null && this.state.inserting !== null) {
            this.setState({
                inserting: null,
                currentUsers: this.state.currentUsers.slice(0, this.state.currentUsers.length - 1)
            });
        }
        this.setState({
            editing: state
        });
    }

    deleteUser(idx) {
        delete this.state.users[idx];
        this.setState({ users: this.state.users });
    }

    deleteLastUser() {
        const users = _.cloneDeep(this.state.users);
        delete users[users.length--];
        this.setState({
            users: users
        });
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
        });
        _.defer(()=>{
            this.setCurrentPage(Math.ceil(this.state.users.length / 5));
            this.setState({
                editing: this.state.currentUsers.length - 1,
                inserting: this.state.currentUsers.length - 1
            });
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

    resetInserting() {
        this.setState({
            inserting: null
        });
    }

    setCurrentPage(page) {
        const lastPage = Math.ceil(this.state.users.length / 5);

        if(this.state.currentPage === lastPage && this.state.inserting !== null) {
            this.setState({
                inserting: null,
                editing: null,
                users: this.state.users.slice(0, this.state.users.length - 1)
            });
        }

        if(page === 'last') {
            if(this.state.currentPage === 1) {
                return;
            }
            page = this.state.currentPage - 1;
        }
        if(page === 'next') {
            if(this.state.currentPage === lastPage) {
                return;
            }
            page = this.state.currentPage + 1;
        }
        const firstIndex = page * 5 - 5;
        const lastIndex = page * 5 - 1 <= this.state.users.length - 1 ?
            page * 5 - 1 :
            this.state.users.length - 1;

        this.setState({
            currentPage: page,
            currentUsers: this.state.users.slice(firstIndex, lastIndex + 1)
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
                        {this.state.currentUsers.map((obj, index) => {
                            return (
                                <UserEntry
                                id={obj.id}
                                firstName={obj.first_name}
                                lastName={obj.last_name}
                                address={obj.address}
                                city={obj.city}
                                state={obj.state}
                                zip={obj.zip}
                                key={obj.id || -1}
                                index={index}
                                editing={this.state.editing}
                                callbackParent={(newState) => this.onEditingChanged(newState)}
                                unmountMe={(idx) => this.deleteUser(idx)}
                                inserting={this.state.inserting}
                                showAlert={(type, message)=> this.showAlertModal(type, message)}
                                resetInserting={()=> this.resetInserting()}
                                deleteUnsavedEntry={() => this.deleteLastUser()}/>
                            );
                        })}
                    </tbody>
                </Table>
                <BootstrapPagination
                    pages={this.state.pages}
                    setCurrentPage={(page)=>this.setCurrentPage(page)}/>
                <FloatingActionButton
                    clicked={()=> this.addNewUser()}/>
                <AlertModal
                    hideModal={()=>this.hideModal()}
                    hide={this.state.alertModalVisible}
                    message={this.state.alertModalMessage}
                    type={this.state.alertModalType}/>
            </div>
        );
    }
}

export default UserList;
