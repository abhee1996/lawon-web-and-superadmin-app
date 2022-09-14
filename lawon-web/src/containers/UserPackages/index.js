import React, { Component } from 'react';
import { Switch, Backdrop, CircularProgress } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { round } from 'lodash';

import { Button, TYPES } from '../../components/atoms/YellowButton'
import Footer from '../../components/molecules/footer'
import { connect } from 'react-redux'
import queryString from "query-string";

import * as actions from '../../actions/plans';

const Theme = createMuiTheme({
  palette: {
    primary: { main: '#feb41d' },
    secondary: { main: '#fafafa' }
  }
});

class UserPackages extends Component {
  state = {
    planInterval: 'month'
  }

  componentDidMount() {
    const { getPlans } = this.props;
    getPlans();
  }

  handleChangePlanType = ({ target: { checked } }) => {
    this.setState({ planInterval: checked ? 'year' : 'month' });
  }

  toggleCollapse = (e) => () => {
    if (this.state.id == e) {
      this.setState({ id: 0 });
    }
    else {
      this.setState({ id: e });
    }
  }

  render() {
    const { plans = [], loading, history } = this.props;
    const { planInterval } = this.state;
    const filteredPlan = plans.filter(({ interval }) => interval === planInterval);

    return (
      <div className="user-main-content-consultation">
        <div className="container">
          <div className='package-upper text-center'>
            <div className='package-upper-head'>
              Pricing
            </div>
            <div className='package-upper-subhead'>
              Find the right plan for you!
            </div>
            <div className='mini-hr-line'></div>
            <div>
              <span className={planInterval === 'month' && "active-filter"}>Monthly</span>
              <span>
                <MuiThemeProvider theme={Theme}>
                  <Switch
                    onChange={this.handleChangePlanType}
                    color='primary'
                  />
                </MuiThemeProvider></span>
              <span className={planInterval === 'year' && "active-filter"}>Annually  </span>
              <span className='save-25'> - Save 20%</span>
            </div>
          </div>
          <div className='row package-boxes'>
            {filteredPlan.map((({
              id,
              metadata,
              amount,
              interval,
              trial_period_days,
              product
            }, index) => {
              const {
                noOfServices,
                noOfLawyers,
                mileRadius,
                accessToNewEnquiries,
                whatsAppCommunication,
                videoConsultation,
                lawonFeatures,
                introducerFee,
                oneTimeSetupFee
              } = metadata || {};

              const { name } = product || {};
              return (
                <div className='col-md-3' key={index}>
                  <div className='package-box'>
                    <div className='package-box-img'>
                      <img src={require('../../assets/img/pkg-icon.png')} alt='plan logo' />
                    </div>
                    <div className='package-box-head'>{name}</div>
                    <div className='mini-hr-line'></div>
                    <div className='package-lines'>

                      <div className='package-line-row'>
                        <span><i className='fa fa-check'></i></span>
                        <span className='package-line-row-text'>
                          {noOfLawyers} Lawyer
                          </span>
                      </div>

                      <div className='package-line-row'>
                        <span><i className='fa fa-check'></i></span>
                        <span className='package-line-row-text'>
                          {noOfServices} Area of Law (private)
                          </span>
                      </div>

                      <div className='package-line-row'>
                        <span><i className='fa fa-check'></i></span>
                        <span className='package-line-row-text'>
                          {mileRadius} Mile radius
                          </span>
                      </div>

                      <div className='package-line-row'>
                        <span><i className='fa fa-check'></i></span>
                        <span className='package-line-row-text'>
                          £ {round(oneTimeSetupFee, 2).toFixed(0)} One time setup fee
                          </span>
                      </div>

                      <div className='package-line-row'>
                        <span><i className='fa fa-check'></i></span>
                        <span className='package-line-row-text'>
                          £ {round(introducerFee, 2).toFixed(0)} Introducer fee
                          </span>
                      </div>

                      {
                        accessToNewEnquiries === 'true'
                        && (
                          <div className='package-line-row'>
                            <span><i className='fa fa-check'></i></span>
                            <span className='package-line-row-text'>
                              Access to New Enquiries via LawOn features
                              </span>
                          </div>
                        )
                      }

                      {
                        whatsAppCommunication
                        && (
                          <div className='package-line-row'>
                            <span><i className='fa fa-check'></i></span>
                            <span className='package-line-row-text'>
                              Whatsapp style communication with
                              clients (end-to-end encryption)
                              </span>
                          </div>
                        )
                      }

                      {
                        videoConsultation
                        && (
                          <div className='package-line-row'>
                            <span><i className='fa fa-check'></i></span>
                            <span className='package-line-row-text'>
                              Video Consultation with new clients
                              </span>
                          </div>
                        )
                      }

                      {
                        lawonFeatures
                        && (
                          <div className='package-line-row'>
                            <span><i className='fa fa-check'></i></span>
                            <span className='package-line-row-text'>
                              Use LawOn’s features with your existing clients
                              </span>
                          </div>
                        )
                      }

                      {
                        trial_period_days
                        && (
                          <div className='package-line-row'>
                            <span><i className='fa fa-check'></i></span>
                            <span className='package-line-row-text'>
                              {trial_period_days} Days free trial
                              </span>
                          </div>
                        )
                      }
                    </div>

                    <div className='pkg-btn-btm'>
                      <div className='pkg-price'>
                        <span className='pound'>£</span>
                        <span className='bold-price'>{round(amount / 100, 2).toFixed(1)}</span>
                        <span> / {interval}</span>
                      </div>
                      <Button
                        text='Start Free Trial'
                        type='button'
                        onClick={() => history.push(`/main/register/?planid=${id}`)}
                        buttonType={TYPES.TopDashbord}
                      />
                    </div>
                  </div>
                </div>
              )
            }
            ))}

            <div className='col-md-3'>
              <div className='package-box'>
                <div className='package-box-img'>
                  <img src={require('../../assets/img/pkg-icon.png')} />
                </div>
                <div className='package-box-head'>Bespoke</div>
                <div className='mini-hr-line'></div>
                <div className='package-lines'>
                  <div className='package-line-row'>
                    <span>
                      <i className='fa fa-check'></i>
                    </span>
                    <span className='package-line-row-text'>
                      Upto 20 Lawyers
                      </span>
                  </div>

                  <div className='package-line-row'>
                    <span>
                      <i className='fa fa-check'></i>
                    </span>
                    <span className='package-line-row-text'>
                      Upto all Areas of Law (personal &
                       business)
                      </span>
                  </div>

                  <div className='package-line-row'>
                    <span>
                      <i className='fa fa-check'></i>
                    </span>
                    <span className='package-line-row-text'>
                      Upto National radius
                      </span>
                  </div>


                  <div className='package-line-row'>
                    <span>
                      <i className='fa fa-check'></i>
                    </span>
                    <span className='package-line-row-text'>
                      Access to New Enquiries
                      </span>
                  </div>


                  <div className='package-line-row'>
                    <span>
                      <i className='fa fa-check'></i>
                    </span>
                    <span className='package-line-row-text'>
                      Whatsapp style communication with
                       clients (end-to-end encryption)
                </span>
                  </div>
                  <div className='package-line-row'>
                    <span>
                      <i className='fa fa-check'></i>
                    </span>
                    <span className='package-line-row-text'>
                      Video Consultation with new clients
                </span>
                  </div>
                  <div className='package-line-row'>
                    <span>
                      <i className='fa fa-check'></i>
                    </span>
                    <span className='package-line-row-text'>
                      Use LawOn’s features with your
                     existing clients

                </span>
                  </div>
                </div>

                <div className='pkg-btn-btm'>

                  <Button
                    text='Enquire Now'
                    type='button'
                    onClick={() => this.saveLawyerPlan(4)}
                    buttonType={TYPES.TopDashbord}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="FAQs">
          <div className="question-sec">
            <div className="mini-hr-line"></div>
            <div className="row no-margin" >
              <div className="col-md-6 col-md-offset-3 heading margin-bottom">
                Frequently asked questions
                        </div>
              <div className="col-md-8 col-md-offset-2">
                <div className="margin">
                  <div className="accordion-head">{this.state.id == 1 ? <div className=" minus" onClick={this.toggleCollapse(1)}> <img className="image-minus" src="/images/-.png" /> </div> : <div className="plus" onClick={this.toggleCollapse(1)}><img className="image-plus" src="/images/+.png" /></div>}
                    Who will be providing me with legal advice?</div>
                  {this.state.id == 1 ?
                    <div className=" panel-accordion ">
                      <p>LawOn is a legal advice service that helps you track down a good lawyer and provides useful answers
                          to burning legal questions. LawOn will be available on android, iOS mobile devices and on any desktop
                          via internet browser. LawOn is a free legal advice service. Submit your law question, receive answers,
                                         consult with local lawyers, and choose the best lawyer to represent you. Job done!</p>
                    </div> : <div></div>}
                </div>
                <div className="margin">
                  <div className="accordion-head">{this.state.id == 2 ? <div className=" minus" onClick={this.toggleCollapse(2)}> <img className="image-minus" src="/images/-.png" /> </div> : <div className="plus" onClick={this.toggleCollapse(2)}><img className="image-plus" src="/images/+.png" /></div>}
                    Who will be providing me with legal advice?</div>
                  {this.state.id == 2 ?
                    <div className=" panel-accordion ">
                      <p>LawOn is a legal advice service that helps you track down a good lawyer and provides useful answers
                          to burning legal questions. LawOn will be available on android, iOS mobile devices and on any desktop
                          via internet browser. LawOn is a free legal advice service. Submit your law question, receive answers,
                                         consult with local lawyers, and choose the best lawyer to represent you. Job done!</p>
                    </div> : <div></div>}
                </div>
                <div className="margin">
                  <div className="accordion-head">{this.state.id == 3 ? <div className=" minus" onClick={this.toggleCollapse(3)}> <img className="image-minus" src="/images/-.png" /> </div> : <div className="plus" onClick={this.toggleCollapse(3)}><img className="image-plus" src="/images/+.png" /></div>}
                    Who will be providing me with legal advice?</div>
                  {this.state.id == 3 ?
                    <div className=" panel-accordion ">
                      <p>LawOn is a legal advice service that helps you track down a good lawyer and provides useful answers
                          to burning legal questions. LawOn will be available on android, iOS mobile devices and on any desktop
                          via internet browser. LawOn is a free legal advice service. Submit your law question, receive answers,
                                         consult with local lawyers, and choose the best lawyer to represent you. Job done!</p>
                    </div> : <div></div>}
                </div>
                <div className="margin">
                  <div className="accordion-head">{this.state.id == 4 ? <div className=" minus" onClick={this.toggleCollapse(4)}> <img className="image-minus" src="/images/-.png" /> </div> : <div className="plus" onClick={this.toggleCollapse(4)}><img className="image-plus" src="/images/+.png" /></div>}
                    Who will be providing me with legal advice?</div>
                  {this.state.id == 4 ?
                    <div className=" panel-accordion ">
                      <p>LawOn is a legal advice service that helps you track down a good lawyer and provides useful answers
                          to burning legal questions. LawOn will be available on android, iOS mobile devices and on any desktop
                          via internet browser. LawOn is a free legal advice service. Submit your law question, receive answers,
                                         consult with local lawyers, and choose the best lawyer to represent you. Job done!</p>
                    </div> : <div></div>}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
        <Backdrop open={loading} style={{ zIndex: '100', color: '#fff' }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>

    );
  }
}

const mapStateToProps = ({ plans }) => ({ ...plans });

export default connect(mapStateToProps, actions)(UserPackages);