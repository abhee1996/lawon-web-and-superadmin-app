import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Checkbox, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, InputBase, Divider, Button, Select, MenuItem, IconButton, createMuiTheme, ThemeProvider, Backdrop, CircularProgress } from "@material-ui/core";
import { Autocomplete, Rating } from '@material-ui/lab';
import { GpsFixed, Search, TrackChanges } from "@material-ui/icons";
import { debounce } from 'lodash'

import * as actions from "../../actions/user/userConsultation";
import MapModal from '../UserConsultationLocation/MapModal';

// eslint-disable-next-line no-undef
const autoCompleteService = new google.maps.places.AutocompleteService();
// eslint-disable-next-line no-undef
const geocoder = new google.maps.Geocoder();

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

class UserChooseLAwyer extends Component {
  state = {
    isMapModalOpen: false,
    selectedId: "",
    radius: 10,
    selectedAddress: {},
    addresses: [],
    keyword: ''
  };

  componentDidMount() {
    const { match, getLawyers } = this.props;
    const { params } = match || {};
    const { subCategoryId, placeId, radius } = params || {};


    geocoder.geocode({ placeId }, (address) => {
      const [addressHash] = address || [];
      const { geometry, formatted_address, } = addressHash || {};

      const lat = geometry.location.lat();
      const lng = geometry.location.lng();

      this.setState({
        selectedAddress: { id: placeId, description: formatted_address },
        addresses: [{ id: placeId, description: formatted_address  }],
        radius
      });

      getLawyers({
        subCategoryId,
        latlng: `${lat},${lng}`,
        radius,
      });
    });
  }

  handleSelect = ({ id }) => {
    this.setState({ selectedId: id });
  };

  handleNext = () => {
    const { history, match } = this.props;
    const { params } = match || {};
    const { categoryId, subCategoryId } = params || {};
    const { selectedId } = this.state;
    if (!selectedId) return;

    history.push(
      `/main/user/consultation/${categoryId}/${subCategoryId}/lawyers/${selectedId}/datetime`
    );
  };

  handleOpenMapModal = () => {
    this.setState({ isMapModalOpen: true });
  };

  handleSearchPlaces = debounce(({ target: { value } }) => {
    if (!value) {
      return this.setState({ addresses: [] });
    };

    autoCompleteService
      .getPlacePredictions({ input: value }, (addresses) => {
        if (!addresses || !addresses.length) {
          return this.setState({ addresses: [] });
        }

        addresses = addresses.map(({ description, place_id }) => ({
          description,
          id: place_id
        }));

        this.setState({ addresses });
      });
  }, 500);

  handleCloseMapModal = () => {
    this.setState({ isMapModalOpen: false });
  }

  handleSubmitMapModal = ({ position }) => {
    const { getAddressByLatLng } = this.props;
    this.setState({ position, isMapModalOpen: false });

    getAddressByLatLng(position).then((result) => {
      const { address } = result || {};
      const { place_id, formatted_address } = address || {};
      const selectedAddress = {
        id: place_id,
        description: formatted_address
      };

      const { addresses } = this.state;
      if (!addresses.some(({ id }) => id === place_id)) {
        addresses.push(selectedAddress);
      }

      this.setState({ addresses, selectedAddress });
    });
  }

  handleFilter = () => {
    const { match, getLawyers } = this.props;
    const { params } = match || {};
    const { subCategoryId } = params || {};

    const { selectedAddress, radius, keyword } = this.state;
    const { id } = selectedAddress || {};

    geocoder.geocode({ placeId: id }, (address) => {
      const [addressHash] = address || [];
      const { geometry } = addressHash || {};

      const lat = geometry.location.lat();
      const lng = geometry.location.lng();

      getLawyers({
        subCategoryId,
        latlng: `${lat},${lng}`,
        radius,
        keyword
      });
    });

  }

