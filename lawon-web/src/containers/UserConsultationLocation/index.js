import React, { Component } from 'react';
import { Select, MenuItem, InputAdornment, IconButton, createMuiTheme, ThemeProvider, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { GpsFixed } from '@material-ui/icons';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import MapModal from './MapModal';
import * as actions from '../../actions/user/userConsultation';

// eslint-disable-next-line no-undef
const autoCompleteService = new google.maps.places.AutocompleteService();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#feb41c',
    }
  },
  typography: {
    htmlFontSize: 11
  },
});

class UserConsultationLocation extends Component {
  state = {
    isMapModalOpen: false,
    position: {},
    selectedAddress: {},
    radius: 10,
    addresses: []
  }

  handleChangeInput = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  }

  handleNext = () => {
    const { history } = this.props;
    const { selectedAddress , radius } = this.state;
    const { id } = selectedAddress || {};

    const path = window.location.hash.replace('#', '');
    history.push(`${path}/${id}/${radius}/lawyers`);
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

  handleOpenMapModal = () => {
    this.setState({ isMapModalOpen: true });
  }

  handleCloseMapModal = () => {
    this.setState({ isMapModalOpen: false });
  }

  handleSearchPlaces = debounce(({ target: { value }}) => {
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

  render() {
    const { radius, addresses, selectedAddress } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <div className='user-main-content-consultation'>
          <div className='container'>
            <div className='add-details-box'>
              <h2>Location</h2>
              <div>Select your location so we can bring you a list of local lawyers</div>
              <div className='row find-location'>
                <div className='form-group col-md-12 no-padding'>
                  <label class="control-label col-md-3" for="mobile">Town or postcode</label>
                  <div class="col-md-9">
                    <Autocomplete
                      value={selectedAddress}
                      options={addresses || []}
                      getOptionLabel={(option) => option.description}
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
                        <TextField
                          {...params}
                          placeholder='Search your location'
                          variant="outlined"
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <InputAdornment>
                                <IconButton
                                  onClick={this.handleOpenMapModal}>
                                  <GpsFixed />
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                      }
                    />
                  </div>
                </div>

                <div className='form-group col-md-12 no-padding'>
                  <label class="control-label col-md-3" for="mobile">Radius in miles</label>
                  <div class="col-md-9">
                    <Select
                      value={radius}
                      name='radius'
                      variant='outlined'
                      onChange={this.handleChangeInput}
                      style={{ width: '100px', fontSize: '12px' }}>
                      <MenuItem value={0}>0</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={30}>30</MenuItem>
                      <MenuItem value={40}>40</MenuItem>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='bottom-blacknav'>
            <div className='text-center'>
              <span>Category <i className='fa fa-chevron-right'></i></span>
              <span className='active-yellow'> Location  <i className='fa fa-chevron-right'></i> </span>
              <span> Date/Time <i className='fa fa-chevron-right'></i></span>
              <span> Lawyer <i className='fa fa-chevron-right'></i></span>
              <span> Details <i className='fa fa-chevron-right'></i></span>
              <span> Summary <i className='fa fa-chevron-right'></i></span>
              <span> Confirmation <i className='fa fa-chevron-right'></i></span>
              <span onClick={this.handleNext} className='float-right active-yellow'>
                NEXT <i className='fa fa-chevron-right'></i> </span>
            </div>
          </div>
          <MapModal
            {...this.props}
            {...this.state}
            onClose={this.handleCloseMapModal}
            onSubmit={this.handleSubmitMapModal}
          />
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { userConsultation } = user || {};
  return { ...userConsultation };
}

export default connect(mapStateToProps, actions)(UserConsultationLocation);
