import React from 'react';

import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import axios from 'axios';

import Validation from './Validation';

class Login extends React.Component {

  state = {
    isError: true,
    email: {
      validation: 'required|email',
      isError: false,
      errorMessage: [],
    },
    password: {
      validation: 'required',
      isError: false,
      errorMessage: [],
      isShow: false,
    },
  }

  handleFieldChange = name => event => {
    this.handleValidation({name: name, value: event.target.value});
  }

  handleValidation = ({name, value}) => {
    this.props.handler({name: name, value: value});

    let newState = {...this.state[name]}
    let errorMessage = Validation({'attribute': name, 'validation': this.state[name].validation, 'value': value});
    if (errorMessage.length>0) {
      newState.isError = true;
      newState.errorMessage = errorMessage;
    } else {
      newState.isError = false;
      newState.errorMessage = [];
    }
    this.setState({[name]: newState, isError: newState.isError});
  }

  handleValidationMessage = name => {
    let message = [];
    let errorMessage = this.state[name].errorMessage;
    if (errorMessage.length>0) {
      for (var i = 0; i < errorMessage.length; i++) {
        message.push(<FormHelperText error style={{margin: '0 0 10px 0'}}>{errorMessage[i]}</FormHelperText>);
      }
    }
    return message;
  }

  handleClickShowPassword = () => {
    let password = {...this.state.password}
    password.isShow = !this.state.password.isShow;
    this.setState({password: password});
  }

  handleNext = () => {
    let keys = Object.keys(this.state);
    for (var i = 0; i < keys.length; i++) {
      let key = keys[i];
      if (typeof this.state[key].validation!=='undefined') {
        let value = this.props.state[key];
        this.handleValidation({name: key, value: value});
      }
    }
    if (!this.state.isError) {
      this.props.handler({name: 'activeStep', value: 1});
    } else {
      axios.post(process.env.REACT_APP_ZAHIR_ID_URL+'/oauth/access_token', {
          grant_type: 'password',
          client_id: process.env.REACT_APP_ZAHIR_ID_CLIENT_ID,
          client_secret: process.env.REACT_APP_ZAHIR_ID_CLIENT_SECRET,
          username: this.props.state.email,
          password: this.props.state.password,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    }
  }

  render() {
    return (
      <Typography>
        <TextField
          error={this.state.email.isError}
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          value={this.props.state.email}
          onChange={this.handleFieldChange('email')}
          fullWidth
        />
        {this.handleValidationMessage('email')}
        <TextField
          error={this.state.password.isError}
          name="password"
          label="Password"
          type={this.state.password.isShow ? 'text' : 'password'}
          variant="outlined"
          margin="normal"
          value={this.props.state.password}
          onChange={this.handleFieldChange('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={this.handleClickShowPassword}>
                  {this.state.password.isShow ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
        />
        {this.handleValidationMessage('password')}
        <Typography style={{ width: '100%', textAlign: 'right' }}>
          <Button onClick={this.handleNext} variant="contained" color='primary' style={{margin: '10px 0 0 0'}}>
            Lanjutkan
          </Button>
        </Typography>
      </Typography>
    );
  }
}

export default Login;
