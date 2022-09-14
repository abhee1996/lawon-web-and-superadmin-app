
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AdminProfileSetup from '../../components/molecules/adminprofilesetup'
import FirmProfileSetup from '../../components/molecules/firmprofilesetup'
import PeopleProfileSetup from '../../components/molecules/peopleprofilesetup'


const styles = theme => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    fontFamily: 'OpenSans-Regular',
    color: "black"
  },
  stepIcon: {
    color: "#ccc",
    backgroundColor: 'transparent !important'
  },
  connectorLine: {
    color: "black"
  },
});

function getSteps() {
  return ['Admin', 'Firm', 'People'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <AdminProfileSetup/>;
    case 1:
      return <FirmProfileSetup/>;
    case 2:
      return <PeopleProfileSetup/> ;
    default:
      return 'Unknown stepIndex';
  }
}

class AdminSetup extends Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
  
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        {/* <Typography className={classes.instructions}>
        <Stepper
        classes={{ line: classes.connectorLine}}
        activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel
              StepIconProps={{
                classes: { root: classes.stepIcon }
              }}
              className='test-back'>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        </Typography> */}
        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>All steps completed</Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              {/* <div className='step-form-btns'>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className='btn-form-next'
                >
                  Back
                </Button>
                <Button  className='btn-form-next' variant="contained" onClick={this.handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div> */}
            </div>
          )}
        </div>
      </div>
    );
  }
}

AdminSetup.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(AdminSetup);
