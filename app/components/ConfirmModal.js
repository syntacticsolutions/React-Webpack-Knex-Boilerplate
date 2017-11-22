import React from 'react';
import { Button } from 'reactstrap';
import { alertModal, modalContainer, modalWrapper, modalButton } from '../styles/alertModal.scss';

export default class ConfirmModal extends React.Component {
    constructor(props) {
        super(props);
    }

    hideModal() {
        this.props.hideModal();
    }

    confirm() {
        this.props.confirm();
    }

    render() {
        return (
            !this.props.hide ? null :
            <div className={alertModal}>
                <div className={modalWrapper}>
                    <div className={modalContainer}>
                        <div>
                            <h3>{this.props.type}</h3>
                        </div>
                        <div>
                            {this.props.message}
                        </div>
                        <Button onClick={()=>{this.confirm();}} color="warning" className={modalButton}>Confirm</Button>
                        <Button style={{float: 'right'}} onClick={()=>{this.hideModal();}} color="primary" className={modalButton}>Cancel</Button>
                    </div>
                </div>
            </div>
        );
    }
}

ConfirmModal.propTypes = {
    message: React.PropTypes.string,
    hide: React.PropTypes.bool,
    type: React.PropTypes.string,
    hideModal: React.PropTypes.func,
    confirm: React.PropTypes.func
};
