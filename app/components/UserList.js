import React from 'react';
import { Table } from 'reactstrap';
import UserEntry from './UserEntry';
import FloatingActionButton from './FloatingActionButton';
import AlertModal from './AlertModal';
import ConfirmModal from './ConfirmModal';
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
            confirmModalVisible: false,
            currentPage: 1,
            firstIndex: 0,
            lastIndex: 4,
            currentUsers: [],
            deleting: null,
            deletingIndex: null
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

    setPages() {
        this.setState({
            pages: Math.ceil(this.state.users.length / 5)
        });
        _.defer(()=>{
            if(this.state.currentPage > this.state.pages) {
                this.setCurrentPage('last');
            }
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
        const usersIndex = this.state.currentPage * 5 - 5 + idx;
        this.state.users.splice(usersIndex, 1);
        this.setState({
            currentUsers: this.state.users.slice(this.state.firstIndex, this.state.lastIndex + 1),
            users: this.state.users,
        });
        _.defer(()=>{
            this.setPages();
        });
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
        if(this.state.inserting !== null) return;

        const users = _.concat(this.state.users, {
            first_name: '',
            last_name: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            editing: true,
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
        if(page === this.state.currentPage) return;

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
        this.state.firstIndex = page * 5 - 5;
        this.state.lastIndex = page * 5 - 1 <= this.state.users.length - 1 ?
            page * 5 - 1 :
            this.state.users.length - 1;

        this.setState({
            currentPage: page,
            currentUsers: this.state.users.slice(this.state.firstIndex, this.state.lastIndex + 1)
        });
    }

    confirmDelete() {
        axios.delete('http://localhost:7555/api/users/' + this.state.deleting)
        .then(() => {
            this.deleteUser(this.state.deletingIndex);
            this.hideConfirmModal();
        })
        .catch(err => {
            this.hideConfirmModal();
            this.showAlertModal('Error:', err.response.data);
        });
    }

    showConfirmModal(id, idx) {
        this.setState({
            confirmModalVisible: true,
            alertModalMessage: 'Are you sure you want to delete this user?',
            alertModalType: 'Warning:',
            deleting: id,
            deletingIndex: idx
        });
    }

    hideConfirmModal() {
        this.setState({
            confirmModalVisible: false,
            alertModalMessage: '',
            alertModalType: '',
            deleting: null,
            deletingIndex: null
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
                                deleteUnsavedEntry={() => this.deleteLastUser()}
                                deleteConfirm={(id, indx) => this.showConfirmModal(id, indx)}/>
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
                <ConfirmModal
                    hideModal={()=>this.hideConfirmModal()}
                    confirm={()=>this.confirmDelete()}
                    hide={this.state.confirmModalVisible}
                    message={this.state.alertModalMessage}
                    type={this.state.alertModalType}/>
            </div>
        );
    }
}

export default UserList;
