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
import { FilterList } from 'material-ui-icons';
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
            deletingIndex: null,
            pages: null,
            currentOrder: null,
            currentSort: null,
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
                this.pagination.setPagination(Math.ceil(this.state.users.length / 5));
            }
        });
    }

    onEditingChanged(state) {
        if(state === null && this.state.inserting !== null) {
            this.setState({
                inserting: null,
                currentUsers: this.state.currentUsers.slice(0, this.state.currentUsers.length - 1)
            });
            _.defer(()=>{
                this.setPages();
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
        this.state.users.pop();
        this.setState({
            users: this.state.users
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
            this.setState({
                editing: this.state.currentUsers.length - 1,
                inserting: this.state.currentUsers.length - 1
            });
            if(Math.ceil(this.state.users.length / 5) > this.state.pages) this.setState({pages: this.state.pages + 1});
            this.setCurrentPage(Math.ceil(this.state.users.length / 5));
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

    addNewEntry(user) {
        this.state.users.pop();
        this.state.users.push(user);
        this.setState({
            users: this.state.users
        });
        this.setCurrentUsers(this.state.pages);
    }

    setCurrentPage(page) {
        const finalPage = Math.ceil(this.state.users.length / 5);
        // set page if clicked on last or next button
        if(page === 'last') {
            if(this.state.currentPage === 1) {
                return;
            }
            page = this.state.currentPage - 1;
        }
        if(page === 'next') {
            if(this.state.currentPage === finalPage) {
                return;
            }
            page = this.state.currentPage + 1;
        }
        // if editing
        if(this.state.editing !== null) {
            // if inserting
            if(this.state.inserting !== null) {
                // if we are not on the final page already
                if(this.state.currentPage !== finalPage) {
                    // if we are not going to last page for inserting new user
                    if(page !== finalPage) {
                        // reset inserting && editing
                        this.setState({
                            inserting: null,
                            editing: null
                        });
                        // if last page no longer has users then remove last page
                    }

                    // then change the page
                    this.setState({
                        currentPage: page
                    });

                    this.pagination.setPagination(page);

                    this.setCurrentUsers(page);
                    this.setState({
                        editing: this.state.currentUsers.length - 1,
                        inserting: this.state.currentUsers.length - 1
                    });
                }
                if(page !== finalPage) {
                    // reset inserting && editing
                    this.setState({
                        inserting: null,
                        editing: null
                    });
                    if(this.state.currentUsers.length === 1) {
                        this.setState({
                            pages: this.state.pages - 1
                        });
                        this.pagination.setPagination(this.state.pages - 1);
                    }
                    this.setState({
                        currentPage: page
                    });

                    this.setCurrentUsers(page);
                    this.deleteLastUser();
                }
                if(this.state.currentPage === finalPage && page === finalPage) {
                    this.setCurrentUsers(page);
                    this.setState({
                        editing: this.state.currentUsers.length - 1,
                        inserting: this.state.currentUsers.length - 1
                    });
                }
                // user has already been added, currentUsers must be reset

            // else we are editing but not inserting
            } else {
                // if already on page then do nothing
                if(this.state.currentPage === page) return;
                // if changing page
                if(page !== this.state.currentPage) {
                    // unset editing and set page
                    this.setState({
                        currentPage: page,
                        editing: null,
                    });

                    this.setCurrentUsers(page);
                }
            }
        }

        if(this.state.currentPage !== page) {
            this.setState({
                currentPage: page
            });
            this.setCurrentUsers(page);
        }
        // if(this.state.currentPage === finalPage && this.state.inserting !== null) {
        //     this.setState({
        //         inserting: null,
        //         editing: null,
        //         users: this.state.users.slice(0, this.state.users.length - 1)
        //     });
        // }
    }

    setCurrentUsers(page) {
        this.state.firstIndex = page * 5 - 5;
        this.state.lastIndex = page * 5 - 1 <= this.state.users.length - 1 ?
            page * 5 - 1 :
            this.state.users.length - 1;

        this.setState({
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

    sort(property) {
        if(this.state.currentSort !== null && this.state.currentSort !== property) {
            this.state.currentOrder = null;
            this.setState({
                currentOrder: this.state.currentOrder
            });
        }
        this.state.currentSort = property;
        const order = this.state.currentOrder === null ? 'asc'
        :
        this.state.currentOrder === 'asc' ? 'desc'
        : 'asc';
        this.state.users = _.orderBy(this.state.users, property, order);
        this.setState({
            users: this.state.users,
            currentOrder: order,
            currentSort: property
        });

        this.setCurrentUsers(1);
        this.pagination.setFilterPage();
    }

    render() {
        return (
            <div className={tableStyle} >
                <Table hover responsive className="table-responsive">
                    <thead>
                        <tr className={ rowStyle }>
                            <th>Actions</th>
                            <th onClick={()=>this.sort('id')}><FilterList style={{width: '15px'}}/>ID</th>
                            <th onClick={()=>this.sort('first_name')}><FilterList style={{width: '15px'}}/>First Name</th>
                            <th onClick={()=>this.sort('last_name')}><FilterList style={{width: '15px'}}/>Last Name</th>
                            <th onClick={()=>this.sort('address')}><FilterList style={{width: '15px'}}/>Address</th>
                            <th onClick={()=>this.sort('city')}><FilterList style={{width: '15px'}}/>City</th>
                            <th onClick={()=>this.sort('state')}><FilterList style={{width: '15px'}}/>State</th>
                            <th onClick={()=>this.sort('zip')}><FilterList style={{width: '15px'}}/>Zip</th>
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
                                deleteConfirm={(id, indx) => this.showConfirmModal(id, indx)}
                                insertNewEntry={(state)=> this.addNewEntry(state)}/>
                            );
                        })}
                    </tbody>
                </Table>
                <BootstrapPagination
                    pages={this.state.pages}
                    setCurrentPage={(page)=>this.setCurrentPage(page)}
                    ref={instance => { this.pagination = instance; }}/>
                <FloatingActionButton
                    clicked={()=> this.addNewUser()}
                    text="Add New User"/>
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
