import axios from 'axios';

import React from 'react';

import { css } from '@emotion/core';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Select from 'react-select';

import Radio from '@material-ui/core/Radio';
import ClipLoader from 'react-spinners/ClipLoader';

import Validation from './Validation';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

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
    isError: true,
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
    options: [{
      label: '',
      value: ''
    }],
    shrink: false,
    slug: '',
    selectedFile: null,
    loaded:0,
  }

  handleFieldChange = name => event => {
    this.handleValidation({name: name, value: event.target.value});
    if (name === 'destType') {
      this.setState({
        slug: null,
        shrink: false
        })
    }
  }

  handleValidation = ({name, value}) => {
    this.props.handler({name: name, value: value});
    let newState = {...this.state[name]}
    if(!value) {
      value = ''
    }
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
    this.props.handler({'name': 'loading', 'value': false})
  }

  handleNext = () => {
    let keys = Object.keys(this.state);
    // let error = []
    for (var i = 0; i < keys.length; i++) {
      let key = keys[i];
      if(this.state[key]) {
        if (typeof this.state[key].validation!=='undefined') {
          let value = this.props.state[key];
          if(!value) {
            value = ''
          }
          let errorMessage = Validation({'attribute': key, 'validation': this.state[key].validation, 'value': value});
          let newState = {...this.state[key]}
            if (errorMessage.length>0) {
              newState.isError = true;
              newState.errorMessage = errorMessage;
            } else {
              newState.isError = false;
              newState.errorMessage = [];
            }
            this.setState({[key]: newState, isError: newState.isError});
        }
      }
    }
    const { originSlug, destSlug, destType, destUrl } = this.props.state
    if (originSlug !== null && originSlug !== '' && destSlug !== null && destSlug !== '' && destType !== null && destType !== '' && destUrl !== null && destUrl !== '' ) {
      this.props.handler({name: 'activeStep', value: 2});
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

  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  handleUpload = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile)

    axios.post('/upload', data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
          })
        },
      })
      .then(res => {
        this.props.handler({name: 'originSlug', value:res.data.file })
        console.log(res.data.file)
      })

  }

  render() {
    const { destType } = this.props.state
    console.log(this.props.state.destSlug)
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
            </div> 

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
            </div> 
          </div> : null
        }
        
        {
          destType === 'subscribe' ?
          <div style={{marginTop: 15}}>
          <Select
              error={this.state.destSlug.isError}
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
        <TextField
          error={this.state.originSlug.isError}
          name="originSlug"
          type="file"
          InputLabelProps={{ shrink: true }}
          label="Select Company"
          variant="outlined"
          margin="normal"
          onChange={this.handleselectedFile}
          fullWidth
        />
        {this.handleValidationMessage('originSlug')}

        <Button variant="contained" color="default" onClick={this.handleUpload}>
        Upload &nbsp;
        <CloudUploadIcon /> &nbsp;&nbsp;
        <ClipLoader
          css={override}
          sizeUnit={"px"}
          size={20}
          loading={this.state.loaded}
          color={'#123abc'}>
        </ClipLoader> &nbsp;
         {Math.round(this.state.loaded,2) } %
        </Button> 

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
