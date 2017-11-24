import React from 'react';
import { PaginationLink, Pagination, PaginationItem } from 'reactstrap';
import { each } from 'lodash';
import { myPagination, pageActive } from '../styles/myPagination.scss';

export default class BootstrapPagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstPage: 0,
            lastPage: 5,
            currentPage: 1
        };
    }

    setCurrentPage(i) {
        if(i === 'last') {
            i = this.state.currentPage - 1;
        }
        if(i === 'next') {
            i = this.state.currentPage + 1;
        }

        if(i >= 1 && i <= this.props.pages) {
            this.props.setCurrentPage(i);
            this.setState({
                currentPage: i
            });
        }
        if(i > this.state.lastPage && i <= this.props.pages) {
            this.setState({
                firstPage: this.state.firstPage + 1,
                lastPage: this.state.lastPage + 1
            });
        }
        if(i < this.state.firstPage + 1 && i >= 1) {
            this.setState({
                firstPage: this.state.firstPage - 1,
                lastPage: this.state.lastPage - 1
            });
        }
    }

    setPagination(page) {
        if(page < 5) {
            this.setState({
                firstPage: 0,
                lastPage: 5,
                currentPage: page
            });
        } else {
            this.setState({
                currentPage: page,
                firstPage: page - 5,
                lastPage: page
            });
        }
    }

    setFilterPage() {
        this.setState({
            currentPage: 1,
            firstPage: 0,
            lastPage: 5
        });
    }

    render() {
        let pages = [];
        for(let i = this.state.firstPage; i < this.state.lastPage; i++) {
            pages.push(
                <PaginationItem key={i} style={{minWidth: '45px'}}>
                    <PaginationLink onClick={()=>this.setCurrentPage(i + 1)} className={i + 1 === this.state.currentPage ? pageActive : ''}>
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
