
import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class WelcomeToLawon extends Component {
  state = {

  };


  render() {

    return (
      <div className='container'>
        <div className='row'>
          <div className='static-content'>
            <div className='col-sm-8 col-sm-offset-2'>
              <h1 class="text-center">Welcome to Lawon!</h1>
              <p className='static-content-para'>
                Good choice. We're glad you've taken the first step in joining
                 the forefront of digital legal services.
                  Get ready to improve the way you deal with new enquiries.
    </p>
              <p className='static-content-para'>
                At LawOn, we aim to promote the
                solicitors' profession and quality legal advice,
                so we just need to take a
                 little information about you and your firm
    </p>

              <h2 className='text-center'>To-do List</h2>
              <Link to='/main/adminprofilesetup'>
                <div className='to-do-list-block col-sm-12 no-padding'>

                  <div className='col-sm-2 no-padding'>
                    <div className='task-left text-center'>
                      TASK
             <br />
                      <strong>1</strong>
                    </div>
                  </div>
                  <div className='col-sm-10 no-padding'>
                    <div className='task-right'>
                      <div className='task-head'>Complete Admin Profile</div>
                      <div className='task-subhead'>Tell us your name to get started</div>
                    </div>
                  </div>

                </div>
              </Link>


              <div className='to-do-list-block col-sm-12 no-padding'>

                <div className='col-sm-2 no-padding'>
                  <div className='task-left text-center'>
                    TASK
            <br />
                    <strong>2</strong>
                  </div>
                </div>
                <div className='col-sm-10 no-padding'>
                  <div className='task-right'>
                    <div className='task-head'>Complete your Firm Profile</div>
                    <div className='task-subhead'>We'll need a few quick details about your firm and which practice areas you would like to advise on.</div>
                  </div>
                </div>

              </div>

              <div className='to-do-list-block col-sm-12 no-padding'>

                <div className='col-sm-2 no-padding'>
                  <div className='task-left text-center'>
                    TASK
            <br />
                    <strong>3</strong>
                  </div>
                </div>
                <div className='col-sm-10 no-padding'>
                  <div className='task-right'>
                    <div className='task-head'>Add Lawyers</div>
                    <div className='task-subhead'>You can come back to this step later from your LawOn account</div>
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

export default WelcomeToLawon;
