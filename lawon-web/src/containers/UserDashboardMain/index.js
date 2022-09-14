import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { PieChart, Pie, LineChart, XAxis, YAxis, Legend, Tooltip, Line, ResponsiveContainer, Cell } from 'recharts';
import { connect } from 'react-redux';
import { ChatBubbleOutlineOutlined, PermDeviceInformationOutlined, WorkOutlineOutlined } from '@material-ui/icons';
import { Select, MenuItem, createMuiTheme, ThemeProvider, CircularProgress } from '@material-ui/core';

import { Button, TYPES } from '../../components/atoms/YellowButton';
import * as actions from '../../actions/user/dashboard';
import { EmptyList } from '../../components/molecules/NotFound/EmptyView';

const COLORS = ['#feb41b', '#c0c0c0', '#FF0000'];

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#feb41c',
    }
  },
  typography: {
    htmlFontSize: 11
  }
});

class UserDashboardMain extends Component {
  componentDidMount() {
    const { getEnqueryState, getConsultationState, getInstructionState, getHistory, getUpcomingEvents, getActivities } = this.props;
    getEnqueryState();
    getConsultationState();
    getInstructionState();
    getHistory();
    getUpcomingEvents();
    getActivities();
  }

  setHistoryFilter = ({ target: { value }}) => {
    const { setHistoryFilter, getHistory } = this.props;

    setHistoryFilter({ year: value });
    getHistory();
  }

