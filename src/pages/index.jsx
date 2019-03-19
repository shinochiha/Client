import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';

import Login from '../components/Login'
import SelectCompany from '../components/SelectCompany'
import SelectData from '../components/SelectData'
import Status from '../components/Status'

import withRoot from '../withRoot';

const styles = theme => ({
  root: {
    layout: 'flex',
    margin: theme.spacing.unit * 3,
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  errorSnackbar: {
    backgroundColor: theme.palette.error.dark,
  },
  errorIcon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  closeIcon: {
    fontSize: 20,
  },
  errorMessage: {
    display: 'flex',
    alignItems: 'center',
  },
});

class Index extends React.Component {

  constructor(props) {
    super(props)

    this.handler = this.handler.bind(this)
  }

  handler = ({name, value}) => {
    this.setState({
      [name]: value
    });
    if (name === 'destType') {
      this.setState({
        destSlug: null,
        originSlug: null
        })
    }
  };

  handleTextFieldChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  closeErrorSnackbar = () => {
    this.setState({
      isError: false,
      errorMessage: '',
    });
  }

  state = {
    activeStep: 2,
    isError: false,
    errorMessage: '',
    email: '',
    password: '',
    accessToken: '',
    refreshToken: '',
    destType: '', // Subcribe  | OnPremise
    destUrl: 'http://localhost:8888',
    destSlug: '', // data company slug
    originType: 'zahir6', // tidak terpakai
    originUrl: '', // tidak terpakai
    originSlug: '', // ini path database nya
    accounts: false,
    accountCountAll: 0,
    accountCountSynced: 0,
    accountCountFailed: 0,
    contacts: false,
    contactCountAll: 0,
    contactCountSynced: 0,
    contactCountFailed: 0,
    products: false,
    productCountAll: 0,
    productCountSynced: 0,
    productCountFailed: 0,
    taxes: false,
    taxeCountAll: 0,
    taxeCountSynced: 0,
    taxeCountFailed: 0,
    departments: false,
    departmentCountAll: 0,
    departmentCountSynced: 0,
    departmentCountFailed: 0,
    projects: false,
    projectCountAll: 0,
    projectCountSynced: 0,
    projectCountFailed: 0,
    warehouses: false,
    warehouseCountAll: 0,
    warehouseCountSynced: 0,
    warehouseCountFailed: 0,
    fixedAssets: false,
    fixedAssetCountAll: 0,
    fixedAssetCountSynced: 0,
    fixedAssetCountFailed: 0,
    accountBeginningBalances: false,
    accountBeginningBalanceCountAll: 0,
    accountBeginningBalanceCountSynced: 0,
    accountBeginningBalanceCountFailed: 0,
    receivableBeginningBalances: false,
    receivableBeginningBalanceCountAll: 0,
    receivableBeginningBalanceCountSynced: 0,
    receivableBeginningBalanceCountFailed: 0,
    payableBeginningBalances: false,
    payableBeginningBalanceCountAll: 0,
    payableBeginningBalanceCountSynced: 0,
    payableBeginningBalanceCountFailed: 0,
    salesPrepaymentBeginningBalances: false,
    salesPrepaymentBeginningBalanceCountAll: 0,
    salesPrepaymentBeginningBalanceCountSynced: 0,
    salesPrepaymentBeginningBalanceCountFailed: 0,
    purchasesPrepaymentBeginningBalances: false,
    purchasesPrepaymentBeginningBalanceCountAll: 0,
    purchasesPrepaymentBeginningBalanceCountSynced: 0,
    purchasesPrepaymentBeginningBalanceCountFailed: 0,
    inventoryBeginningBalances: false,
    inventoryBeginningBalanceCountAll: 0,
    inventoryBeginningBalanceCountSynced: 0,
    inventoryBeginningBalanceCountFailed: 0,
  };

  steps = [
    'Login',
    'Pilih data perusahaan',
    'Pilih data yang akan diimpor',
    'Status',
  ];

  handleNext = () => {
    if (this.state.activeStep<this.steps.length) {
      this.setState(state => ({
        activeStep: state.activeStep + 1,
      }));
    }
  };

  handleBack = () => {
    if (this.state.activeStep>0) {
      this.setState(state => ({
        activeStep: state.activeStep - 1,
      }));
    }
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleStepButton = classes => {
    if (this.state.activeStep===0) {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleNext} >Lanjutkan
        </Button>
      )
    } else if (this.state.activeStep===this.steps.length) {
      return (
        <Button
          variant="contained"
          onClick={this.handleReset} >Reset
        </Button>
      )
    } else {
      return (
        <div>
          <Button
            variant="contained"
            onClick={this.handleBack}
            className={classes.backButton} >Kembali
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleNext} >{this.state.activeStep === this.steps.length - 1 ? 'Proses' : 'Lanjutkan'}
          </Button>
        </div>
      )
    }
  };

  handleStepContent = classes => {
    if (this.state.activeStep===0) {
      return <Login state={this.state} handler={this.handler.bind(this)}/>
    } else if (this.state.activeStep===1) {
      return <SelectCompany state={this.state} handler={this.handler.bind(this)}/>
    } else if (this.state.activeStep===2) {
      return <SelectData state={this.state} classes={classes} handler={this.handler.bind(this)} />
    } else if (this.state.activeStep===this.steps.length - 1) {
      // return this.handleFinishStep(classes);
      return <Status />
    }
  }

  handleFinishStep = classes => {
    return 'finish';
  }

  render() {
    const { classes } = this.props;
    console.log(this.state.destSlug)
    // console.log(this.state.originSlug)
    return (
      <div className={classes.root} >
        <Card className={classes.card} >
          <CardContent>
            <Stepper activeStep={this.state.activeStep} alternativeLabel>
              {this.steps.map(label => (
                <Step key={label} >
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div className={classes.instructions} >{this.handleStepContent(classes)}</div>
          </CardContent>
        </Card>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.isError}
          autoHideDuration={6000}
          onClose={this.closeErrorSnackbar} >
          <SnackbarContent
            className={classes.errorSnackbar}
            aria-describedby='error-snackbar'
            message={
              <span id='error-snackbar' className={classes.errorMessage} >
                <ErrorIcon className={classes.errorIcon} />{this.state.errorMessage}
              </span>
            }
            action={[
              <IconButton
                className={classes.close}
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.closeErrorSnackbar} >
                <CloseIcon className={classes.closeIcon} />
              </IconButton>
            ]}
          />
        </Snackbar>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
