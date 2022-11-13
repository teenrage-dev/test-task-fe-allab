import css from './JobBoard.module.css';

import React, { useState } from 'react';
import { useEffect } from 'react';
import { getAllBoard } from 'shared/api/jobBoard';

import { getCityName } from 'shared/api/getCityName';

import { PaginatedItems } from 'components/PaginatedItems/PaginatedItems';

export const JobBoard = () => {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState([]);

  useEffect(() => {
    const getList = async () => {
      try {
        const list = await getAllBoard();
        setData([...list]);
      } catch (error) {
        console.log(error.message);
      }
    };

    getList();
  }, []);

  useEffect(() => {
    data.forEach(async item => {
      try {
        const dataGeo = await getCityName(
          item.location.lat,
          item.location.long
        );

        item.country = dataGeo.countryName;
        item.locality = dataGeo.locality;
        item.city = dataGeo.city;
        setLocation(prevState => [...prevState, dataGeo]);
      } catch (error) {
        console.log(error.message);
      }
    });
  }, [data]);

  return (
    <section className={css.Section}>
      <div className={css.Container}>
        <PaginatedItems data={data} itemsPerPage={10} />
      </div>
    </section>
  );
};