  render() {
    const { selectedId, addresses, selectedAddress, radius } = this.state;
    const { bookConsultation } = this.props;
    const { lawyers = [], loading } = bookConsultation || {};
    return (
      <ThemeProvider theme={theme}>
        <div className="user-main-content-consultation">
          <div className="container">
            <div className="add-details-box">
              <h2>Choose your lawyer</h2>
              <div>
                Select a lawyer from the list which you wish to book a
                consultation with
              </div>

              <div className="lawyer-table">
                <div className="lawyer-table-upper pos-relative">
                  <div className="lawyer-table-upper-btns">
                    <div className="ch-lawyer-location">
                      <Paper
                        variant='outlined'
                        style={{
                          padding: '2px 4px',
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                        }}>
                        <IconButton
                          size='small'
                          onClick={this.handleOpenMapModal}>
                          <GpsFixed />
                        </IconButton>
                        <Autocomplete
                          value={selectedAddress}
                          options={addresses || []}
                          getOptionLabel={(option) => option.description || ''}
                          popupIcon={false}
                          onChange={(option, value) => this.setState({ selectedAddress: value })}
                          style={{ width: '100%' }}
                          filterOptions={(options) => options}
                          onInputChange={(e) => {
                            if (e) {
                              e.persist();
                              this.handleSearchPlaces(e);
                            }
                          }}
                          renderInput={(params) =>
                            <InputBase
                              style={{ width: '100%' }}
                              placeholder='Search Location'
                              ref={params.InputProps.ref}
                              inputProps={params.inputProps}
                            />
                          }
                        />
                        <Divider
                          orientation="vertical"
                          style={{
                            height: 28,
                            margin: 4
                          }}
                        />
                        <TrackChanges style={{ color: 'rgba(0, 0, 0, 0.54)'}}/>
                        <Select
                          value={radius}
                          onChange={({ target: {value }}) =>
                            this.setState({ radius: value })}
                          disableUnderline>
                          <MenuItem value={0}>0</MenuItem>
                          <MenuItem value={10}>10</MenuItem>
                          <MenuItem value={20}>20</MenuItem>
                          <MenuItem value={30}>30</MenuItem>
                          <MenuItem value={40}>40</MenuItem>
                        </Select>
                        <Divider
                          orientation="vertical"
                          style={{
                            height: 28,
                            margin: 4
                          }}
                        />
                        <Search  style={{ color: 'rgba(0, 0, 0, 0.54)'}}/>
                        <InputBase
                          onChange={({ target: { value }}) =>
                            this.setState({ keyword: value })}
                          style={{ width: '100%' }}
                          placeholder="Search Lawyers/Organization"
                        />
                      </Paper>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      disableTouchRipple
                      variant='contained'
                      color='primary'
                      onClick={this.handleFilter}>
                      Update
                  </Button>
                  </div>
                </div>
                <div className="lawyer-count box-details">
                  1 out of 16 lawyers available
                </div>
                <div className="lawyer-tbl-section">

                  <TableContainer component={Paper} color='primary'>
                    <Table aria-label="simple table" size='small'>
                      <TableHead>
                        <TableRow>
                          <TableCell align="left"></TableCell>
                          <TableCell align="left">Name</TableCell>
                          <TableCell align="left">Firm</TableCell>
                          <TableCell align="left">Location</TableCell>
                          <TableCell align="left">Rating</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {lawyers.map(({ firstName, lastName, Organization, id, imageUrl, rating }) => {
                          const { name, postcode } = Organization || {};
                          return (
                            <TableRow
                              hover
                              selected={id === selectedId}
                              onClick={() => this.handleSelect({ id })}
                              key={id}>
                              <TableCell padding="checkbox">
                                <Checkbox checked={id === selectedId} color='primary' />
                              </TableCell>
                              <TableCell align="left">
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                  }}>
                                  <Avatar src={imageUrl}>
                                    {firstName && firstName.charAt(0)}
                                  </Avatar>
                                  <span
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      marginLeft: "20px",
                                    }}>
                                    {firstName} {lastName}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell align="left">{name}</TableCell>
                              <TableCell align="left">{postcode}</TableCell>
                              <TableCell align="left"><Rating size='small' readOnly value={rating.rating || 0}/></TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-blacknav">
            <div className="text-center">
              <span>
                Category <i className="fa fa-chevron-right"></i>
              </span>
              <span>
                {" "}
                Location <i className="fa fa-chevron-right"></i>{" "}
              </span>
              <span>
                {" "}
                Date/Time <i className="fa fa-chevron-right"></i>
              </span>
              <span className="active-yellow">
                {" "}
                Lawyer <i className="fa fa-chevron-right"></i>
              </span>
              <span>
                {" "}
                Details <i className="fa fa-chevron-right"></i>
              </span>
              <span>
                {" "}
                Summary <i className="fa fa-chevron-right"></i>
              </span>
              <span>
                {" "}
                Confirmation <i className="fa fa-chevron-right"></i>
              </span>
              <span
                className="float-right active-yellow"
                onClick={this.handleNext}
              >
                NEXT <i className="fa fa-chevron-right"></i>
              </span>
            </div>
          </div>
          <MapModal
            {...this.props}
            {...this.state}
            onClose={this.handleCloseMapModal}
            onSubmit={this.handleSubmitMapModal}
          />

          <Backdrop open={loading} style={{ zIndex: '100', color: '#fff' }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { userConsultation } = user || {};
  return { ...userConsultation };
};

export default connect(mapStateToProps, actions)(UserChooseLAwyer);
