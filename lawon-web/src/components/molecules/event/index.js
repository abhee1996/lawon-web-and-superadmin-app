import React from 'react';
import Slider from "react-slick";
import moment from 'moment';
import { findKey } from 'lodash';
import { EmptyList } from '../../../components/molecules/NotFound/EmptyView';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  adaptiveHeight: 317
};

const CONSULTATION_CHANNEL = {
  CALL: 1,
  VEDIO: 2
};

export default ({ consultations = [] }) => {
  return (
    <>
    {(!consultations || !consultations.length)
          && <EmptyList>No Event Found</EmptyList>}
      <Slider {...settings}>
        {consultations.map(({ User, startTime, ConsultationAttachments = [], channel = '' }) => {
          const { firstName, lastName } = User || {};
          return (
            <div>
              <div className="event-card">
                <div className='event-time'>{moment(startTime).format('HH:mm')}</div>
                <div className='event-date'>{moment(startTime).format('DD MMM YYYY')}</div>
                <div className='event-title'>Consultation with {`${firstName} ${lastName}`}</div>
                <div className="event-media"></div>
                <div className="event-attachment">
                  <span><i className="fa fa-paperclip"></i></span>
                  <span>{ConsultationAttachments.length} attachments</span>
                </div>
              </div>
            </div>
          )
        })}
      </Slider>
    </>
  )
}
