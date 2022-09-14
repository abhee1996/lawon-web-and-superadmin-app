
import React, { Component } from 'react';
import DashboardHeading from '../../../components/atoms/DashboardMainHeading'
import EventCard from '../../../components/molecules/event'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';


class Appointment extends Component {

  state = {}
  componentDidMount() {

  }
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1
    };
    return (
      <div>


        <div class="col-md-12 quick-view-section">
          <div class="heading">Upcoming Events</div>
          <div class="row quick-view-bg">
            <Slider {...settings}>
              <div className=''>
                <EventCard />
              </div>
              <div>
                <EventCard />
              </div>
              <div>
                <EventCard />
              </div>
              <div>
                <EventCard />
              </div>
              <div>
                <EventCard />
              </div>
              <div>
                <EventCard />
              </div>
              <div>
                <EventCard />
              </div>
              <div>
                <EventCard />
              </div>
              <div>
                <EventCard />
              </div>
              <div>
                <EventCard />
              </div>
              <div>
                <EventCard />
              </div>
              <div>
                <EventCard />
              </div>
            </Slider>
          </div>
          
          {/* <DashboardHeading
          text='Hello'
          />
          <div className='dashboard-top'>
          <div class="dashboard-main-heading">19 June 2019 
          <span><i class="fa fa-bars"></i></span>
          </div>

          </div> */}




        </div>

        {/* <div className='dashboard-big-box'>
       <div className='dashboard-tags'>
       <span>TODAY</span>
       <span>TOMORROW</span>
       <span>LATER</span>
       </div>
       <div class="mini-box-heading">Upcoming Events</div>
   
      <Slider {...settings}>
        <div className=''>
         <EventCard/>
        </div>
        <div>
         <EventCard/>
        </div>
        <div>
        <EventCard/>
        </div>
        <div>
        <EventCard/>
        </div>
        <div>
        <EventCard/>
        </div>
        <div>
        <EventCard/>
        </div>
        <div>
        <EventCard/>
        </div>
        <div>
        <EventCard/>
        </div>
        <div>
        <EventCard/>
        </div>
        <div>
        <EventCard/>
        </div>
        <div>
        <EventCard/>
        </div>
        <div>
        <EventCard/>
        </div>
      </Slider>
    </div> */}


        {/* <div className='enquiry-sec'>
          <div className='row'>
          <div className='col-sm-4'>
          <div className='dashboard-mini-box'>
          <div className='mini-box-heading'>
          New Enquiries
          </div>
          <div className='row card-row'>
          <div className='col-sm-2'>
          <div className='box-image'>
          <span className='unread'></span>
         
          </div>
          </div>
          <div className='col-sm-8'>
          <div className='box-details'>
          <div className='box-name'>Amanda Roscoe</div>
          <div className='box-para'>My landlord doesn't want to return the...</div>
          </div>
          </div>
          <div className='col-sm-2 no-padding'>
          <div className='box-details-options'>
          <div className='box-detail-day'>29 May</div>
          <div className=''>18:21</div>
          </div>
          </div>        
                    
          </div>
          <div className='row card-row'>
          <div className='col-sm-2'>
          <div className='box-image'>
          <span className='unread'></span>
         
          </div>
          </div>
          <div className='col-sm-8'>
          <div className='box-details'>
          <div className='box-name'>Amanda Roscoe</div>
          <div className='box-para'>My landlord doesn't want to return the...</div>
          </div>
          </div>
          <div className='col-sm-2 no-padding'>
          <div className='box-details-options'>
          <div className='box-detail-day'>29 May</div>
          <div className=''>18:21</div>
          </div>
          </div>        
                    
          </div>
          <div className='row card-row'>
          <div className='col-sm-2'>
          <div className='box-image'>
          <span className='unread'></span>
         
          </div>
          </div>
          <div className='col-sm-8'>
          <div className='box-details'>
          <div className='box-name'>Amanda Roscoe</div>
          <div className='box-para'>My landlord doesn't want to return the...</div>
          </div>
          </div>
          <div className='col-sm-2 no-padding'>
          <div className='box-details-options'>
          <div className='box-detail-day'>29 May</div>
          <div className=''>18:21</div>
          </div>
          </div>        
                    
          </div>
          <div className='row card-row'>
          <div className='col-sm-2'>
          <div className='box-image'>
          <span className='unread'></span>
         
          </div>
          </div>
          <div className='col-sm-8'>
          <div className='box-details'>
          <div className='box-name'>Amanda Roscoe</div>
          <div className='box-para'>My landlord doesn't want to return the...</div>
          </div>
          </div>
          <div className='col-sm-2 no-padding'>
          <div className='box-details-options'>
          <div className='box-detail-day'>29 May</div>
          <div className=''>18:21</div>
          </div>
          </div>        
                    
          </div>
          <div className='row card-row'>
          <div className='col-sm-2'>
          <div className='box-image'>
          <span className='unread'></span>
         
          </div>
          </div>
          <div className='col-sm-8'>
          <div className='box-details'>
          <div className='box-name'>Amanda Roscoe</div>
          <div className='box-para'>My landlord doesn't want to return the...</div>
          </div>
          </div>
          <div className='col-sm-2 no-padding'>
          <div className='box-details-options'>
          <div className='box-detail-day'>29 May</div>
          <div className=''>18:21</div>
          </div>
          </div>        
                    
          </div>
          <Link to='/main/dashboardmaster/enquiries'> <span id='xyz' className='see-all'>SEE ALL</span></Link>
          </div>
          </div>
          <div className='col-sm-4'>
          <div className='dashboard-mini-box'>
          <div className='mini-box-heading'>
          Open Enquiries
          </div>
          <div className='row card-row'>
          <div className='col-sm-2'>
          <div className='box-image'>
          <span className='unread'></span>
         
          </div>
          </div>
          <div className='col-sm-8'>
          <div className='box-details'>
          <div className='box-name'>Amanda Roscoe</div>
          <div className='box-para'>My landlord doesn't want to return the...</div>
          </div>
          </div>
          <div className='col-sm-2 no-padding'>
          <div className='box-details-options'>
          <div className='box-detail-day'>29 May</div>
          <div className=''>18:21</div>
          </div>
          </div>        
                    
          </div>
          <div className='row card-row'>
          <div className='col-sm-2'>
          <div className='box-image'>
          <span className='unread'></span>
         
          </div>
          </div>
          <div className='col-sm-8'>
          <div className='box-details'>
          <div className='box-name'>Amanda Roscoe</div>
          <div className='box-para'>My landlord doesn't want to return the...</div>
          </div>
          </div>
          <div className='col-sm-2 no-padding'>
          <div className='box-details-options'>
          <div className='box-detail-day'>29 May</div>
          <div className=''>18:21</div>
          </div>
          </div>        
                    
          </div>
          <div className='row card-row'>
          <div className='col-sm-2'>
          <div className='box-image'>
          <span className='unread'></span>
         
          </div>
          </div>
          <div className='col-sm-8'>
          <div className='box-details'>
          <div className='box-name'>Amanda Roscoe</div>
          <div className='box-para'>My landlord doesn't want to return the...</div>
          </div>
          </div>
          <div className='col-sm-2 no-padding'>
          <div className='box-details-options'>
          <div className='box-detail-day'>29 May</div>
          <div className=''>18:21</div>
          </div>
          </div>        
                    
          </div>
          <div className='row card-row'>
          <div className='col-sm-2'>
          <div className='box-image'>
          <span className='unread'></span>
         
          </div>
          </div>
          <div className='col-sm-8'>
          <div className='box-details'>
          <div className='box-name'>Amanda Roscoe</div>
          <div className='box-para'>My landlord doesn't want to return the...</div>
          </div>
          </div>
          <div className='col-sm-2 no-padding'>
          <div className='box-details-options'>
          <div className='box-detail-day'>29 May</div>
          <div className=''>18:21</div>
          </div>
          </div>        
                    
          </div>
          <div className='row card-row'>
          <div className='col-sm-2'>
          <div className='box-image'>
          <span className='unread'></span>
         
          </div>
          </div>
          <div className='col-sm-8'>
          <div className='box-details'>
          <div className='box-name'>Amanda Roscoe</div>
          <div className='box-para'>My landlord doesn't want to return the...</div>
          </div>
          </div>
          <div className='col-sm-2 no-padding'>
          <div className='box-details-options'>
          <div className='box-detail-day'>29 May</div>
          <div className=''>18:21</div>
          </div>
          </div>        
                    
          </div>
          <Link to='/main/dashboardmaster/enquiries'> <span id='xyz' className='see-all'>SEE ALL</span></Link>
          </div>
          </div>
          <div className='col-sm-4'>
          <div className='dashboard-mini-box'>
          <div className='mini-box-heading'>
          Consultations
          </div>
          <div className='row card-row'>
          <div className='col-sm-2'>
          <div className='box-image'>
          <span className='unread'></span>
         
          </div>
          </div>
          <div className='col-sm-8'>
          <div className='box-details'>
          <div className='box-name'>Amanda Roscoe</div>
          <div className='box-para'>My landlord doesn't want to return the...</div>
          </div>
          </div>
          <div className='col-sm-2 no-padding'>
          <div className='box-details-options'>
          <div className='box-detail-day'>29 May</div>
          <div className=''>18:21</div>
          </div>
          </div>        
                    
          </div>
          <div className='row card-row'>
          <div className='col-sm-2'>
          <div className='box-image'>
          <span className='unread'></span>
         
          </div>
          </div>
          <div className='col-sm-8'>
          <div className='box-details'>
          <div className='box-name'>Amanda Roscoe</div>
          <div className='box-para'>My landlord doesn't want to return the...</div>
          </div>
          </div>
          <div className='col-sm-2 no-padding'>
          <div className='box-details-options'>
          <div className='box-detail-day'>29 May</div>
          <div className=''>18:21</div>
          </div>
          </div>        
                    
          </div>
          <div className='row card-row'>
          <div className='col-sm-2'>
          <div className='box-image'>
          <span className='unread'></span>
         
          </div>
          </div>
          <div className='col-sm-8'>
          <div className='box-details'>
          <div className='box-name'>Amanda Roscoe</div>
          <div className='box-para'>My landlord doesn't want to return the...</div>
          </div>
          </div>
          <div className='col-sm-2 no-padding'>
          <div className='box-details-options'>
          <div className='box-detail-day'>29 May</div>
          <div className=''>18:21</div>
          </div>
          </div>        
                    
          </div>
          <div className='row card-row'>
          <div className='col-sm-2'>
          <div className='box-image'>
          <span className='unread'></span>
         
          </div>
          </div>
          <div className='col-sm-8'>
          <div className='box-details'>
          <div className='box-name'>Amanda Roscoe</div>
          <div className='box-para'>My landlord doesn't want to return the...</div>
          </div>
          </div>
          <div className='col-sm-2 no-padding'>
          <div className='box-details-options'>
          <div className='box-detail-day'>29 May</div>
          <div className=''>18:21</div>
          </div>
          </div>        
                    
          </div>
          <div className='row card-row'>
          <div className='col-sm-2'>
          <div className='box-image'>
          <span className='unread'></span>
         
          </div>
          </div>
          <div className='col-sm-8'>
          <div className='box-details'>
          <div className='box-name'>Amanda Roscoe</div>
          <div className='box-para'>My landlord doesn't want to return the...</div>
          </div>
          </div>
          <div className='col-sm-2 no-padding'>
          <div className='box-details-options'>
          <div className='box-detail-day'>29 May</div>
          <div className=''>18:21</div>
          </div>
          </div>        
                    
          </div>
          <Link to='/main/dashboardmaster/enquiries'> <span id='xyz' className='see-all'>SEE ALL</span></Link>
         
          </div>
          </div>
          </div>
          </div> */}

      </div>
    );
  }

}
export default Appointment