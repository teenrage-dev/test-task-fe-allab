import css from './JobDetailed.module.css';
import React, { useState, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineStar } from 'react-icons/ai';
import { HiOutlineBookmark } from 'react-icons/hi';
import { BsShareFill } from 'react-icons/bs';
import { ImLocation } from 'react-icons/im';
import { SlArrowLeft } from 'react-icons/sl';
import moment from 'moment';

import { useWindowDimensions } from 'shared/hoocks/useWindowDimensions';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Map } from 'components/Map/Map';

export const JobDetailed = () => {
  const [paragraph, setParagraph] = useState([]);

  const { width } = useWindowDimensions();
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state;
  console.log(item);

  const currencyFormat = num => {
    const serchedNum = num.split('').filter(n => n === 'k');
    if (serchedNum.length >= 2) {
      return num
        .split('')
        .map(n => {
          if (n === 'k') {
            return (n = ' 000');
          } else if (n === 'kk') {
            return (n = ' 000000');
          }

          return n;
        })
        .join('');
    }
  };

  useEffect(() => {
    const convertToPargraph = string => {
      let array = [];
      string.split('\n').filter((str, index, arr) => {
        if (str === '' || str === ' ' || str === '  ') {
          array = [];

          array = [...arr];
          return arr.splice(index, 1);
        }

        return str;
      });
      setParagraph([...array.filter(Boolean)]);
      return array.filter(Boolean);
    };
    convertToPargraph(item.description);
  }, [item.description]);

  const filtered = paragraph[4]?.split('. ');

  const numberToPhone = number => {
    if (number) {
      return number
        .replace(/\D+/g, '')
        .replace(/([0-9]{1,3})([0-9]{3})([0-9]{4}$)/gi, '($1) $2-$3'); //mask numbers (xxx) xxx-xxxx
    }
    return '';
  };

  return (
    <section className={css.Section}>
      <div className={css.Container}>
        <div className={css.DetailWrapper}>
          <div className={css.Navigator}>
            <h2 className={css.MainTitle}>Job Details</h2>
            <hr className={css.Line} />
            <div className={css.NavigatorField}>
              <div className={css.NavigatorItem}>
                {width >= 1920 ? (
                  <HiOutlineBookmark className={css.BookMarkIcon} />
                ) : (
                  <AiOutlineStar className={css.StarIcon} />
                )}
                <p className={css.NavigatorText}>Save to my list</p>
              </div>
              <div className={css.NavigatorItem}>
                <BsShareFill className={css.ShareIcon} />
                <p className={css.NavigatorText}>Share</p>
              </div>
            </div>
          </div>
          {width >= 1920 ? (
            <button className={css.Btn}>Apply Now</button>
          ) : null}
          <div className={css.About}>
            <div className={css.AboutWrapper}>
              <h3 className={`${css.Title} ${css.AboutItem}`}>{item.title}</h3>
              <p className={`${css.TimeCreate} ${css.AboutItem}`}>
                Posted {moment(item.createdAt).startOf('day').fromNow()}
              </p>
              <div className={`${css.SalaryWrapper} ${css.AboutItem}`}>
                <p className={css.SalaryText}>Brutto, per year</p>
                <p className={css.Salary}>€ {currencyFormat(item.salary)}</p>
              </div>
            </div>
            <div className={css.ParagraphBox}>
              <p className={css.Paragraph}>{paragraph[0]}</p>
              <p className={css.ParagraphTitle}>{paragraph[1]}</p>
              <p className={css.Paragraph}>{paragraph[2]}</p>
              <p className={css.ParagraphTitle}>{paragraph[3]}</p>
              <ul className={css.ParagraphList}>
                {filtered?.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={`${css.Paragraph} ${css.ParagraphItem}`}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
            <button className={`${css.Btn} `}>Apply Now</button>
          </div>
          <div className={css.ImgsContainer}>
            <h3 className={css.MainTitle}>Attached images</h3>
            <hr className={css.Line} />
            <Swiper
              spaceBetween={width >= 1920 ? 1 : 10}
              slidesPerView={width >= 1920 ? 3 : 2}
              className={css.ImgBox}
            >
              {item.pictures.map((slide, index) => (
                <SwiperSlide key={index} className={css.ImgField}>
                  <img
                    src={slide}
                    alt={item.title}
                    className={css.Img}
                    width="205"
                    height="115"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className={css.AdditionalInfo}>
            <h3 className={css.MainTitle}>Additional info</h3>
            <hr className={css.Line} />
            <p className={css.AdditionalTitle}>Employment type</p>
            <ul className={css.AdditionalList}>
              {item.employment_type.map((empl, index) => (
                <li key={index} className={css.AdditionalItem}>
                  {empl}
                </li>
              ))}
            </ul>
            <p className={css.AdditionalTitle}>Benefits</p>
            <ul className={css.AdditionalList}>
              {item.benefits.map((benefit, index) => (
                <li
                  key={index}
                  className={`${css.AdditionalItem} ${css.BenefitItem}`}
                >
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          {width >= 1920 ? (
            <button className={css.BackBtn} onClick={() => navigate('/')}>
              <SlArrowLeft className={css.ArrowIcon} />{' '}
              <span className={css.BackBtnField}> Return to job board</span>
            </button>
          ) : null}
        </div>
        <div className={css.ContactWrapper}>
          <p className={css.MainTitle}>Contacts</p>
          <hr className={css.Line} />
          <div className={css.ContactTextWrapper}>
            <p className={css.ContactTitle}>{item.name}</p>
            <span className={css.ContactAdress}>
              <ImLocation
                className={css.LocationIcon}
                fill="#D8D8D8"
                opacity="0.56"
              />
              {item.address}
            </span>
            <p className={css.ContactPhone}>+{numberToPhone(item.phone)}</p>
            <p className={css.ContactMail}>{item.email}</p>
            <div className={css.BackgroundCircle}></div>
          </div>
          <div className={css.ContactMapWrapper}>
            <Map location={item.location} />
          </div>
        </div>
      </div>
    </section>
  );
};
