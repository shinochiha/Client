import React from 'react';
import axios from 'axios';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

class SelectData extends React.Component {

  handleNext = () => {
    if (this.props.state.activeStep<this.props.steps.length) {
        this.props.handler({
          name: 'activeStep',
          value: this.props.state.activeStep + 1
        })
    }
  };

  // handleBack = () => {
  //   if (this.props.state.activeStep > 0) {
  //     this.props.handler({
  //       name: 'activeStep',
  //       value: this.props.state.activeStep - 1,
  //     })
  //   }
  // };

  handleReset = () => {
    this.props.handler({
      name: 'activeStep',
      value: 0
    })
  };

  // handleStepButton = classes => {
  //   if (this.props.state.activeStep===0) {
  //     return (
  //       <Button
  //         variant="contained"
  //         color="primary"
  //         onClick={this.handleNext} >Lanjutkan
  //       </Button>
  //     )
  //   } else if (this.props.state.activeStep===this.steps.length) {
  //     return (
  //       <Button
  //         variant="contained"
  //         onClick={this.handleReset} >Reset
  //       </Button>
  //     )
  //   } else {
  //     return (
  //       <div>
  //         <Button
  //           variant="contained"
  //           onClick={this.handleBack}
  //           className={classes.backButton} >Kembali
  //         </Button>
  //         <Button
  //           variant="contained"
  //           color="primary"
  //           onClick={this.handleNext} >{this.props.state.activeStep === this.props.steps.length - 1 ? 'Proses' : 'Lanjutkan'}
  //         </Button>
  //       </div>
  //     )
  //   }
  // };

