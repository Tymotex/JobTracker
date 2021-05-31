import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import React from 'react';
import ReactPaginate from 'react-paginate';
import './JobListPaginator.scss';
import { BottomNav } from '../menus';

const JobListPaginator = ({ currPage, pageCount, handlePageClick }) => {
    return (
        <>
            {/* Padding so content isn't hidden behind the navbar */}
            <div style={{ marginTop: '100px' }} />

            {/* Absolutely position navigation bar at the bottom */}
            <BottomNav>
                <ReactPaginate
                    className="bottomNavPaginator"
                    initialSelected={currPage}
                    previousLabel={<ChevronLeft />}
                    nextLabel={<ChevronRight />}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={pageCount}
                    g
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
            </BottomNav>
        </>
    );
};

JobListPaginator.propTypes = {};

export default JobListPaginator;
