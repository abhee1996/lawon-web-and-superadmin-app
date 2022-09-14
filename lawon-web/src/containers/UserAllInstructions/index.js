import React, { Component } from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import { Pagination } from '@material-ui/lab';
import {
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  createMuiTheme,
  MuiThemeProvider,
  IconButton,
  Menu
} from '@material-ui/core';

import { Refresh, ExpandMore } from '@material-ui/icons';
import * as actions from '../../actions/user/instruction';


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

const allStatus = ['Active', 'Closed'];

class UserAllInsturctions extends Component {
  state = {
    open: false,
    displayMenu: false,
    anchorEl: null,
    selectedIndex: ''
  };

  componentDidMount() {
    const { getInstructions } = this.props;
    getInstructions();
  }

  handlePageNo = (page) => {
    const { setPage, getInstructions } = this.props;

    setPage({ page });
    getInstructions();
  }

  handleSetStatusFilter = ({ target: { value }}) => {
    const { setPage, getInstructions, setStatusFilter } = this.props;

    setPage({ page: 1 });
    setStatusFilter({ status: value });
    getInstructions();
  }

  handleClick = ({ currentTarget }, index) => {
    this.setState({
      anchorEl: currentTarget,
      selectedIndex: index
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
      selectedIndex: ''
    });
  };

  render() {
    const { anchorEl, selectedIndex } = this.state;
    const { instructions = [], history, pagination, total, getInstructions } = this.props;
    const { page, pageSize } = pagination || {};
    const maxPage = Math.ceil(total / pageSize);
    return (
      <MuiThemeProvider theme={theme}>
        <div className="user-main-content">
          <div className="container">
            <h1>Instructions</h1>
            <div className="user-con-filter page-extras">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FormControl variant="outlined" style={{ width: '110px' }} size='small'>
                  <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                  <Select
                    onChange={this.handleSetStatusFilter}
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Status">
                    <MenuItem value='all'>All</MenuItem>
                    <MenuItem value={1}>Active</MenuItem>
                    <MenuItem value={2}>Closed</MenuItem>
                  </Select>
                </FormControl>
                <IconButton
                  onClick={getInstructions}
                  style={{ marginLeft: '5px' }}>
                  <Refresh />
                </IconButton>
              </div>
            </div>

            <div className="user-all-con-table col-md-12">
              <div className="row user-con-table-head">
                <div className="col-md-2">Lawyer</div>
                <div className="col-md-2">Firm</div>
                <div className="col-md-2">Date</div>
                <div className="col-md-2">Fee</div>
                <div className="col-md-2">Status</div>
              </div>
              <div className="row user-con-table-body">
                {
                  instructions.map(({ id, Lawyer, createdAt, fee, status }, index) => {
                    const { firstName, lastName, Organization } = Lawyer || {};
                    const { name } = Organization || {};
                    return (
                      <div
                        className="col-md-12 no-padding user-con-table-detail">
                        <div className="col-md-2 right-side-dark-para"><b>{firstName} {lastName}</b></div>
                        <div className="col-md-2">{name}</div>
                        <div className="col-md-2">{moment(createdAt).format('DD/MM/YYYY, HH:mm')}</div>
                        <div className="col-md-2 right-side-bold-yellow">£{fee}</div>
                        <div className="col-md-2">{allStatus[status - 1]}</div>
                        <div className="col-md-1 user-con-angle-down" style={{ float: 'right' }}>
                          <IconButton
                            style={{ padding: '1px' }}
                            aria-owns={Boolean(anchorEl) ? id : undefined}
                            aria-haspopup="true"
                            onClick={(e) => this.handleClick(e, index)}>
                            <ExpandMore />
                          </IconButton>
                        </div>
                        <Menu
                          id={id}
                          anchorEl={anchorEl}
                          open={index === selectedIndex}
                          onClose={this.handleClose}
                          PaperProps={{
                            style: {
                              width: 150
                            },
                          }}>
                          <MenuItem
                            key={1}
                            onClick={() => history.push(`/main/user/instructions/details/${id}`)}>
                            View Instruction
                          </MenuItem>
                        </Menu>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
          <Pagination
              page={page}
              count={maxPage}
              shape="rounded"
              color='primary'
              onChange={(e, page) => this.handlePageNo(page)}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateTpProps = ({ user }) => {
  const { instruction } = user || {};
  return { ...instruction };
}

export default connect(mapStateTpProps, actions)(UserAllInsturctions);
