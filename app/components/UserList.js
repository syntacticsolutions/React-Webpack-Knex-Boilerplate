import React from 'react';
import { Table } from 'reactstrap';
import UserEntry from './UserEntry';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [
                {
                    firstName: 'Michael',
                    lastName: 'Coder',
                    address: '1234 Da Vinci Ln.',
                    city: 'Paris',
                    state: 'France',
                    zip: '58374'
                },
                {
                    firstName: 'Michael',
                    lastName: 'Coder',
                    address: '1234 Da Vinci Ln.',
                    city: 'Paris',
                    state: 'France',
                    zip: '58374'
                }
            ]
        };
    }

    render() {
        return (
            <div>
                <Table className="table-responsive">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((obj, index) => {
                            return (
                                <UserEntry
                                firstName={obj.firstName}
                                lastName={obj.lastName}
                                address={obj.address}
                                city={obj.city}
                                state={obj.state}
                                zip={obj.zip}
                                key={index}
                                index={index} />
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}


export default UserList;
