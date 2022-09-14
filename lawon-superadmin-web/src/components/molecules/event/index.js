import React, { Component } from 'react';
export const EventCard = ({props}) => {
    return (  

      <div className="event-card">
       <div className='event-time'>12:45</div>
       <div className='event-date'>19 May 2019</div>
       <div className='event-title'>Consultation with Adnan Patel</div>
       <div className="event-media">video</div>
       <div className="event-attachment">
       <span><i class="fa fa-paperclip"></i></span>
       <span>2 attachments</span>
       </div>
      </div>
)
}

export default EventCard;
