import React from 'react';
import "../../assets/style/pagination.scss"

const Pagination = ({totalProducts, perPage, setCurrentPage, currentPage}) => {
    let pages = []

    for (let i = 1; i <= Math.ceil(totalProducts/perPage); i++) {
pages.push(i)
    }


    return (
        <div className="pagination">
            {pages.map((page, i) => (
                <button key={i} onClick={() => setCurrentPage(page)} className={page === currentPage ? "active" : "pagination_button"}>{page}</button>
            ))}
        </div>
    );
};

export default Pagination;
