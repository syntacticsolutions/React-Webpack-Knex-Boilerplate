import React from 'react';
import TextField from 'material-ui/TextField';
import { Edit, Cancel, DeleteForever, CheckCircle } from 'material-ui-icons';
import axios from 'axios';
import { rowStyle, actionStyle } from '../styles/rowStyles.scss';

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
            if(!this.state.id) this.props.deleteUnsavedEntry();
            this.props.resetInserting();
            this.props.callbackParent(null);
            return;
        }
        this.props.callbackParent(index);
    }

    setParentState(state) {
        this.props.insertNewEntry(state);
    }

    confirmEdit() {
        if (this.props.inserting === this.props.index) {
            axios.post('http://localhost:7555/api/users/', this.state)
            .then((res)=>{
                this.setState(res.data);
                this.setParentState(res.data);
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

    deleteForever(id, index) {
        this.props.deleteConfirm(this.state.id, index);
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
            	<td className={actionStyle}>
            		<CheckCircle color="#50C878" onClick={()=>{this.confirmEdit(this.props.index);}} />
            		<Cancel color="#E03617" onClick={()=>{this.setEditing(null);}} />
            	</td>
                <td>{this.props.id}</td>
                <td><TextField onChange={this.changeFirstName} type="text" value={this.state.first_name}/></td>
                <td><TextField onChange={this.changeLastName} type="text" value={this.state.last_name}/></td>
                <td><TextField onChange={this.changeAddress} type="text" value={this.state.address}/></td>
                <td><TextField onChange={this.changeCity} type="text" value={this.state.city}/></td>
                <td><TextField onChange={this.changeState} type="text" value={this.state.state}/></td>
                <td><TextField onChange={this.changeZip} type="text" value={this.state.zip}/></td>
            </tr>
        )
        :
        (
            <tr className={rowStyle}>
            	<td className={actionStyle}>
                    <Edit color="#50C878" onClick={()=>{this.setEditing(this.props.index);}}/>
                    <DeleteForever color="#E03617" onClick={()=>{this.deleteForever(this.state.id, this.props.index);}} />
                </td>
                <td>{this.state.id}</td>
                <td>{this.state.first_name}</td>
                <td>{this.state.last_name}</td>
                <td>{this.state.address}</td>
                <td>{this.state.city}</td>
                <td>{this.state.state}</td>
                <td>{this.state.zip}</td>
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
    showAlert: React.PropTypes.func,
    resetInserting: React.PropTypes.func,
    deleteUnsavedEntry: React.PropTypes.func,
    deleteConfirm: React.PropTypes.func,
    insertNewEntry: React.PropTypes.func
};
