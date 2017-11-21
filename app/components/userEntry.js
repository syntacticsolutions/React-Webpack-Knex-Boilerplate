import React from 'react';
import _ from 'lodash';
import mui from 'material-ui';
import CheckCircle from 'material-ui-icons/CheckCircle';
import DeleteForever from 'material-ui-icons/DeleteForever';
import { Edit, Cancel } from 'material-ui-icons';
import axios from 'axios';
import { rowStyle } from '../styles/rowStyles.scss';

export default class UserEntry extends React.Component {
    constructor(props) {
        super(props);
        this.changeFirstName = this.changeFirstName.bind(this);
        this.changeLastName = this.changeLastName.bind(this);
        this.changeAddress = this.changeAddress.bind(this);
        this.changeCity = this.changeCity.bind(this);
        this.changeState = this.changeState.bind(this);
        this.changeZip = this.changeZip.bind(this);

        this.state = {
            id: props.id,
            first_name: props.firstName,
            last_name: props.lastName,
            address: props.address,
            city: props.city,
            state: props.state,
            zip: props.zip,
        };
    }

    setEditing(index) {
        if(this.props.inserting !== null) {
            // add alert modal.
            return;
        }
        this.props.callbackParent(index);
    }

    confirmEdit() {
        if (this.props.inserting === this.props.index) {
            axios.post('http://localhost:7555/api/users/', this.state)
            .then((res)=>{
                this.setState(res.body);
                this.setEditing(null);
            }).catch(err => {
                this.props.showAlert('Error', err.response.data);
            });
        } else {
            axios.put('http://localhost:7555/api/users/' + this.state.id, this.state)
            .then(() => {
                this.setEditing(null);
            })
            .catch(err => {
                this.props.showAlert('Error', err.response.data);
            });
        }
    }

    deleteForever() {
        axios.delete('http://localhost:7555/api/users/' + this.state.id)
        .then(() => {
            this.props.unmountMe(this.props.index);
        })
        .catch(err => {
            this.props.showAlert('Error', err.response.data);
        });
    }

    changeFirstName(event) {
        this.setState({
            first_name: event.target.value
        });
    }

    changeLastName(event) {
        this.setState({
            last_name: event.target.value
        });
    }

    changeAddress(event) {
        this.setState({
            address: event.target.value
        });
    }

    changeState(event) {
        this.setState({
            state: event.target.value
        });
    }

    changeCity(event) {
        this.setState({
            city: event.target.value
        });
    }

    changeZip(event) {
        if ( !isNaN(event.target.value ) && event.target.value.length < 6) {
            this.setState({
                zip: event.target.value
            });
        }
    }

    render() {
        return this.props.editing === this.props.index ? (
            <tr className={rowStyle}>
            	<td>
            		<CheckCircle color="#50C878" onClick={()=>{this.confirmEdit(this.props.index);}} />
            		<Cancel color="#E03617" onClick={()=>{this.setEditing(null);}} />
            	</td>
                <td>{this.props.id}</td>
                <td><input onChange={this.changeFirstName} type="text" value={this.state.first_name}/></td>
                <td><input onChange={this.changeLastName} type="text" value={this.state.last_name}/></td>
                <td><input onChange={this.changeAddress} type="text" value={this.state.address}/></td>
                <td><input onChange={this.changeCity} type="text" value={this.state.city}/></td>
                <td><input onChange={this.changeState} type="text" value={this.state.state}/></td>
                <td><input onChange={this.changeZip} type="text" value={this.state.zip}/></td>
            </tr>
        )
        :
        (
            <tr className={rowStyle}>
            	<td>
                    <Edit color="#50C878" onClick={()=>{this.setEditing(this.props.index);}}/>
                    <DeleteForever color="#E03617" onClick={()=>{this.deleteForever(this.props.index);}} />
                </td>
                <td>{this.props.id}</td>
                <td>{this.props.firstName}</td>
                <td>{this.props.lastName}</td>
                <td>{this.props.address}</td>
                <td>{this.props.city}</td>
                <td>{this.props.state}</td>
                <td>{this.props.zip}</td>
            </tr>
        );
    }
}

UserEntry.propTypes = {
    index: React.PropTypes.number,
    id: React.PropTypes.number,
    firstName: React.PropTypes.string,
    lastName: React.PropTypes.string,
    address: React.PropTypes.string,
    city: React.PropTypes.string,
    state: React.PropTypes.string,
    zip: React.PropTypes.string,
    editing: React.PropTypes.number,
    callbackParent: React.PropTypes.func,
    unmountMe: React.PropTypes.func,
    inserting: React.PropTypes.number,
    showAlert: React.PropTypes.func
};
