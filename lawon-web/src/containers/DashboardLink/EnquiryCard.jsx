import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { EmptyList } from '../../components/molecules/NotFound/EmptyView';

export default ({ enquiries = [], title }) => {
  return (
    <div className='dashboard-mini-box'>
      <div className='mini-box-heading'>{title}</div>
      {(!enquiries || !enquiries.length)
          && <EmptyList>No Open Enquiries Found</EmptyList>}
      {enquiries.map(({ User, problem, createdAt }) => {
        const { firstName, lastName, imageUrl } = User;
        return (
          <div className='row card-row'>
            <div className='col-sm-2'>
              <div className='box-image'>
                <span className='unread'></span>
                <img height='' src={imageUrl} alt={firstName} />
              </div>
            </div>
            <div className='col-sm-8'>
              <div className='box-details'>
                <div className='box-name'>{firstName} {lastName}</div>
                <div className='box-para'>{problem}</div>
              </div>
            </div>
            <div className='col-sm-2 no-padding'>
              <div className='box-details-options'>
                <div className='box-detail-day'>{moment(createdAt).format('DD MMM')}</div>
                <div className=''>{moment(createdAt).format('HH:mm')}</div>
              </div>
            </div>

          </div>
        )
      })}

      <Link to='/main/dashboardmaster/enquiries'> <span id='xyz' className='see-all'>SEE ALL</span></Link>
    </div >
  )
}