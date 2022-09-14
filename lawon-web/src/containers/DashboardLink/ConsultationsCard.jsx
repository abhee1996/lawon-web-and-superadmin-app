import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { EmptyList } from '../../components/molecules/NotFound/EmptyView';

export default ({ consultations = [] }) => {
  return (
    <div className='dashboard-mini-box'>
      <div className='mini-box-heading'>Consultations</div>
      {(!consultations || !consultations.length)
          && <EmptyList>No Event Found</EmptyList>}
      {consultations.map(({ User, startTime, detail, channel }) => {
        const { firstName, lastName, imageUrl } = User || {};
        return (
          <div className='row card-row'>
            <div className='col-sm-2'>
              <div className='box-image'>
                <span className='unread'></span>
                <img alt={firstName} src={imageUrl} />
              </div>
            </div>
            <div className='col-sm-8'>
              <div className='box-details'>
                <div className='box-name'>{`${firstName} ${lastName}`}</div>
                <div className='box-para'>{detail}</div>
              </div>
            </div>
            <div className='col-sm-2 no-padding'>
              <div className='box-details-options'>
                <div className='box-detail-day'>{moment(startTime).format('DD MMM')}</div>
                <div className=''>{moment(startTime).format('HH:mm')}</div>
              </div>
            </div>
          </div>
        )
      })}

      {(consultations && consultations.length > 0)
        && <Link to='/main/dashboardmaster/enquiries'> <span id='xyz' className='see-all'>SEE ALL</span></Link>}
    </div>
  )
}