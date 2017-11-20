import React from 'react';
import { Table } from 'reactstrap';
import UserEntry from './UserEntry';
import axios from 'axios';

class UserList extends React.Component {
    constructor(props) {
        super(props);

        this.onEditingChanged = this.onEditingChanged.bind(this);
        this.state = {
            users: [],
            editing: null
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

    render() {
        return (
            <div>
                <Table className="table-responsive">
                    <thead>
                        <tr>
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
                                unmountMe={(idx) => this.deleteUser(idx)} />
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default UserList;
