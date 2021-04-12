import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import React from 'react';
import ReactPaginate from "react-paginate";
import {
    BottomNav
} from '../menus';

const JobListPaginator = ({ currPage, pageCount, handlePageClick }) => {
    return (
        <>
            <BottomNav>
            <ReactPaginate
                className="bottomNavPaginator"
                initialSelected={currPage}
                previousLabel={<ChevronLeft />}
                nextLabel={<ChevronRight />}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}g
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
            /> 
            
            </BottomNav>
        </>
    )
}

JobListPaginator.propTypes = {

}

export default JobListPaginator