  render() {
    const { enquiry, consultation, instruction, history, upcomingEvents, userActivites } = this.props;
    const { state: enquertStats } = enquiry || {};
    const { consultationState } = consultation || {};
    const { instructionState } = instruction || {};
    const { historyStats, year } = history || {};
    const { events } = upcomingEvents || {};
    const { activities = [] } = userActivites || {};
    const showEmptyHistory = !historyStats.some(({ Enquiry, Consultation, Instructions }) => (Enquiry || Consultation || Instructions));

    const { user } = this.props;
    const { firstName } = user || {};
    return (
      <ThemeProvider theme={theme}>
        <div className='user-main-content'>
          <div className='container-fluid user-dashboard-main'>

            <div className='col-md-12' style={{marginTop:'30px'}}>
              <div class="dashboard-main-heading">Welcome back, {firstName}</div>
              <div className='row'>
                <div className='col-md-6'>
                  <p className='form-para'>How can we help you today?</p>
                </div>
                <div className='col-md-6' style={{position:'relative',top:'-24px'}}>
                  <div className='user-dashboard-btns'>
                    <Link to='/main/askalawyer'>
                      <Button
                        text='Ask the Lawyer'
                        type='button'
                        onClick={() => { }}
                        buttonType={TYPES.YellowGeneric}
                      />
                    </Link>
                    <Link to='/main/userbookconsultation'>
                      <Button
                        text='Book a consultation'
                        type='button'
                        onClick={() => { }}
                        buttonType={TYPES.TopDashbord}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-md-12 no-padding'>
              <div className='col-md-4'>

                <div className='upcoming-event-box'>
                  <div class="right-side-bold-yellow">Upcoming events</div>
                  {(!events || !events.length)
                    && (
                      <EmptyList>
                        No Upcoming Events
                    </EmptyList>
                    )}
                  {
                    events.map(({ startTime, Lawyer }) => {
                      const { firstName, lastName } = Lawyer || {};
                      return (
                        <div className='row user-event-row'>
                          <div className='col-md-4 pr0'>
                            <div className='user-event-date'>{moment(startTime).format('DD MMMM YYYY')}</div>
                            <div className='user-event-time'>{moment(startTime).format('HH:mm')}</div>
                          </div>
                          <div className='col-md-7'>
                            <div className='user-event-title'>Consultation with {firstName} {lastName}</div>
                          </div>
                          <div className='col-md-1'>
                            <div className='user-event-arrow'>
                              <i className='fa fa-angle-right'></i>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>

                <div className='upcoming-event-box'>
                  <div class="right-side-bold-yellow">Recent Activities</div>
                  {activities.map(({ createdAt, description, Lawyer }) => {
                    const { firstName, lastName } = Lawyer || {};
                    return (
                      <div className='row user-activity-row'>
                        <div className='col-md-12'>
                          <div className='user-event-time'>{moment(createdAt).format('DD/MM/YYYY, HH:mm')}  </div>
                          <div className='user-event-title'>{description.replace('{{lawyer}}', `${firstName} ${lastName}`)}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className='col-md-8'>
                <div className='user-progress-section'>
                  <div className='row'>
                    <div className='col-md-4'>
                      <div className='user-progress-box'>
                        <Link to='/main/userallquestions'>
                          <div class="right-side-bold-yellow">Questions Asked</div>
                        </Link>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'center'
                        }}>
                          <ChatBubbleOutlineOutlined
                            style={{
                              position: 'absolute',
                              top: '36%',
                              fontSize: 'xxx-large',
                              color: '#c0c0c0'
                            }}
                          />
                          <PieChart width={150} height={150} margin={0}>
                            <Pie
                              data={enquertStats}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              innerRadius={55}
                              outerRadius={60}>
                              {enquertStats.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index]} />)}
                            </Pie>
                          </PieChart>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                            <div>{enquertStats.reduce((a, b) => a + (b.value || 0), 0)}</div>
                            <div style={{ color: '#feb41b', fontWeight: 'bold', fontSize: 12 }}>Questions</div>
                          </div>
                          {
                            enquertStats.map(({ name, value }) => (
                              <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                <div>{value}</div>
                                <div style={{ color: '#feb41b', fontWeight: 'bold', fontSize: 12 }}>{name}</div>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    </div>

                    <div className='col-md-4'>
                      <div className='user-progress-box'>
                        <Link to='/main/userallconsultations'>
                          <div class="right-side-bold-yellow">Consultations Booked</div>
                        </Link>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'center'
                        }}>
                          <PermDeviceInformationOutlined
                            style={{
                              position: 'absolute',
                              top: '36%',
                              fontSize: 'xxx-large',
                              color: '#c0c0c0'
                            }}
                          />
                          <PieChart width={150} height={150} margin={0}>
                            <Pie
                              data={consultationState}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              innerRadius={55}
                              outerRadius={60}>
                              {consultationState.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index]} />)}
                            </Pie>
                          </PieChart>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                            <div>{consultationState.reduce((a, b) => a + (b.value || 0), 0)}</div>
                            <div style={{ color: '#feb41b', fontWeight: 'bold', fontSize: 12 }}>Consultations</div>
                          </div>
                          {
                            consultationState.map(({ name, value }) => (
                              <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                <div>{value}</div>
                                <div style={{ color: '#feb41b', fontWeight: 'bold', fontSize: 12 }}>{name}</div>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    </div>

                    <div className='col-md-4'>
                      <div className='user-progress-box'>
                        <Link to='/main/userallinsturctions'>
                          <div class="right-side-bold-yellow">Instructions Made</div>
                        </Link>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'center'
                        }}>
                          <WorkOutlineOutlined
                            style={{
                              position: 'absolute',
                              top: '36%',
                              fontSize: 'xxx-large',
                              color: '#c0c0c0'
                            }}
                          />
                          <PieChart width={150} height={150} margin={0}>
                            <Pie
                              data={instructionState}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              innerRadius={55}
                              outerRadius={60}>
                              {instructionState.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index]} />)}
                            </Pie>
                          </PieChart>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                            <div>{instructionState.reduce((a, b) => a + (b.value || 0), 0)}</div>
                            <div style={{ color: '#feb41b', fontWeight: 'bold', fontSize: 12 }}>Instructions</div>
                          </div>
                          {
                            instructionState.map(({ name, value }) => (
                              <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                <div>{value}</div>
                                <div style={{ color: '#feb41b', fontWeight: 'bold', fontSize: 12 }}>{name}</div>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-12'>
                      <div className='user-progress-box activity-history'>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div class="right-side-bold-yellow">Your Activity History</div>
                          <Select
                            value={year}
                            onChange={this.setHistoryFilter}
                            disableUnderline
                            MenuProps={{
                              PaperProps: {
                                style: { width: 70 }
                              }
                            }}>
                            {
                              [
                                moment().add(-1, 'year').format('YYYY'),
                                moment().format('YYYY'),
                                moment().add(1, 'year').format('YYYY')
                              ]
                                .map((year) => <MenuItem key={year} value={year}>{year}</MenuItem>)
                            }
                          </Select>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
                          {
                            showEmptyHistory
                              ? <EmptyList>No Activity Found</EmptyList>
                              : (
                                <ResponsiveContainer width="99%" aspect={3}>
                                  <LineChart
                                    data={historyStats}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="Enquiry" stroke="#688434" activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="Consultation" stroke="#8884d8" activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="Instructions" stroke="#82ca9d" activeDot={{ r: 8 }} />
                                  </LineChart>
                                </ResponsiveContainer>
                              )
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { auth, dashboard } = user || {};

  return {
    ...auth,
    ...dashboard
  }
}
export default connect(mapStateToProps, actions)(UserDashboardMain);