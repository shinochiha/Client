import React from 'react';
import axios from 'axios';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';


class SelectData extends React.Component {

  handleCheckboxChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
      if (name === 'accounts') {
        if (event.target.checked) {
        axios.get('/accounts', {
          headers: {
            'database': this.props.state.originSlug
          }
        })
        .then(res => {
          this.setState({accountCountAll: res.data.count})
          console.log(res.data.count)
        })
      } else {
        this.setState({accountCountAll: 0})
      }
    } 
  };

  render() {
    const {classes} = this.props
    return (
      <div className={classes.root} >
        <FormControl component="fieldset" className={classes.formControl} >
          <FormGroup>
            <FormLabel>Data-data</FormLabel>
            <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.props.state.accounts}
                  onChange={this.handleCheckboxChange('accounts')}
                  value='accounts' />
              }
              label="Akun"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.props.state.contacts}
                  onChange={this.handleCheckboxChange('contacts')}
                  value="contacts" />
              }
              label="Kontak"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.props.state.products}
                  onChange={this.handleCheckboxChange('products')}
                  value="products"
                />
              }
              label="Produk"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.props.state.taxes}
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
                  checked={this.props.state.departments}
                  onChange={this.handleCheckboxChange('departments')}
                  value="departments" />
              }
              label="Departemen"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.props.state.projects}
                  onChange={this.handleCheckboxChange('projects')}
                  value="projects" />
              }
              label="Proyek"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.props.state.warehouses}
                  onChange={this.handleCheckboxChange('warehouses')}
                  value="warehouses"
                />
              }
              label="Gudang"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.props.state.fixedAssets}
                  onChange={this.handleCheckboxChange('fixedAssets')}
                  value="fixedAssets"
                />
              }
              label="Harta Tetap"
            />
          </FormGroup>
          </FormGroup>
        </FormControl>
        <FormControl component="fieldset" className={classes.formControl} >
          <FormGroup>
            <FormLabel>Saldo Awal</FormLabel>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.props.state.accountBeginningBalances}
                  onChange={this.handleCheckboxChange('accountBeginningBalances')}
                  value="accountBeginningBalances" />
              }
              label="Akun"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.props.state.receivableBeginningBalances}
                  onChange={this.handleCheckboxChange('receivableBeginningBalances')}
                  value="receivableBeginningBalances" />
              }
              label="Piutang"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.props.state.payableBeginningBalances}
                  onChange={this.handleCheckboxChange('payableBeginningBalances')}
                  value="payableBeginningBalances"
                />
              }
              label="Utang"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.props.state.inventoryBeginningBalances}
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
}
export default SelectData;
