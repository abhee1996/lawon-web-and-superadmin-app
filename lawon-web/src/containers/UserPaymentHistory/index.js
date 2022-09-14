import React, { Component } from 'react';
import moment from 'moment';
import LoadingBar from 'react-top-loading-bar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dialog, DialogContent, DialogTitle, createMuiTheme, MuiThemeProvider, TextField } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { debounce } from 'lodash';

import * as actions from '../../actions/user/payments';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#feb41c',
    }
  },
  typography: {
    htmlFontSize: 13
  }
});

class PaymentHistory extends Component {
  componentDidMount() {
    const { getPaymentHistory } = this.props;
    getPaymentHistory();
  }

  handleOnPageChange = (page) => {
    const { setPage, getPaymentHistory } = this.props;
    setPage({ page });
    getPaymentHistory();
  }

  handleOnChangeSearch = debounce(({ target: { value }}) => {
    const { setSearshFilter, getPaymentHistory } = this.props;;
    setSearshFilter({ value });
    getPaymentHistory();
  }, 400);

  render() {
    const { payments, pagination, total } = this.props;
    const { page, pageSize } = pagination || {};
    const maxPage = Math.ceil(total/pageSize);
    return (
      <MuiThemeProvider theme={theme}>
        <div className='user-main-content'>
          <LoadingBar
            onRef={ref => (this.LoadingBar = ref)}
            height={3}
            color="#feb41c"
          />
          <div className='container'>
            <h1>Payment History</h1>
            <div className='user-con-filter page-extras'>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  variant='outlined'
                  size='small'
                  label='Search'
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    e.persist();
                    this.handleOnChangeSearch(e)
                  }}
                />
              </div>
            </div>

            <div className='user-all-con-table col-md-12'>
              <div className='row user-con-table-head'>
                <div className='col-md-2'>Date/Time</div>
                <div className='col-md-2'>Category</div>
                <div className='col-md-2'>Firm Name  </div>
                <div className='col-md-2'>Lawyer Name</div>
                <div className='col-md-2'>Amount</div>
                <div className='col-md-2'>Status</div>
              </div>

              <div className='row user-con-table-body'>
                {payments.map(({ createdAt, amount, Instruction }) => {
                  const { Lawyer, SubCategory } = Instruction || {};
                  const { firstName, lastName, Organization } = Lawyer || {};
                  const { name } = Organization || {};

                  const { name: subcategoryName, Category } = SubCategory || {};
                  const { name: categoryName } = Category || {};

                  return (
                    <div className='col-md-12 no-padding user-con-table-detail'>
                      <div className='col-md-2'>{moment(createdAt).format('DD/MM/YYYY, HH:mm')}</div>
                      <div className='col-md-2'>{categoryName} / {subcategoryName}</div>
                      <div className='col-md-2'>{name}</div>
                      <div className='col-md-2'>{firstName} {lastName}</div>
                      <div className='col-md-2'>£ {amount}</div>
                      <div className='col-md-2'>Completed</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
            <Pagination
              page={page}
              count={maxPage}
              shape='rounded'
              color='primary'
              onChange={(e, page) => this.handleOnPageChange(page)}
            />
          </div>
        </div>
        <Dialog
          onClose={this.closeContact}
          aria-labelledby="customized-dialog-title"
          fullWidth={true}
          maxWidth="sm">
          <DialogTitle id="alert-dialog-title">
            <h2>Having Problem with <br /> <span>property</span>
              <br />
            </h2>
          </DialogTitle>
          <DialogContent>
            <div className="row">
              <div className='col-md-2'></div>
              <div className='col-md-3'>
                <div class='popup-head'>
                  Payment
                </div>
                <div class='popup-head'>
                  Channel
                </div>
                <div class='popup-head'>
                  Status
                </div>
                <div class='popup-head'>
                  Date
                </div>
                <div class='popup-head'>
                  Case No
                </div>
                <div class='popup-head'>
                  Firm Name
                </div>
                <div class='popup-head'>
                  Lawyer
                </div>
                <div class='popup-head'>
                  Details
                </div>
              </div>
              <div className='col-md-2'></div>
              <div className='col-md-3'>
                <div class='popup-subhead'>
                  $2323
                </div>
                <div class='popup-subhead'>
                  Stripe
                </div>
                <div class='popup-subhead green'>
                  COMPLETED
                </div>
                <div class='popup-subhead'>
                  02/23/2002
                </div>
                <div class='popup-subhead'>
                  RVR-098765432
                </div>
                <div class='popup-subhead'>
                  AWS Solictores
                </div>
                <div class='popup-subhead'>
                  John Doe
                </div>
                <div class='popup-subhead'>
                  <Link>
                    See Details</Link>
                </div>
              </div>
              <div className='col-md-2'></div>
            </div>
          </DialogContent>
        </Dialog>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { payments } = user || {}
  return { ...payments };
}

export default connect(mapStateToProps, actions)(PaymentHistory);
