import React from 'react';
import { PaginationLink, Pagination, PaginationItem } from 'reactstrap';
import { each } from 'lodash';
import { myPagination } from '../styles/myPagination.scss';

export default class BootstrapPagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: props.pages
        };
    }

    setCurrentPage(i) {
        this.props.setCurrentPage(i);
    }

    render() {
        let pages = [];
        for(let i = 0; i < this.props.pages; i++) {
            pages.push(
                <PaginationItem key={i}>
                    <PaginationLink onClick={()=>this.setCurrentPage(i + 1)}>
                        {i + 1}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return (
            <div className={'text-center'}>
                <Pagination className={myPagination}>
                    <PaginationItem>
                        <PaginationLink previous onClick={()=>this.setCurrentPage('last')}/>
                    </PaginationItem>
                    { pages }
                    <PaginationItem>
                        <PaginationLink next onClick={()=>this.setCurrentPage('next')}/>
                    </PaginationItem>
                </Pagination>
            </div>
        );
    }
}

BootstrapPagination.propTypes = {
    pages: React.PropTypes.number,
    setCurrentPage: React.PropTypes.func,

};
