import React from 'react';
import _ from 'lodash';

export default class UserEntry extends React.Component {
    constructor(props) {
        super(props);
        this.changeFirstName = this.changeFirstName.bind(this);
        this.changeLastName = this.changeLastName.bind(this);
        this.changeAddress = this.changeAddress.bind(this);
        this.changeCity = this.changeCity.bind(this);
        this.changeState = this.changeState.bind(this);
        this.changeZip = this.changeZip.bind(this);
        this.setEditing = this.setEditing.bind(this);

        this.state = {
            firstName: props.firstName,
            lastName: props.lastName,
            address: props.address,
            city: props.city,
            state: props.state,
            zip: props.zip,
            editing: false
        };
    }

    setEditing() {
        this.setState({
            editing: true
        });
    }

    changeFirstName(event) {
        this.setState({
            firstName: event.target.value
        });
    }

    changeLastName(event) {
        this.setState({
            lastName: event.target.value
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
        if ( _.isNumber(event.target.value ) && event.target.value.length < 5) {
            this.setState({
                zip: event.target.value
            });
        }
    }

    render() {
        return this.state.editing ? (
            <tr>
                <td>{this.props.index}</td>
                <td><input onChange={this.changeFirstName} type="text" value={this.state.firstName}/></td>
                <td><input onChange={this.changeLastName} type="text" value={this.state.lastName}/></td>
                <td><input onChange={this.changeAddress} type="text" value={this.state.address}/></td>
                <td><input onChange={this.changeCity} type="text" value={this.state.city}/></td>
                <td><input onChange={this.changeState} type="text" value={this.state.state}/></td>
                <td><input onChange={this.changeZip} type="text" value={this.state.zip}/></td>
            </tr>
        )
        :
        (
            <tr onClick={this.setEditing}>
                <td>{this.props.index}</td>
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
    firstName: React.PropTypes.string,
    lastName: React.PropTypes.string,
    address: React.PropTypes.string,
    city: React.PropTypes.string,
    state: React.PropTypes.string,
    zip: React.PropTypes.string
};
