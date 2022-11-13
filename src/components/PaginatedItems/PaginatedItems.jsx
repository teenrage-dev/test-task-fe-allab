import css from './PaginatedItems.module.css';

import React, { useEffect, useState } from 'react';
import { JobBoardCard } from 'components/JobBoardCard/JobBoardCard';
import ReactPaginate from 'react-paginate';
import sprite from '../../images/sprite.svg';

const arrowLink = `${sprite}#icon-arrow`;
const arrowLeft = (
  <svg className={css.arrowLeft} width="18" height="18">
    <use href={arrowLink} />
  </svg>
);

const arrowRight = (
  <svg className={css.arrowRight} width="18" height="18">
    <use href={arrowLink} />
  </svg>
);

export const PaginatedItems = ({ data, itemsPerPage }) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [data, itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  function handlePageClick(event) {
    const newOffset = (event.selected * itemsPerPage) % data.length;

    setItemOffset(newOffset);
  }

  return (
    <>
      <ul className={`${css.List} list`}>
        {currentItems && currentItems.map(item => <JobBoardCard item={item} />)}
      </ul>
      <ReactPaginate
        nextLabel={arrowRight}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel={arrowLeft}
        pageClassName={css.pageItem}
        pageLinkClassName={css.pageLink}
        previousClassName={css.pageItem}
        previousLinkClassName={css.pageLink}
        nextClassName={css.pageItem}
        nextLinkClassName={css.pageLink}
        breakLabel="..."
        breakClassName={css.pageItem}
        breakLinkClassName={css.pageLink}
        containerClassName={css.pagination}
        activeClassName={css.active}
        disabledClassName={css.disabled}
        renderOnZeroPageCount={null}
      />
    </>
  );
};
