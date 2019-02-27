import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Login from '../components/Login'
import SelectCompany from '../components/SelectCompany'

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
  }

  handleTextFieldChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleCheckboxChange = name => event => {
    this.setState({ 
      [name]: event.target.checked,
    });
  };

  state = {
    activeStep: 0,
    email: '',
    password: '',
    accessToken: '',
    originType: '',
    originUrl: '',
    originSlug: '',
    destType: '',
    destUrl: '',
    destSlug: '',
    accounts: true,
    accountCountAll: 0,
    accountCountSynced: 0,
    accountCountFailed: 0,
    contacts: true,
    contactCountAll: 0,
    contactCountSynced: 0,
    contactCountFailed: 0,
    products: true,
    productCountAll: 0,
    productCountSynced: 0,
    productCountFailed: 0,
    taxes: true,
    taxeCountAll: 0,
    taxeCountSynced: 0,
    taxeCountFailed: 0,
    departments: true,
    departmentCountAll: 0,
    departmentCountSynced: 0,
    departmentCountFailed: 0,
    projects: true,
    projectCountAll: 0,
    projectCountSynced: 0,
    projectCountFailed: 0,
    warehouses: true,
    warehouseCountAll: 0,
    warehouseCountSynced: 0,
    warehouseCountFailed: 0,
    fixedAssets: true,
    fixedAssetCountAll: 0,
    fixedAssetCountSynced: 0,
    fixedAssetCountFailed: 0,
    accountBeginningBalances: true,
    accountBeginningBalanceCountAll: 0,
    accountBeginningBalanceCountSynced: 0,
    accountBeginningBalanceCountFailed: 0,
    receivableBeginningBalances: true,
    receivableBeginningBalanceCountAll: 0,
    receivableBeginningBalanceCountSynced: 0,
    receivableBeginningBalanceCountFailed: 0,
    payableBeginningBalances: true,
    payableBeginningBalanceCountAll: 0,
    payableBeginningBalanceCountSynced: 0,
    payableBeginningBalanceCountFailed: 0,
    salesPrepaymentBeginningBalances: true,
    salesPrepaymentBeginningBalanceCountAll: 0,
    salesPrepaymentBeginningBalanceCountSynced: 0,
    salesPrepaymentBeginningBalanceCountFailed: 0,
    purchasesPrepaymentBeginningBalances: true,
    purchasesPrepaymentBeginningBalanceCountAll: 0,
    purchasesPrepaymentBeginningBalanceCountSynced: 0,
    purchasesPrepaymentBeginningBalanceCountFailed: 0,
    inventoryBeginningBalances: true,
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
          onClick={this.handleNext}>Lanjutkan
        </Button>
      )
    } else if (this.state.activeStep===this.steps.length) {
      return (
        <Button 
          variant="contained"
          onClick={this.handleReset}>Reset
        </Button>
      )
    } else {
      return (
        <div>
          <Button
            variant="contained" 
            onClick={this.handleBack}
            className={classes.backButton}>Kembali
          </Button>
          <Button
            variant="contained" 
            color="primary" 
            onClick={this.handleNext}>{this.state.activeStep === this.steps.length - 1 ? 'Proses' : 'Lanjutkan'}
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
      return this.handleStepThree(classes);
    } else if (this.state.activeStep===this.steps.length) {
      return this.handleFinishStep(classes);
    }
  }

  handleStepOne = classes => {
    return (
      <div>

        <TextField
          error={this.state.emailError!=null? true : false}
          className={classes.textField}
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          onChange={this.handleTextFieldChange('email')}
          fullWidth
        />
        {
          this.state.emailError!=null ?
          <div>
          <FormHelperText id="email-helper" variant="outlined" >We'll never share your email.</FormHelperText>
          <FormHelperText id="email-helper" variant="outlined" >We'll never share your emailzz.</FormHelperText>
          </div> : ''
        }

        <TextField
          className={classNames(classes.margin, classes.textField)}
          name="password"
          label="Password"
          type={this.state.showPassword ? 'text' : 'password'}
          variant="outlined"
          margin="normal"
          helperText={this.state.passwordError}
          value={this.state.password}
          onChange={this.handleTextFieldChange('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </div>
    );
  }

  handleStepTwo = classes => {
    return (
      <div>
        <TextField
          className={classes.textField}
          name="destUrl"
          label="Url"
          type="text"
          variant="outlined"
          margin="normal"
          // helperText={this.state.emailError}
          onChange={this.handleTextFieldChange('destUrl')}
          fullWidth
        />
        <TextField
          className={classes.textField}
          name="destSlug"
          label="Data Perusahaan"
          type="file"
          variant="outlined"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          // helperText={this.state.emailError}
          onChange={this.handleTextFieldChange('destSlug')}
          fullWidth
        />
      </div>
    );
  }

  handleStepThree = classes => {
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormGroup>
            <FormLabel>Data-data</FormLabel>
            <FormGroup>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={this.state.accounts} 
                  onChange={this.handleCheckboxChange('accounts')} 
                  value="accounts" />
              }
              label="Akun"
            />
            <FormControlLabel
              control={
                <Checkbox 
                  checked={this.state.contacts} 
                  onChange={this.handleCheckboxChange('contacts')} 
                  value="contacts" />
              }
              label="Kontak"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.products}
                  onChange={this.handleCheckboxChange('products')}
                  value="products"
                />
              }
              label="Produk"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.taxes}
                  onChange={this.handleCheckboxChange('taxes')}
                  value="taxes"
                />
              }
              label="Pajak"
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Data-data</FormLabel>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={this.state.departments} 
                  onChange={this.handleCheckboxChange('departments')} 
                  value="departments" />
              }
              label="Departemen"
            />
            <FormControlLabel
              control={
                <Checkbox 
                  checked={this.state.projects} 
                  onChange={this.handleCheckboxChange('projects')} 
                  value="projects" />
              }
              label="Proyek"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.warehouses}
                  onChange={this.handleCheckboxChange('warehouses')}
                  value="warehouses"
                />
              }
              label="Gudang"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.fixedAssets}
                  onChange={this.handleCheckboxChange('fixedAssets')}
                  value="fixedAssets"
                />
              }
              label="Harta Tetap"
            />
          </FormGroup>
          </FormGroup>
        </FormControl>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormGroup>
            <FormLabel>Saldo Awal</FormLabel>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={this.state.accountBeginningBalances} 
                  onChange={this.handleCheckboxChange('accountBeginningBalances')} 
                  value="accountBeginningBalances" />
              }
              label="Akun"
            />
            <FormControlLabel
              control={
                <Checkbox 
                  checked={this.state.receivableBeginningBalances} 
                  onChange={this.handleCheckboxChange('receivableBeginningBalances')} 
                  value="receivableBeginningBalances" />
              }
              label="Piutang"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.payableBeginningBalances}
                  onChange={this.handleCheckboxChange('payableBeginningBalances')}
                  value="payableBeginningBalances"
                />
              }
              label="Utang"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.inventoryBeginningBalances}
                  onChange={this.handleCheckboxChange('inventoryBeginningBalances')}
                  value="inventoryBeginningBalances"
                />
              }
              label="Persediaan"
            />
          </FormGroup>
        </FormControl>
      </div>
    );
  }

  handleFinishStep = classes => {
    return 'finish';
  }

  render() {
    const { classes } = this.props;
    // console.log(Validation({attribute: 'tes', value: '', validation: 'required|email'}));

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Stepper activeStep={this.state.activeStep} alternativeLabel>
              {this.steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {this.state.email}
            <Typography className={classes.instructions}>{this.handleStepContent(classes)}</Typography>
          </CardContent>
          
        </Card>
        <div>
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
