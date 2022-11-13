import css from './JobBoardCard.module.css';

import React from 'react';
import ReactStars from 'react-stars';
import moment from 'moment';

import { ImLocation } from 'react-icons/im';
import { HiOutlineBookmark } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export const JobBoardCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <li key={item.id} className={css.Item}>
      <div className={css.ImgContainer}>
        <img src={item.pictures[0]} alt={item.title} className={css.Img} />
      </div>
      <div className={css.AboutContainer}>
        <div className={css.TopBox}>
          <h3 className={css.Title} onClick={() => navigate('/details')}>
            {item.title}
          </h3>
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
              <HiOutlineBookmark className={css.BookMark} />
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
