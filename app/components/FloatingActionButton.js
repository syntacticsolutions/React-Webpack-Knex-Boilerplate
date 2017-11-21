import React from 'react';
import { FAB } from '../styles/floatingActionButton.scss';
import mui from 'material-ui';
import { LibraryAdd } from 'material-ui-icons';

class FloatingActionButton extends React.Component {

    clicked() {
        this.props.clicked();
    }

    render() {
        return (
            <section className={ FAB } onClick={()=>{this.clicked();}}>
            <div>
                <LibraryAdd color="white" />
            </div>
            </section>
        );
    }
}

export default FloatingActionButton;

FloatingActionButton.propTypes = {
    clicked: React.PropTypes.func
};
