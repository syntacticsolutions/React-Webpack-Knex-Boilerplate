import React from 'react';
import { FAB, FABText, displayNone } from '../styles/floatingActionButton.scss';
import { LibraryAdd } from 'material-ui-icons';

class FloatingActionButton extends React.Component {
    constructor(props) {
        super(props);
        this.hovered = this.hovered.bind(this);

        this.state = {
            hovered: false
        };
    }

    clicked() {
        this.props.clicked();
    }

    hovered(bool) {
        this.setState({hovered: bool});
    }

    render() {
        return (
            <section className={ FAB } onClick={()=>{this.clicked();}}>
            <div onMouseOver={()=>this.hovered(true)} onMouseOut={()=>this.hovered(false)}>
                <LibraryAdd  color="white" />
                {/* <p className={ this.state.hovered ? FABText : displayNone } >{ this.props.text }</p> */}
            </div>
            </section>
        );
    }
}

export default FloatingActionButton;

FloatingActionButton.propTypes = {
    clicked: React.PropTypes.func,
    text: React.PropTypes.string
};
