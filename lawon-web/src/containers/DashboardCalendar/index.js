import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import LoadingBar from 'react-top-loading-bar'

import CalendarTile from '../../components/molecules/calendarTile';
import DashboardHeading from '../../components/atoms/DashboardMainHeading';
import * as actions from '../../actions/calendar';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
};

class DashboardCalendar extends Component {
  componentDidMount() {
    const { getConsultationByDate } = this.props;
    getConsultationByDate();
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = nextProps;
    if (loading) {
      this.LoadingBar.continuousStart();
    } else {
      this.LoadingBar.complete();
    }
  }

  render() {
    const { calendars = [] } = this.props;
    return (
      <div className='main'>
        <LoadingBar
          onRef={ref => (this.LoadingBar = ref)}
          height={3}
          color="#feb41c"
        />
        <div className='container-fluid no-padding'>
          <div className='row'>

            <div className='col-md-10'>
              <div className=''>
                <DashboardHeading text='Calendar' />
              </div>
              <div className='calendar-slider'>
                <Slider {...settings}>
                  {
                    calendars.map((calendar) => (
                      <div>
                        <CalendarTile consultations={calendar}/>
                      </div>
                    ))
                  }
                </Slider>
              </div>
            </div>
            <div className='col-md-2'>
              <div className='calendar-agenda'>
                <div className=''>
                  <DatePicker
                    inline
                  />
                </div>
                <div className='agenda'>
                  <div className='bold'>AGENDA</div>
                  <div style={{ paddingTop: '10px' }}>
                    <span className='yellow-dot-agenda'></span>
                    <span className='agenda-time'>
                      <span style={{ padding: '0 10px' }}>9:00</span>
                      <span>Meeting with hamza</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ calendar }) => ({
  ...calendar
})
export default connect(mapStateToProps, actions)(DashboardCalendar);