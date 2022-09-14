import React, { Component } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import moment from 'moment';
import { connect } from 'react-redux';

import DashboardHeading from '../../components/atoms/DashboardMainHeading';
import Events from '../../components/molecules/event';
import {
  getConsultations,
  setPage as setConsultationPage,
  setPageSize as setConsultationPageSize
} from '../../actions/consultation';
import {
  getOpenEnquiries,
  getAllEnquiries,
  setPageSize as setEnquiryPageSize,
  setPage as setEnquiryPage
} from '../../actions/Enquiries';
import ConsultationsCard from './ConsultationsCard';
import EnquiryCard from './EnquiryCard';
import * as actions from '../../actions/dashboard';

class DashboardLink extends Component {
  componentDidMount() {
    const { getConsultations, getOpenEnquiries, setConsultationPage, setConsultationPageSize, getAllEnquiries, setEnquiryPageSize, setEnquiryPage } = this.props;

    getOpenEnquiries();

    setConsultationPage({ page: 1 })
    setConsultationPageSize({ pageSize: 6 })
    getConsultations();

    setEnquiryPageSize({ pageSize: 6 });
    setEnquiryPage({ page: 1 });
    getAllEnquiries();
  }
  render() {
    const { consultation, enquiries, openEnquiries, auth } = this.props;
    const { lawyer } = auth || {};
    const { firstName } = lawyer || {};

    return (
      <div className='main'>
        <div className=''>
          <DashboardHeading text={`Hello ${firstName}`}/>
          <div className='dashboard-top'>
            <div class="dashboard-main-heading">{moment().format('DD MMMM YYYY')}
            <span><i class="fa fa-bars"></i></span>
            </div>
          </div>
        </div>

        <div className='dashboard-big-box'>
          <div className='dashboard-tags'>
            <span>TODAY</span>
            <span>TOMORROW</span>
            <span>LATER</span>
          </div>
          <div class="mini-box-heading">Upcoming Events</div>
          <Events {...consultation} />
        </div>

        <div className='dashboard-big-box'>
          <div class="mini-box-heading">Balance</div>
          23432
        </div>

        <div className='enquiry-sec'>
          <div className='row'>
            <div className='col-sm-4'>
              <EnquiryCard
                {...enquiries}
                title='New Enquiries'
              />
            </div>
            <div className='col-sm-4'>
              <EnquiryCard
                enquiries={openEnquiries}
                title='Open Enquiries'
              />
            </div>
            <div className='col-sm-4'>
              <ConsultationsCard {...consultation}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ consultation, enquiries, dashboard, auth }) => ({
  consultation,
  enquiries,
  ...dashboard,
  auth
});

const mapActionsToProps = {
  getConsultations,
  getOpenEnquiries,
  setConsultationPage,
  setConsultationPageSize,
  getAllEnquiries,
  setEnquiryPageSize,
  setEnquiryPage,
  ...actions
}

export default connect(mapStateToProps, mapActionsToProps)(DashboardLink);