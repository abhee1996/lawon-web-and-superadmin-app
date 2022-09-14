import React, { Component } from "react";
import LoadingBar from "react-top-loading-bar";
import { connect } from "react-redux";
import moment from "moment";
import _ from "lodash";
// import { round } from 'loadash';
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import { Input } from "../../components/atoms/InputField";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap/dist/css/bootstrap.css";
// you will also need the css that comes with bootstrap-daterangepicker
import "bootstrap-daterangepicker/daterangepicker.css";

import { Dialog, DialogContent } from "@material-ui/core";
import { Button, TYPES } from "../../components/atoms/YellowButton";
import Popup from "../../components/molecules/ErrorPopup";
import * as actions from "../../actions/user/transectionHistory";

class UserPaymentDetails extends Component {
  state = { dialogOpen: false, searchData: "" };

  componentDidMount() {
    const { userTransectionHistory } = this.props;
    userTransectionHistory();
  }

  componentWillReceiveProps(nextProps) {
    const { loading, errorMessage, clearError } = nextProps;
    const { history } = this.props;

    if (loading) {
      this.LoadingBar.continuousStart();
    } else {
      this.LoadingBar.complete();
    }

    if (errorMessage) {
      this.popup.setState({
        dialogOpen: true,
        message: errorMessage,
      });
      clearError();
    }
  }

  openModal = () => {
    this.setState({ dialogOpen: true });
  };

  closeModal = () => {
    this.setState({ dialogOpen: false });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  applyFilter = () => {
    const { searchData } = this.state;
    const { userTransectionHistoryFilter } = this.props;
    userTransectionHistoryFilter({ searchData });
  };

  render() {
    const { alltransection } = this.props;
    const { count, rows = [] } = alltransection || [];
    const { dialogOpen } = this.state;
    return (
      <div className="user-main-content">
        <LoadingBar
          onRef={(ref) => (this.LoadingBar = ref)}
          height={3}
          color="#feb41c"
        />
        <div className="container">
          <h1>Payment History</h1>
          <br />
          <div className="col-md-12">
            <div className="row">
              <div
                className="col-md-4"
                style={{ marginLeft: "0px", paddingLeft: "0px" }}
              >
                <Input
                  type="text"
                  name="searchData"
                  placeholder="Search Records"
                  onChange={this.handleChange}
                />
              </div>

              <div className="col-md-3">
                <DateRangePicker>
                  <input
                    style={{ width: "120%" }}
                    class="form-control"
                    type="text"
                    placeholder="01/01/2019 - 01/15/2019"
                  />
                </DateRangePicker>
              </div>
              <div className="col-md-3">
                <Button
                  text="Apply"
                  type="button"
                  onClick={() => this.applyFilter()}
                  buttonType={TYPES.Generic}
                />
              </div>
            </div>
          </div>

          <div
            className="user-all-con-table col-md-12"
            style={{ paddingTop: "30px" }}
          >
            <div className="row user-con-table-head">
              <div className="col-md-2">Title</div>
              <div className="col-md-2">Category</div>
              <div className="col-md-2">Firm Name</div>
              <div className="col-md-2">Type</div>
              <div className="col-md-1">Amount</div>
              <div className="col-md-1">Status</div>
              <div className="col-md-2">Date & Time </div>
            </div>
            <div className="row user-con-table-body">
              {rows.map(({ amount, createdAt, Instruction }, index) => {
                const amountTotal = _.round(amount, 0).toFixed(2);
                const { Lawyer } = Instruction || {};
                const { Organization } = Lawyer || {};
                const { name = "" } = Organization;

                return (
                  <div
                    className="col-md-12 no-padding user-con-table-detail"
                    onClick={this.openModal}
                    key={index}
                  >
                    <div className="col-md-2 right-side-dark-para">
                      Having problem with property
                    </div>
                    <div className="col-md-2"> Property </div>
                    <div className="col-md-2">{name} </div>
                    <div className="col-md-2">AWE Solictor </div>
                    <div className="col-md-1"> $ {amountTotal} </div>
                    <div className="col-md-1">ACTIVE </div>
                    <div className="col-md-2">
                      {moment(createdAt).format("LL")}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <br />
          <br />
          <div
            className="col-md-4 col-md-offset-4"
            style={{ marginTop: "30px" }}
          >
            {count > 4 && <Pagination count={10} color="primary" />}
          </div>
        </div>
        <Popup ref={(ref) => (this.popup = ref)} />
        <>
          <Dialog
            onClose={this.closeModal}
            open={dialogOpen}
            fullWidth={true}
            maxWidth={"md"}
          >
            <DialogContent>
              <div className="notification-dialog">
                <h3 className="text-center pt-4">
                  Having Problem With Property
                </h3>
                <TableContainer>
                  <Table aria-label="simple table" style={{ fontSize: "20px" }}>
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Payment
                        </TableCell>
                        <TableCell align="right"> 1500 </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Channel
                        </TableCell>
                        <TableCell align="right"> Stripe </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Status
                        </TableCell>
                        <TableCell align="right">
                          <span style={{ color: "red" }}>Completed</span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Date
                        </TableCell>
                        <TableCell align="right"> 2/02/2020</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Case #
                        </TableCell>
                        <TableCell align="right"> PVR - 146</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Firm Name
                        </TableCell>
                        <TableCell align="right"> MindsLab</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Lawyer
                        </TableCell>
                        <TableCell align="right"> John Do</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Button
                  text="More Details"
                  type="button"
                  onClick={() => this.closeModal()}
                  buttonType={TYPES.Generic}
                />
              </div>
            </DialogContent>
          </Dialog>
        </>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { transectionHistory } }) => {
  return {
    ...transectionHistory,
  };
};

export default connect(
  mapStateToProps,
  actions
)(UserPaymentDetails);
