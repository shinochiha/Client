import axios from 'axios';

import React from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from 'react-select';

import Radio from '@material-ui/core/Radio';

import Validation from './Validation';


function inputComponent({ inputRef, ...props }) {
  return <div style={{display: 'flex', justifyContent: 'space-between', padding: 10}} ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      InputProps={{
      inputComponent,
      inputProps: {
        inputRef: props.innerRef,
        children: props.children,
        ...props.innerProps,
      },
    }}
    {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Menu(props) {
  return (
    <Paper square style={{zIndex: 10}} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}


const components = {
  Control,
  Option,
  Menu
};

class SelectCompany extends React.Component {

  state = {
    destUrl: {
      validation: 'required',
      isError: false,
      errorMessage: [],
    },
    destSlug: {
      validation: 'required',
      isError: false,
      errorMessage: [],
      suggestions: [],
      selectedText: '',
    },
    originUrl: {
      validation: 'required',
      isError: false,
      errorMessage: [],
    },
    originSlug: {
      validation: 'required',
      isError: false,
      errorMessage: [],
      suggestions: [],
      selectedText: '',
    },
    destType: {
      validation: 'required',
      isError: false,
      errorMessage: [],
    },
    originType: {
      validation: 'required',
      isError: false,
      errorMessage: [],
    },
    options: [{
      label: '',
      value: ''
    }],
    shrink: false,
    slug: '',
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

  handlePrevious = () => {
    this.props.handler({name: 'activeStep', value: 0});
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
    }
  }

  getDataCompany = (value) => {
    axios.get('/destination_companies?search[company.name]=' + value , {
        headers: {
          'Authorization': 'Bearer ' + this.props.state.accessToken,
          'destination_type': 'subscribe'
        }
      }).then(res => {
        const list = res && res.data && res.data.results
        if(list) {
          const options = list.map(data => {
            return {
              label: data.company.name,
              value: data.company.slug
            }
          })
          this.setState({
            options : options
          })
        }
      })
  }

  getDataCompanyFocus = () => {
    this.setState({shrink:true})
    axios.get('/destination_companies?search[company.name]=', {
        headers: {
          'Authorization': 'Bearer ' + this.props.state.accessToken,
          'destination_type': 'subscribe'
        }
      }).then(res => {
        const list = res && res.data && res.data.results
        if(list) {
          const options = list.map(data => {
            return {
              label: data.company.name,
              value: data.company.slug
            }
          })
          this.setState({
            options : options
          })
        }
      })
  }

  handleChangeCompany = (value) => {
    this.handleValidation({name: 'destSlug', value: value ? value.value : ''});
    this.setState({slug: value ? value : ''})
  }

  handleBlur = () => {
    if (this.state.slug === '' || !this.state.slug) {
      this.setState({shrink:false})
    }
  }

  render() {
    const { destType } = this.props.state
    console.log(this.props.state.destUrl)
    return (
      <div>
        <Typography style={{ fontSize: 20 }} gutterBottom variant="h5" component="h5">
          Data Tujuan
        </Typography>
        <FormControlLabel
          control={
            <Radio
              checked={this.props.state.destType === 'subscribe'}
              onChange={this.handleFieldChange('destType')}
              value="subscribe"
              color="primary"
              name="radio-button-demo"
              aria-label="Subscribe"
            />
          }
          label="Subscribe"
        />
        <FormControlLabel
          control={
            <Radio
              checked={this.props.state.destType === 'onPremise'}
              onChange={this.handleFieldChange('destType')}
              value="onPremise"
              color="primary"
              name="radio-button-demo"
              aria-label="onPremise"
            />
          }
          label="On Premise"
        />
        {
          destType === 'onPremise' ?
          <div>
          <TextField
            error={this.state.destUrl.isError}
            name="destUrl"
            label="Url"
            variant="outlined"
            margin="normal"
            value={this.props.state.destUrl}
            onChange={this.handleFieldChange('destUrl')}
            fullWidth
          />
          {this.handleValidationMessage('destUrl')}
          </div> : null
        }
        {
          destType === 'subscribe' ?
          <div style={{marginTop: 15}}>
          <Select
              onFocus={this.getDataCompanyFocus}
              onBlur={this.handleBlur}
              options={this.state.options}
              value={this.state.slug}
              onInputChange={this.getDataCompany}
              onChange={this.handleChangeCompany}
              isClearable
              placeholder=''
              components={components}
              textFieldProps={{
                label: 'Select Company',
                InputLabelProps: {
                  shrink: this.state.shrink,
                },
              }}
            />
          {this.handleValidationMessage('destSlug')}
          </div> : null
        }

        <Typography style={{ fontSize: 20, marginTop: 20 }} gutterBottom variant="h5" component="h5">
          Data Sumber
        </Typography>
        <FormControlLabel
          control={
            <Radio
              checked={this.props.state.originType === 'zahir6'}
              onChange={this.handleFieldChange('originType')}
              value="zahir6"
              color="primary"
              name="radio-button-demo"
              aria-label="zahir6"
            />
          }
          label="Zahir 6"
        />
        <FormControlLabel
          control={
            <Radio
              checked={this.props.state.originType === 'zahir5'}
              onChange={this.handleFieldChange('originType')}
              value="zahir5"
              color="primary"
              name="radio-button-demo"
              aria-label="zahir5"
            />
          }
          label="Zahir 5"
        />
        <FormControlLabel
          control={
            <Radio
              checked={this.props.state.originType === 'zahironline'}
              onChange={this.handleFieldChange('originType')}
              value="zahironline"
              color="primary"
              name="radio-button-demo"
              aria-label="zahironline"
            />
          }
          label="Zahir Online"
        />
        <TextField
          error={this.state.originUrl.isError}
          name="originUrl"
          label="Url"
          variant="outlined"
          margin="normal"
          value={this.props.state.originUrl}
          onChange={this.handleFieldChange('originUrl')}
          fullWidth
        />
        {this.handleValidationMessage('originUrl')}
        <TextField
          error={this.state.originSlug.isError}
          name="originSlug"
          type="file"
          InputLabelProps={{ shrink: true }}
          label="Select Company"
          variant="outlined"
          margin="normal"
          value={this.props.state.originSlug}
          onChange={this.handleFieldChange('originSlug')}
          fullWidth
        />
        {this.handleValidationMessage('originSlug')}

        <div style={{ width: '100%', textAlign: 'right' }}>
          <Button onClick={this.handlePrevious} variant="contained" color='default' style={{margin: '10px 10px 0 0'}}>
            Kembali
          </Button>
          <Button onClick={this.handleNext} variant="contained" color='primary' style={{margin: '10px 0 0 0'}}>
            Lanjutkan
          </Button>
        </div>
      </div>
    );
  }
}

export default SelectCompany;
