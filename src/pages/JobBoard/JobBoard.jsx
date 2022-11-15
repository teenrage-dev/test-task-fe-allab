import css from './JobBoard.module.css';

import React from 'react';

import { PaginatedItems } from 'components/PaginatedItems/PaginatedItems';

export const JobBoard = ({ data}) => {
  return (
    <section className={css.Section}>
      <div className={css.Container}>
        <PaginatedItems data={data} itemsPerPage={10} />
      </div>
    </section>
  );
};
