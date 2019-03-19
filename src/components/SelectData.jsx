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
    // Accounts
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
      if(event.target.checked) {
        this.props.handler({name: 'accounts',value: true})
      } else {
        this.props.handler({name: 'accounts',value: false})
      }
    }
    // Contacts
    if (name === 'contacts') {
        if (event.target.checked) {
        axios.get('/contacts', {
          headers: {
            'database': this.props.state.originSlug
          }
        })
        .then(res => {
          this.setState({contactCountAll: res.data.count})
          console.log(res.data.count)
        })
      } else {
        this.setState({contactCountAll: 0})
      }
      if(event.target.checked) {
          this.props.handler({name: 'contacts',value: true})
      } else {
          this.props.handler({name: 'contacts',value: false})
      }
    }
     //Get Products
    if (name === 'products') {
        if (event.target.checked) {
        axios.get('/products', {
          headers: {
            'database': this.props.state.originSlug
          }
        })
        .then(res => {
          this.setState({productCountAll: res.data.count})
          console.log(res.data.count)
        })
      } else {
        this.setState({productCountAll: 0})
      }
      if(event.target.checked) {
        this.props.handler({name: 'products',value: true})
      } else {
        this.props.handler({name: 'products',value: false})
      }
    } 
    // Get Taxes
    if (name === 'taxes') {
        if (event.target.checked) {
        axios.get('/taxes', {
          headers: {
            'database': this.props.state.originSlug
          }
        })
        .then(res => {
          this.setState({taxesCountAll: res.data.count})
          console.log(res.data.count)
        })
      } else {
        this.setState({taxesCountAll: 0})
      }
      if(event.target.checked) {
        this.props.handler({name: 'taxes',value: true})
      } else {
        this.props.handler({name: 'taxes',value: false})
      }
    } 
    // Departments
    if (name === 'departments') {
        if (event.target.checked) {
        axios.get('/departments', {
          headers: {
            'database': this.props.state.originSlug
          }
        })
        .then(res => {
          this.setState({departmentsCountAll: res.data.count})
          console.log(res.data.count)
        })
      } else {
        this.setState({departmentsCountAll: 0})
      }
      if(event.target.checked) {
        this.props.handler({name: 'departments',value: true})
      } else {
        this.props.handler({name: 'departments',value: false})
      }
    } 
    // Projects
    if (name === 'projects') {
        if (event.target.checked) {
        axios.get('/projects', {
          headers: {
            'database': this.props.state.originSlug
          }
        })
        .then(res => {
          this.setState({projectsCountAll: res.data.count})
          console.log(res.data.count)
        })
      } else {
        this.setState({projectsCountAll: 0})
      }
      if(event.target.checked) {
        this.props.handler({name: 'projects',value: true})
      } else {
        this.props.handler({name: 'projects',value: false})
      }
    } 
    // Warehouses
    if (name === 'warehouses') {
        if (event.target.checked) {
        axios.get('/warehouses', {
          headers: {
            'database': this.props.state.originSlug
          }
        })
        .then(res => {
          this.setState({warehouseCountAll: res.data.count})
          console.log(res.data.count)
        })
      } else {
        this.setState({warehouseCountAll: 0})
      }
      if(event.target.checked) {
        this.props.handler({name: 'warehouses',value: true})
      } else {
        this.props.handler({name: 'warehouses',value: false})
      }
    }
    // Fixes_Assets
    if (name === 'fixedAssets') {
        if (event.target.checked) {
        axios.get('/fixed_assets', {
          headers: {
            'database': this.props.state.originSlug
          }
        })
        .then(res => {
          this.setState({fixedAssetsCountAll: res.data.count})
          console.log(res.data.count)
        })
      } else {
        this.setState({fixedAssetsCountAll: 0})
      }
      if(event.target.checked) {
        this.props.handler({name: 'fixedAssets',value: true})
      } else {
        this.props.handler({name: 'fixedAssets',value: false})
      }
    }  
    // Saldo Awal
    // Get AccountBeginningBalances
    if (name === 'accountBeginningBalances') {
        if (event.target.checked) {
        axios.get('/account_beginning_balances', {
          headers: {
            'database': this.props.state.originSlug
          }
        })
        .then(res => {
          this.setState({accountBeginningBalanceCountAll: res.data.count})
          console.log(res.data.count)
        })
      } else {
        this.setState({accountBeginningBalanceCountAll: 0})
      }
      if(event.target.checked) {
        this.props.handler({name: 'accountBeginningBalances',value: true})
      } else {
        this.props.handler({name: 'accountBeginningBalances',value: false})
      }
    } 
    // ReceivableBeginningBalances
    if (name === 'receivableBeginningBalances') {
        if (event.target.checked) {
        axios.get('/receivable_beginning_balances', {
          headers: {
            'database': this.props.state.originSlug
          }
        })
        .then(res => {
          this.setState({receivableBeginningBalancesCountAll: res.data.count})
          console.log(res.data.count)
        })
      } else {
        this.setState({receivableBeginningBalanceCountAll: 0})
      }
      if(event.target.checked) {
        this.props.handler({name: 'receivableBeginningBalances',value: true})
      } else {
        this.props.handler({name: 'receivableBeginningBalances',value: false})
      }
    }
    // PayableBeginningBalances
    if (name === 'payableBeginningBalances') {
        if (event.target.checked) {
        axios.get('/payable_beginning_balances', {
          headers: {
            'database': this.props.state.originSlug
          }
        })
        .then(res => {
          this.setState({payableBeginningBalancesCountAll: res.data.count})
          console.log(res.data.count)
        })
      } else {
        this.setState({payableBeginningBalanceCountAll: 0})
      }
      if(event.target.checked) {
        this.props.handler({name: 'payableBeginningBalances',value: true})
      } else {
        this.props.handler({name: 'payableBeginningBalances',value: false})
      }
    }
    // Inventory
    if (name === 'inventoryBeginningBalances') {
        if (event.target.checked) {
        axios.get('/inventory_beginning_balances', {
          headers: {
            'database': this.props.state.originSlug
          }
        })
        .then(res => {
          this.setState({inventoryBeginningBalancesCountAll: res.data.count})
          console.log(res.data.count)
        })
      } else {
        this.setState({inventoryBeginningBalanceCountAll: 0})
      }
      if(event.target.checked) {
        this.props.handler({name: 'inventoryBeginningBalances',value: true})
      } else {
        this.props.handler({name: 'inventoryBeginningBalances',value: false})
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
                  checked={this.props.state.accountBeginningBalances}
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
                  checked={this.props.state.accountBeginningBalances}
                  onChange={this.handleCheckboxChange('departments')}
                  value="departments" />
              }
              label="Departemen"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.props.state.accountBeginningBalances}
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
