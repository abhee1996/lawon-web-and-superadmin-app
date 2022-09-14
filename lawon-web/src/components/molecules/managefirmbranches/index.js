
import React from 'react';
import { TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, InputAdornment, Tooltip, ListItemAvatar, Avatar, Backdrop, CircularProgress} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Search, Delete, AddCircleOutline, LocationOn } from '@material-ui/icons';
import { connect } from 'react-redux';
import { debounce, isEmpty } from 'lodash';

import LoadingBar from 'react-top-loading-bar';
import * as actions from '../../../actions/manageFirm';

// eslint-disable-next-line no-undef
const autoCompleteService = new google.maps.places.AutocompleteService();
// eslint-disable-next-line no-undef
const geocoder = new google.maps.Geocoder();

class FirmBranches extends React.Component {
  state = {
    selectedAddress: {},
    addresses: [],
    branches: []
  };

  componentDidMount() {
    const { getBranches } = this.props;
    getBranches();
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

  handleAddBranch = () => {
    const { saveFirmBranch, getBranches } = this.props;
    const { selectedAddress } = this.state;

    geocoder.geocode({ placeId: selectedAddress.id }, (result) => {
      const [address] = result || [];
      const { formatted_address, address_components, geometry } = address || {};
      const [atfirst] = address_components || [];
      const postcode = address_components.find(({ types }) => types.includes('postal_code')) || atfirst;
      const { long_name } = postcode || {};

      const { location } = geometry || {};
      const latlng = `${location.lat()}.${location.lng()}`;

      saveFirmBranch({
        address: formatted_address,
        postcode: long_name,
        latlng
      })
        .then(({ errorMessage }) => {
          if (errorMessage) return;
          getBranches();
          this.setState({ selectedAddress: {} });
        });
    });
  }

  deleteBranch = (id) => {
    const { deleteBranches, getBranches } = this.props;
    deleteBranches({ id }).then(({ errorMessage }) => {
      if (errorMessage) return;
      getBranches();
    })
  }

  render() {
    const { selectedAddress, addresses } = this.state
    const { branches, loading } = this.props;
    return (
      <div>
        <LoadingBar
          onRef={ref => (this.LoadingBar = ref)}
          height={3}
          color="#feb41c"
        />
        <div className='right-side-heading'>
          Branches
        </div>
        <div className='col-sm-12 no-padding'>
          <div className='practice-areas'>
            <div className='col-sm-12 no-padding form-area'>
              <div className='right-side-subheading'>ADD TOWN</div>
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
                    variant='standard'
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: <Search/>,
                      endAdornment: (
                        <InputAdornment>
                          <Tooltip title='Add Branch Location'>
                            <IconButton
                              size='small'
                              disabled={isEmpty(selectedAddress)}
                              onClick={this.handleAddBranch}>
                              <AddCircleOutline />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      )
                    }}
                  />
                }
              />
            </div>
          </div>
          <div className='col-md-12'>
            <div className='show-branch'>
              {branches.length > 0 && <div className='right-side-subheading'>BRANCHES</div>}
              <div className='branch-list'>
                <List>
                  {branches.map(({ address, postcode, id }, index) => (
                    <ListItem role={undefined} button disableRipple dense key={index}>
                      <ListItemAvatar>
                        <Avatar>
                          <LocationOn />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText id={index} primary={address} secondary={postcode} />
                      <ListItemSecondaryAction>
                        <Tooltip title='Delete Branch'>
                          <IconButton
                            onClick={() => this.deleteBranch(id)}
                            size='small'>
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </div>
            </div>
          </div>
        </div>
        <Backdrop open={loading} style={{ zIndex: '100', color: '#fff' }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
}


const mapStateToProps = ({ manageFirm, auth }) => ({
  ...manageFirm,
  auth
});

export default connect(mapStateToProps, actions)(FirmBranches);