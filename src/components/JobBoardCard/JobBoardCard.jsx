import css from './JobBoardCard.module.css';

import React from 'react';
import ReactStars from 'react-stars';
import moment from 'moment';

import { ImLocation } from 'react-icons/im';
import { HiOutlineBookmark } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

export const JobBoardCard = ({ item }) => {
  return (
    <li key={item.id} className={css.Item}>
      <div className={css.ImgContainer}>
        <img src={item.pictures[0]} alt={item.title} className={css.Img} />
      </div>
      <div className={css.AboutContainer}>
        <div className={css.TopBox}>
          <NavLink
            className={`${css.Title} link`}
            to={'details'}
            state={{ ...item }}
          >
            {item.title}
          </NavLink>
          <p className={css.Text}>
            {item.name} •{' '}
            {item.locality ? `${item.locality}` : 'Location not found'}
          </p>
          <div className={css.Location}>
            <ImLocation
              className={css.LocationIcon}
              width="13"
              height="18"
              fill="#878D9D"
            />
            <div className={css.LocationText}>
              {item.city ? `${item.city},` : 'City not found, '}
              {item.country ? item.country : 'Country not found'}
            </div>
          </div>
        </div>
        <div className={css.BtmBox}>
          <div className={css.RatingField}>
            <ReactStars
              count={5}
              size={24}
              color1={'#384564'}
              color2={'#38415D'}
              className={css.Rating}
            />
          </div>
          <div className={css.TimeField}>
            <div className={css.BookMarkField}>
              <HiOutlineBookmark className={css.BookMarkIcon} />
            </div>
            <p className={css.TimeCreate}>
              Posted {moment(item.createdAt).startOf('day').fromNow()}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};