  handleCheckboxChange = name => event => {
    //Data - data
    // Pilih Semua
    if (name === 'all') {
      if(event.target.checked) {
        this.props.handler({name: 'all', value: true})
      } else {
        this.props.handler({name: 'all', value: true})
      }
    }
    // Accounts
    if(name === 'accounts' || name === 'accountBeginningBalances' || name === 'receivableBeginningBalances' || name === 'payableBeginningBalances' || name === 'all') {
      if(event.target.checked) {
        this.props.handler({name: 'accounts',value: true})
        axios.get('/accounts', {
          headers: {
            'database': this.props.state.originSlug
          }
        })
        .then(res => {
          this.props.handler({name: 'accountCountAll', value: res.data.count})
          console.log(res.data.count)
        })
      } else {
        this.props.handler({name: 'accounts',value: false})
        this.props.handler({name: 'accountCountAll', value: 0})
      }
    }

    // Contacts
    if(name === 'contacts' || name === 'receivableBeginningBalances' || name === 'payableBeginningBalances' || name === 'all') {
      if(event.target.checked) {
        this.props.handler({name: 'contacts',value: true})
        axios.get('/contacts', {
          headers: {
            'database': this.props.state.originSlug
          }
        })
        .then(res => {
          this.props.handler({name: 'contactCountAll', value: res.data.count})
          console.log(res.data.count)
        })
      } else {
        this.props.handler({name: 'contacts',value: false})
        this.props.handler({name: 'contactCountAll', value: 0})
      }
    }
    //Get Products
    if(name === 'products' || name === 'inventoryBeginningBalances' || name === 'all') {
      if(event.target.checked) {
        this.props.handler({name: 'products',value: true})
        axios.get('/products', {
          headers: {
            'database': this.props.state.originSlug
          }
        })
        .then(res => {
          this.props.handler({name: 'productCountAll', value: res.data.count})
          console.log(res.data.count)
        })
      } else {
        this.props.handler({name: 'products',value: false})
        this.props.handler({name: 'productCountAll', value: 0})
      }
    }
    // Get Taxes
    if(name === 'taxes' || name === 'all') {
      if(event.target.checked) {
        this.props.handler({name: 'taxes',value: true})
        axios.get('/taxes', {
          headers: {
            'database': this.props.state.originSlug
          }
        })
        .then(res => {
          this.props.handler({name: 'taxesCountAll', value: res.data.count})
          console.log(res.data.count)
        })
      } else {
        this.props.handler({name: 'taxes',value: false})
        this.props.handler({name: 'taxesCountAll', value: 0})
      }
    }
    // Departments
    if(name === 'departments' || name === 'accountBeginningBalances' || name === 'receivableBeginningBalances' || name === 'payableBeginningBalances' || name === 'all') {
     if(event.target.checked) {
        this.props.handler({name: 'departments',value: true})
        axios.get('/departments', {
          headers: {
            'database': this.props.state.originSlug
          }
        })
        .then(res => {
          this.props.handler({name: 'departmentCountAll', value: res.data.count})
          console.log(res.data.count)
        })
      } else {
        this.props.handler({name: 'departments',value: false})
        this.props.handler({name: 'departmentCountAll', value: 0})
      }
    }
    // Projects
    if(name === 'accountBeginningBalances' || name === 'projects' || name === 'receivableBeginningBalances' || name === 'payableBeginningBalances' || name === 'all') {
      if(event.target.checked) {
        this.props.handler({name: 'projects',value: true})
        axios.get('/projects', {
          headers: {
            'database': this.props.state.originSlug
          }
        })
        .then(res => {
          this.props.handler({name: 'projectCountAll', value: res.data.count})
          console.log(res.data.count)
        })
      } else {
        this.props.handler({name: 'projects',value: false})
        this.props.handler({name: 'projectCountAll', value: 0})
      }
    }
    // Warehouses
    if(name === 'warehouses' || name === 'inventoryBeginningBalances' || name === 'all') {
      if(event.target.checked) {
        this.props.handler({name: 'warehouses',value: true})
        axios.get('/warehouses', {
          headers: {
            'database': this.props.state.originSlug
          }
        })
        .then(res => {
          this.props.handler({name: 'warehouseCountAll', value: res.data.count})
          console.log(res.data.count)
        })
      } else {
        this.props.handler({name: 'warehouses',value: false})
        this.props.handler({name: 'warehouseCountAll', value: 0})
      }
    }
    // Fixes_Assets
    if(name === 'fixedAssets' || name === 'all') {
      if(event.target.checked) {
        this.props.handler({name: 'fixedAssets',value: true})
        axios.get('/fixed_assets', {
          headers: {
            'database': this.props.state.originSlug
          }
        })
        .then(res => {
          this.props.handler({name: 'fixedAssetCountAll', value: res.data.count})
          console.log(res.data.count)
        })
      } else {
        this.props.handler({name: 'fixedAssets',value: false})
        this.props.handler({name: 'fixedAssetCountAll', value: 0})
      }
    }
    // Saldo Awal
    // Get AccountBeginningBalances
    if(name === 'accountBeginningBalances' || name === 'all') {
      if(event.target.checked) {
        this.props.handler({name: 'accountBeginningBalances',value: true})
        axios.get('/account_beginning_balances', {
          headers: {
            'database': this.props.state.originSlug
          }
        })
        .then(res => {
          this.props.handler({name: 'accountBeginningBalanceCountAll', value: res.data.count})
          console.log(res.data.count)
        })
      } else {
        this.props.handler({name: 'accountBeginningBalances',value: false})
        this.props.handler({name: 'accountCountAll', value: 0})
      }
    }
    // ReceivableBeginningBalances
    if(name === 'receivableBeginningBalances' || name === 'all') {
      if(event.target.checked) {
        this.props.handler({name: 'receivableBeginningBalances',value: true})
        axios.get('/receivable_beginning_balances', {
          headers: {
            'database': this.props.state.originSlug
          }
        })
        .then(res => {
          this.props.handler({name: 'receivableBeginningBalanceCountAll', value: res.data.count})
          console.log(res.data.count)
        })
      } else {
        this.props.handler({name: 'receivableBeginningBalances',value: false})
        this.props.handler({name: 'receivableBeginningBalanceCountAll', value: 0})
      }
    }
    // PayableBeginningBalances
    if(name === 'payableBeginningBalances' || name === 'all') {
      if(event.target.checked) {
        this.props.handler({name: 'payableBeginningBalances',value: true})
        axios.get('/payable_beginning_balances', {
          headers: {
            'database': this.props.state.originSlug
          }
        })
        .then(res => {
          this.props.handler({name: 'payableBeginningBalanceCountAll', value: res.data.count})
          console.log(res.data.count)
        })
      } else {
        this.props.handler({name: 'payableBeginningBalances',value: false})
        this.props.handler({name: 'payableBeginningBalanceCountAll', value: 0})
      }
    }
    // Sales
    if(name === 'salesPrepaymentBeginningBalances' || name === 'all') {
      if(event.target.checked) {
        this.props.handler({name: 'salesPrepaymentBeginningBalances',value: true})
        axios.get('/sales_prepayment_beginning_balances', {
          headers: {
            'database': this.props.state.originSlug
          }
        })
        .then(res => {
          this.props.handler({name: 'salesPrepaymentBeginningBalancesCountAll', value: res.data.count})
          console.log(res.data.count)
        })
      } else {
        this.props.handler({name: 'salesPrepaymentBeginningBalances',value: false})
        this.props.handler({name: 'salesPrepaymentBeginningBalancesCountAll', value: 0})
      }
    }
    // Purchases
    if(name === 'purchasesPrepaymentBeginningBalances' || name === 'all') {
      if(event.target.checked) {
        this.props.handler({name: 'purchasesPrepaymentBeginningBalances',value: true})
        axios.get('/purchases_prepayment_beginning_balances', {
          headers: {
            'database': this.props.state.originSlug
          }
        })
        .then(res => {
          this.props.handler({name: 'purchasesPrepaymentBeginningBalancesCountAll', value: res.data.count})
          console.log(res.data.count)
        })
      } else {
        this.props.handler({name: 'purchasesPrepaymentBeginningBalances',value: false})
        this.props.handler({name: 'purchasesPrepaymentBeginningBalancesCountAll', value: 0})
      }
    }
    // Inventory
    if(name === 'inventoryBeginningBalances' || name === 'all') {
      if(event.target.checked) {
        this.props.handler({name: 'inventoryBeginningBalances',value: true})
        axios.get('/inventory_beginning_balances', {
          headers: {
            'database': this.props.state.originSlug
          }
        })
        .then(res => {
          this.props.handler({name: 'inventoryBeginningBalanceCountAll', value: res.data.count})
          console.log(res.data.count)
        })
      } else {
        this.props.handler({name: 'inventoryBeginningBalances',value: false})
        this.props.handler({name: 'inventoryBeginningBalanceCountAll', value: 0})
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
                  onChange={this.handleCheckboxChange('all')}
                  value='all' />
              }
              label="Pilih Semua"
            />
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
                  checked={this.props.state.salesPrepaymentBeginningBalances}
                  onChange={this.handleCheckboxChange('salesPrepaymentBeginningBalances')}
                  value="salesPrepaymentBeginningBalances"
                />
              }
              label="Penjualan"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.props.state.purchasesPrepaymentBeginningBalances}
                  onChange={this.handleCheckboxChange('purchasesPrepaymentBeginningBalances')}
                  value="purchasesPrepaymentBeginningBalances"
                />
              }
              label="Pembelian"
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
         <div style={{ width: '100%', textAlign: 'right' }}>
          <Button onClick={this.handleBack} variant="contained" color='default' style={{margin: '10px 10px 0 0'}}>
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
export default SelectData;
