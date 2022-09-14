import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class AskALawyerConfirm extends Component {
  render() {
    const { askQuestion } = this.props;
    const { selectedSubcategory } = askQuestion || {};
    const { name } = selectedSubcategory || {};
    if (!selectedSubcategory) {
      window.location = '#/main/userallquestions';
    }

    return (
      <div className="user-main-content-consultation">
        <div className="container">
          <div className="add-details-box confirm-instruct">
            <div className="row add-details-btm-sec">
              <h2 class="text-center">
                Your question has been sent to {name} lawyers
              </h2>

              <div className="instruct-confirm-details text-center">
                <p>
                  Now relax and wait for lawyers to respond. It should take no
                  longer than 2 hours. We will notify you when a lawyer
                  responds. All answers will show up your dashboard
                </p>
              </div>
               <Link to='/main/userdashboardmain'>
               <div className="text-center right-side-bold-yellow pt40">
                GO BACK TO DASHBOARD
              </div>
               </Link>
             
               <div className="download-app-sec">
                    <div
                     style={{fontSize:'18px'}}
                    >Download the app</div>
                     <p>
                       For the full lawOn experience, and access to
                       <br/>
                       all our features, download the app today.
                     </p>

                     <div 
                         style={{padding:'18px 0'}}
                     >
                       <p>

                         - Ask questions on the spot
                         <br/>
                         - Book consultations from your sofa
                         <br/>
                         - Talk to your lawyer via chat or video
                       </p>
                     </div>

                     <div>
                     <img
                     style={{marginRight:'10px'}}
                        className=""
                        width='150'
                        height=''
                        src={require("../../assets/img/download-ap.png")}
                      />
                            <img
                             width='150'
                             height=''
                        className=""
                        src={require("../../assets/img/download-g.png")}
                      />
                     </div>
                    </div>
            </div>
          </div>
        </div>

        <div className="bottom-blacknav">
          <div className="text-center">
            <span className="float-left">
              <i className="fa fa-chevron-left"></i>
              Back
            </span>
            <span>
              Category <i className="fa fa-chevron-right"></i>
            </span>
            <span>
              Question
              <i className="fa fa-chevron-right"></i>
            </span>
            <span>
              <span style={{ color: "#FEB41C" }}>Confirmation</span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { questions } = user || {};
  return {
    ...questions
  };
};

export default connect(mapStateToProps)(AskALawyerConfirm);
