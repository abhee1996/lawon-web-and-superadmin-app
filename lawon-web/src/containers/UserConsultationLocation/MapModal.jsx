import React from 'react';
import { withStyles, Button, Dialog, IconButton, Typography } from '@material-ui/core';
import { Close, LocationOn } from '@material-ui/icons';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import GoogleMapReact from 'google-map-react';

import { GOOGLE_API_KEY } from '../../common/constants';


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {
        onClose
        && (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <Close />
          </IconButton>
        )
      }
    </MuiDialogTitle>
  );
});


export default ({ isMapModalOpen, onClose, onSubmit }) => {
  const [position, setPosition] = React.useState({ lat: 31.495267799999997, lng: 74.26262179999999});

  navigator.geolocation.getCurrentPosition(({ coords }) => {
    const { latitude, longitude } = coords;
    
    setPosition({
      lat: latitude,
      lng: longitude
    })
  })


  return (
    <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={isMapModalOpen}>
      <DialogTitle id="customized-dialog-title" onClose={onClose}>
        Select your Location
      </DialogTitle>
      <MuiDialogContent dividers>
        <div style={{ height: '50vh', width: '550px' }}>
          <GoogleMapReact
            onClick={({ lat, lng }) => setPosition({ lat, lng })}
            bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
            defaultCenter={{ ...position }}
            defaultZoom={11}>
            <LocationOn
              style={{ fontSize: '40px' }}
              lat={position.lat}
              lng={position.lng}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      </MuiDialogContent>
      <MuiDialogActions>
        <Button
          autoFocus
          onClick={() => onSubmit({ position })}
          color="primary"
          variant='outlined'>
          Save changes
        </Button>
      </MuiDialogActions>
    </Dialog>
  );
}