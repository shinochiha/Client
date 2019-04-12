import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import * as Promise from 'bluebird';
// import { CSVLink, CSVDownload } from "react-csv";

const styles = {
  root: {
    flexGrow: 1,
  },
};

class Status extends React.Component {
  state = {
    skip: 0,
    loadingAccount: 0,
    loadingContact: 0,
    loadingProduct: 0,
    loadingTaxes: 0,
    loadingDepartment: 0,
    loadingProject: 0,
    loadingWarehouse: 0,
    loadingFixedAsset: 0,
    loadingAccountBalance: 0,
    loadingReceivableBalance: 0,
    loadingPayableBalance: 0,
    loadingSalesBalance: 0,
    loadingPurchasesBalance: 0,
    loadingInventoryBalance: 0,
    fethContacts: false,
};

  handlePrevious = () => {
    // kembali ke step berikutnya
    this.props.handler({
      name: 'activeStep',
      value: 2,
    })
      // jika klik tombol kembali success di set menjadi 0 kembali
      this.props.handler({name: 'accountCountSynced', value: 0})
      this.props.handler({name: 'contactCountSynced', value: 0})
      this.props.handler({name: 'productCountSynced', value: 0})
      this.props.handler({name: 'taxeCountSynced', value: 0})
      this.props.handler({name: 'departmentCountSynced', value: 0})
      this.props.handler({name: 'projectCountSynced', value: 0})
      this.props.handler({name: 'warehouseCountSynced', value: 0})
      this.props.handler({name: 'fixedAssetCountSynced', value: 0})
      this.props.handler({name: 'accountBeginningBalanceCountSynced', value: 0})
      this.props.handler({name: 'receivableBeginningBalanceCountSynced', value: 0})
      this.props.handler({name: 'payableBeginningBalanceCountSynced', value: 0})
      this.props.handler({name: 'salesPrepaymentBeginningBalanceCountSynced', value: 0})
      this.props.handler({name: 'purchasesPrepaymentBeginningBalanceCountSynced', value: 0})
      this.props.handler({name: 'inventoryBeginningBalanceCountSynced', value: 0})
      //jika klik tombol kembali failed akan di set menjadi 0 kembali
      this.props.handler({name: 'accountCountFailed', value: 0})
      this.props.handler({name: 'contactCountFailed', value: 0})
      this.props.handler({name: 'productCountFailed', value: 0})
      this.props.handler({name: 'taxeCountFailed', value: 0})
      this.props.handler({name: 'departmentCountFailed', value: 0})
      this.props.handler({name: 'projectCountFailed', value: 0})
      this.props.handler({name: 'warehouseCountFailed', value: 0})
      this.props.handler({name: 'fixedAssetCountFailed', value: 0})
      this.props.handler({name: 'accountBeginningBalanceCountFailed', value: 0})
      this.props.handler({name: 'receivableBeginningBalanceCountFailed', value: 0})
      this.props.handler({name: 'payableBeginningBalanceCountFailed', value: 0})
      this.props.handler({name: 'salesPrepaymentBeginningBalanceCountFailed', value: 0})
      this.props.handler({name: 'purchasesPrepaymentBeginningBalanceCountFailed', value: 0})
      this.props.handler({name: 'inventoryBeginningBalanceCountFailed', value: 0})
      // jika tombol kembali di klik semua centang kembali menjadi false
      this.props.handler({name: 'all', value: false})
      this.props.handler({name: 'accounts', value: false})
      this.props.handler({name: 'contacts', value: false})
      this.props.handler({name: 'products', value: false})
      this.props.handler({name: 'taxes', value: false})
      this.props.handler({name: 'departments', value: false})
      this.props.handler({name: 'projects', value: false})
      this.props.handler({name: 'warehouses', value: false})
      this.props.handler({name: 'fixedAssets', value: false})
      this.props.handler({name: 'accountBeginningBalances', value: false})
      this.props.handler({name: 'receivableBeginningBalances', value: false})
      this.props.handler({name: 'payableBeginningBalances', value: false})
      this.props.handler({name: 'salesPrepaymentBeginningBalances', value: false})
      this.props.handler({name: 'purchasesPrepaymentBeginningBalances', value: false})
      this.props.handler({name: 'inventoryBeginningBalances', value: false})
  };

  handlefethContact = () => {
      if (this.props.state.contacts === true) {
      let arr = [];
      let start = 0;
      while( start < this.props.state.contactCountAll) {
        arr.push(start++)
      }
      Promise.mapSeries(arr, (body) => {
        return axios.post('/contacts', {
        skip: body,
        token: this.props.state.accessToken,
          origin: {
              database: this.props.state.originSlug
          },
          destination: {
              type: this.props.state.destType,
              url: this.props.state.destUrl,
              slug: this.props.state.destSlug
          }
      })
      .then(res => {
      this.setState({
        loadingContact: this.state.loadingContact + 1
      })
        this.props.handler({'name':'contactCountSynced', 'value': this.props.state.contactCountSynced + 1})
        console.log(res.data)
      })
      .catch(err => {
      this.setState({
        loadingContact: this.state.loadingContact + 1
      })
        this.props.handler({'name':'contactCountFailed', 'value': this.props.state.contactCountFailed + 1})
        console.log(err.response.data.response.error.message);
      });
    })
  }
}

  handleNext = () => {
  let skip = this.state.skip + 1
  this.setState({
    skip: skip
  })
   // Accounts
   if (this.props.state.accounts === true) {
    let arr = [];
    let start = 0;
    while( start < this.props.state.accountCountAll) {
      arr.push(start++)
    }
    Promise.mapSeries(arr, (body) => {
      return axios.post('/accounts', {
        skip: body,
        token: this.props.state.accessToken,
          origin: {
              database: this.props.state.originSlug
          },
          destination: {
              type: this.props.state.destType,
              url: this.props.state.destUrl,
              slug: this.props.state.destSlug
          }
      })
      .then(res => {
      this.setState({
        loadingAccount: this.state.loadingAccount + 1
      })
        this.props.handler({'name':'accountCountSynced', 'value': this.props.state.accountCountSynced + 1})
        console.log(res.data)
      })
      .catch(err => {
      this.setState({
        loadingAccount: this.state.loadingAccount + 1
      })
        this.props.handler({'name':'accountCountFailed', 'value': this.props.state.accountCountFailed + 1})
        console.log(err.response.data.response.error.message);
      });
    })
    .then(res => {
          this.handlefethContact()
      })
  } 
   
    // Contacts
 /**   if (this.props.state.contacts === true) {
      let arr = [];
      let start = 0;
      while( start < this.props.state.contactCountAll) {
        arr.push(start++)
      }
      Promise.mapSeries(arr, (body) => {
        return axios.post('/contacts', {
        skip: body,
        token: this.props.state.accessToken,
          origin: {
              database: this.props.state.originSlug
          },
          destination: {
              type: this.props.state.destType,
              url: this.props.state.destUrl,
              slug: this.props.state.destSlug
          }
      })
      .then(res => {
      this.setState({
        loadingContact: this.state.loadingContact + 1
      })
        this.props.handler({'name':'contactCountSynced', 'value': this.props.state.contactCountSynced + 1})
        console.log(res.data)
      })
      .catch(err => {
      this.setState({
        loadingContact: this.state.loadingContact + 1
      })
        this.props.handler({'name':'contactCountFailed', 'value': this.props.state.contactCountFailed + 1})
        console.log(err.response.data.response.error.message);
      });
    })
  } **/
    
  // Products
  if (this.props.state.products === true) {
    let arr = [];
    let start = 0;
    while( start < this.props.state.productCountAll ) {
      arr.push(start++)
    }
    Promise.mapSeries(arr, (body) => {
      return axios.post('/products', {
        skip: body,
        token: this.props.state.accessToken,
          origin: {
              database: this.props.state.originSlug
          },
          destination: {
              type: this.props.state.destType,
              url: this.props.state.destUrl,
              slug: this.props.state.destSlug
          }
      })
      .then(res => {
      this.setState({
        loadingProduct: this.state.loadingProduct + 1
      })
        this.props.handler({'name':'productCountSynced', 'value': this.props.state.productCountSynced + 1})
        console.log(res.data)
      })
      .catch(err => {
      this.setState({
        loadingProduct: this.state.loadingProduct + 1
      })
        this.props.handler({'name':'productCountFailed', 'value': this.props.state.productCountFailed + 1})
        console.log(err.response.data.response.error.message);
      });
    })
  }

  // Taxes
  if (this.props.state.taxes === true) {
    let arr = [];
    let start = 0;
    while( start < this.props.state.taxeCountAll) {
      arr.push(start++)
    }
    Promise.mapSeries(arr ,(body) => {
      return axios.post('/taxes', {
        skip: body,
        token: this.props.state.accessToken,
          origin: {
              database: this.props.state.originSlug
          },
          destination: {
              type: this.props.state.destType,
              url: this.props.state.destUrl,
              slug: this.props.state.destSlug
          }
      })
      .then(res => {
      this.setState({
        loadingTaxes: this.state.loadingTaxes + 1
      })
        this.props.handler({'name':'taxeCountSynced', 'value': this.props.state.taxeCountSynced + 1})
        console.log(res.data)
      })
      .catch(err => {
      this.setState({
        loadingTaxes: this.state.loadingTaxes + 1
      })
        this.props.handler({'name':'taxeCountFailed', 'value': this.props.state.taxeCountFailed + 1})
        console.log(err.response.data.response.error.message);
      });
    })
  }

  //Departments
  if (this.props.state.departments === true) {
    let arr = [];
    let start = 0;
    while( start < this.props.state.departmentCountAll ) {
      arr.push(start++)
    }
    Promise.mapSeries(arr, (body) => {
      return axios.post('/departments', {
        skip: body,
        token: this.props.state.accessToken,
          origin: {
              database: this.props.state.originSlug
          },
          destination: {
              type: this.props.state.destType,
              url: this.props.state.destUrl,
              slug: this.props.state.destSlug
          }
      })
      .then(res => {
      this.setState({
        loadingDepartment: this.state.loadingDepartment + 1
      })
        this.props.handler({'name':'departmentCountSynced', 'value': this.props.state.departmentCountSynced + 1})
        console.log(res.data)
      })
      .catch(err => {
      this.setState({
        loadingDepartment: this.state.loadingDepartment + 1
      })
        this.props.handler({'name':'departmentCountFailed', 'value': this.props.state.departmentCountFailed + 1})
        console.log(err.response.data.response.error.message);
      });
    })
  }

  // Projects
  if (this.props.state.projects === true) {
    let arr = [];
    let start = 0;
    while( start < this.props.state.projectCountAll ) {
      arr.push(start++)
    }
    Promise.mapSeries(arr, (body) => {
      return axios.post('/projects', {
        skip: body,
        token: this.props.state.accessToken,
          origin: {
              database: this.props.state.originSlug
          },
          destination: {
              type: this.props.state.destType,
              url: this.props.state.destUrl,
              slug: this.props.state.destSlug
          }
      })
      .then(res => {
      this.setState({
        loadingProject: this.state.loadingProject + 1
      })
        this.props.handler({'name':'projectCountSynced', 'value': this.props.state.projectCountSynced + 1})
        console.log(res.data)
      })
      .catch(err => {
      this.setState({
        loadingProject: this.state.loadingProject + 1
      })
        this.props.handler({'name':'projectCountFailed', 'value': this.props.state.projectCountFailed + 1})
        console.log(err.response.data.response.error.message);
      });
    })
  }

  // Warehouses
  if (this.props.state.warehouses === true) {
    let arr = [];
    let start = 0;
    while( start < this.props.state.warehouseCountAll ) {
      arr.push(start++)
    }
    Promise.mapSeries(arr, (body) => {
      return axios.post('/warehouses', {
        skip: body,
        token: this.props.state.accessToken,
          origin: {
              database: this.props.state.originSlug
          },
          destination: {
              type: this.props.state.destType,
              url: this.props.state.destUrl,
              slug: this.props.state.destSlug
          }
      })
      .then(res => {
      this.setState({
        loadingWarehouse: this.state.loadingWarehouse + 1
      })
        this.props.handler({'name':'warehouseCountSynced', 'value': this.props.state.warehouseCountSynced + 1})
        console.log(res.data)
      })
      .catch(err => {
      this.setState({
        loadingWarehouse: this.state.loadingWarehouse + 1
      })
        this.props.handler({'name':'warehouseCountFailed', 'value': this.props.state.warehouseCountFailed + 1})
        console.log(err.response.data.response.error.message);
      });
    })
  }

  // fixedAssets
  if (this.props.state.fixedAssets === true) {
    let arr = [];
    let start = 0;
    while( start < this.props.state.fixedAssetCountAll ) {
      arr.push(start++)
    }
    Promise.mapSeries(arr, (body) => {
      return axios.post('/fixed_assets', {
        skip: body,
        token: this.props.state.accessToken,
          origin: {
              database: this.props.state.originSlug
          },
          destination: {
              type: this.props.state.destType,
              url: this.props.state.destUrl,
              slug: this.props.state.destSlug
          }
      })
      .then(res => {
      this.setState({
        loadingFixedAsset: this.state.loadingFixedAsset + 1
      })
        this.props.handler({'name':'fixedAssetCountSynced', 'value': this.props.state.fixedAssetCountSynced + 1})
        console.log(res.data)
      })
      .catch(err => {
      this.setState({
        loadingFixedAsset: this.state.loadingFixedAsset + 1
      })
        this.props.handler({'name':'fixedAssetCountFailed', 'value': this.props.state.fixedAssetCountFailed + 1})
        console.log(err.response.data.response.error.message);
      });
    })
  }

  // AccountBeginningBalances
  if (this.props.state.accountBeginningBalances === true) {
    let arr = [];
    let start = 0;
    while( start < this.props.state.accountBeginningBalanceCountAll ) {
      arr.push(start++)
    }
    Promise.mapSeries(arr, (body) => {
      return axios.post('/account_beginning_balances', {
        skip: body,
        token: this.props.state.accessToken,
          origin: {
              database: this.props.state.originSlug
          },
          destination: {
              type: this.props.state.destType,
              url: this.props.state.destUrl,
              slug: this.props.state.destSlug
          }
      })
      .then(res => {
      this.setState({
        loadingAccountBalance: this.state.loadingAccountBalance + 1
      })
        this.props.handler({'name':'accountBeginningBalanceCountSynced', 'value': this.props.state.accountBeginningBalanceCountSynced + 1})
        console.log(res.data)
      })
      .catch(err => {
      this.setState({
        loadingAccountBalance: this.state.loadingAccountBalance + 1
      })
        this.props.handler({'name':'accountBeginningBalanceCountFailed', 'value': this.props.state.accountBeginningBalanceCountFailed + 1})
        console.log(err.response.data.response.error.message);
      });
    })
  }

  // ReceivableBeginningBalances
  if (this.props.state.receivableBeginningBalances === true) {
    let arr = [];
    let start = 0;
    while( start < this.props.state.receivableBeginningBalanceCountAll ) {
      arr.push(start++)
    }
    Promise.mapSeries(arr, (body) => {
      return axios.post('/receivable_beginning_balances', {
        skip: body,
        token: this.props.state.accessToken,
          origin: {
              database: this.props.state.originSlug
          },
          destination: {
              type: this.props.state.destType,
              url: this.props.state.destUrl,
              slug: this.props.state.destSlug
          }
      })
      .then(res => {
      this.setState({
        loadingReceivableBalance: this.state.loadingReceivableBalance + 1
      })
        this.props.handler({'name':'receivableBeginningBalanceCountSynced', 'value': this.props.state.receivableBeginningBalanceCountSynced + 1})
        console.log(res.data)
      })
      .catch(err => {
      this.setState({
        loadingReceivableBalance: this.state.loadingReceivableBalance + 1
      })
        this.props.handler({'name':'receivableBeginningBalanceCountFailed', 'value': this.props.state.receivableBeginningBalanceCountFailed + 1})
        console.log(err.response.data.response.error.message);
      });
    })
  }

  // PayableBeginningBalance
  if (this.props.state.payableBeginningBalances === true) {
    let arr = [];
    let start = 0;
    while( start < this.props.state.payableBeginningBalanceCountAll ) {
      arr.push(start++)
    }
    Promise.mapSeries(arr, (body) => {
      return axios.post('/payable_beginning_balances', {
        skip: body,
        token: this.props.state.accessToken,
          origin: {
              database: this.props.state.originSlug
          },
          destination: {
              type: this.props.state.destType,
              url: this.props.state.destUrl,
              slug: this.props.state.destSlug
          }
      })
      .then(res => {
      this.setState({
        loadingPayableBalance: this.state.loadingPayableBalance + 1
      })
        this.props.handler({'name':'payableBeginningBalanceCountSynced', 'value': this.props.state.payableBeginningBalanceCountSynced + 1})
        console.log(res.data)
      })
      .catch(err => {
      this.setState({
        loadingPayableBalance: this.state.loadingPayableBalance + 1
      })
        this.props.handler({'name':'payableBeginningBalanceCountFailed', 'value': this.props.state.payableBeginningBalanceCountFailed + 1})
        console.log(err.response.data.response.error.message);
      });
    })
  }

  // SalesPrepaymentBeginningBalances
  if (this.props.state.salesPrepaymentBeginningBalances === true) {
    let arr = [];
    let start = 0;
    while( start < this.props.state.salesPrepaymentBeginningBalanceCountAll ) {
      arr.push(start++)
    }
    Promise.mapSeries(arr, (body) => {
      return axios.post('/sales_prepayment_beginning_balances', {
        skip: body,
        token: this.props.state.accessToken,
          origin: {
              database: this.props.state.originSlug
          },
          destination: {
              type: this.props.state.destType,
              url: this.props.state.destUrl,
              slug: this.props.state.destSlug
          }
      })
      .then(res => {
      this.setState({
        loadingSalesBalance: this.state.loadingSalesBalance + 1
      })
        this.props.handler({'name':'salesPrepaymentBeginningBalanceCountSynced', 'value': this.props.state.salesPrepaymentBeginningBalanceCountSynced + 1})
        console.log(res.data)
      })
      .catch(err => {
      this.setState({
        loadingSalesBalance: this.state.loadingSalesBalance + 1
      })
        this.props.handler({'name':'salesPrepaymentBeginningBalanceCountFailed', 'value': this.props.state.salesPrepaymentBeginningBalanceCountFailed + 1})
        console.log(err.response.data.response.error.message);
      });
    })
  }

  // PurchasesPrepaymentBeginningBalances
  if (this.props.state.purchasesPrepaymentBeginningBalances === true) {
    let arr = [];
    let start = 0;
    while( start < this.props.state.purchasesPrepaymentBeginningBalanceCountAll ) {
      arr.push(start++)
    }
    Promise.mapSeries(arr, (body) => {
      return axios.post('/purchases_prepayment_beginning_balances', {
        skip: body,
        token: this.props.state.accessToken,
          origin: {
              database: this.props.state.originSlug
          },
          destination: {
              type: this.props.state.destType,
              url: this.props.state.destUrl,
              slug: this.props.state.destSlug
          }
      })
      .then(res => {
      this.setState({
        loadingPurchasesBalance: this.state.loadingPurchasesBalance + 1
      })
        this.props.handler({'name':'purchasesPrepaymentBeginningBalanceCountSynced', 'value': this.props.state.purchasesPrepaymentBeginningBalanceCountSynced + 1})
        console.log(res.data)
      })
      .catch(err => {
      this.setState({
        loadingPurchasesBalance: this.state.loadingPurchasesBalance + 1
      })
        this.props.handler({'name':'purchasesPrepaymentBeginningBalanceCountFailed', 'value': this.props.state.purchasesPrepaymentBeginningBalanceCountFailed + 1})
        console.log(err.response.data.response.error.message);
      });
    })
  }

  // InventoryBeginningBalances
  if (this.props.state.inventoryBeginningBalances === true) {
    let arr = [];
    let start = 0;
    while( start < this.props.state.inventoryBeginningBalanceCountAll ) {
      arr.push(start++)
    }
    Promise.mapSeries(arr, (body) => {
      return axios.post('/inventory_beginning_balances', {
        skip: body,
        token: this.props.state.accessToken,
          origin: {
              database: this.props.state.originSlug
          },
          destination: {
              type: this.props.state.destType,
              url: this.props.state.destUrl,
              slug: this.props.state.destSlug
          }
      })
      .then(res => {
      this.setState({
        loadingInventoryBalance: this.state.loadingInventoryBalance + 1
      })
        this.props.handler({'name':'inventoryBeginningBalanceCountSynced', 'value': this.props.state.inventoryBeginningBalanceCountSynced + 1})
        console.log(res.data)
      })
      .catch(err => {
      this.setState({
        loadingInventoryBalance: this.state.loadingInventoryBalance + 1
      })
        this.props.handler({'name':'inventoryBeginningBalanceCountFailed', 'value': this.props.state.inventoryBeginningBalanceCountFailed + 1})
        console.log(err.response.data.response.error.message);
      });
    })
  }
};

  disableButton = () => {
    if (this.state.loadingAccount === 0 && this.state.loadingContact === 0 && this.state.loadingProduct === 0 && this.state.loadingTaxes === 0 && this.state.loadingDepartment === 0 && this.state.loadingProject === 0 && this.state.loadingWarehouse === 0 && this.state.loadingFixedAsset === 0 && this.state.loadingAccountBalance === 0 && this.state.loadingReceivableBalance === 0 && this.state.loadingPayableBalance === 0 && this.state.loadingSalesBalance === 0 && this.state.loadingPurchasesBalance === 0 && this.state.loadingInventoryBalance === 0) {
      return false
    } else {
      return true
    }
  }
  render() {
    const { classes } = this.props;
    const { all ,accounts, accountCountAll, accountCountSynced, accountCountFailed } = this.props.state;
    const { contacts, contactCountAll, contactCountSynced, contactCountFailed } = this.props.state;
    const { products, productCountAll, productCountSynced, productCountFailed } = this.props.state;
    const { taxes, taxeCountAll, taxeCountSynced, taxeCountFailed } = this.props.state;
    const { departments, departmentCountAll, departmentCountSynced, departmentCountFailed } = this.props.state;
    const { projects, projectCountAll, projectCountSynced, projectCountFailed } = this.props.state;
    const { warehouses, warehouseCountAll, warehouseCountSynced, warehouseCountFailed } = this.props.state;
    const { fixedAssets, fixedAssetCountAll, fixedAssetCountSynced, fixedAssetCountFailed } = this.props.state;
    const { accountBeginningBalances, accountBeginningBalanceCountAll, accountBeginningBalanceCountSynced, accountBeginningBalanceCountFailed } = this.props.state;
    const { receivableBeginningBalances, receivableBeginningBalanceCountAll, receivableBeginningBalanceCountSynced, receivableBeginningBalanceCountFailed } = this.props.state;
    const { payableBeginningBalances, payableBeginningBalanceCountAll, payableBeginningBalanceCountSynced, payableBeginningBalanceCountFailed } = this.props.state;
    const { salesPrepaymentBeginningBalances, salesPrepaymentBeginningBalanceCountAll, salesPrepaymentBeginningBalanceCountSynced, salesPrepaymentBeginningBalanceCountFailed } = this.props.state;
    const { purchasesPrepaymentBeginningBalances, purchasesPrepaymentBeginningBalanceCountAll, purchasesPrepaymentBeginningBalanceCountSynced, purchasesPrepaymentBeginningBalanceCountFailed } = this.props.state;
    const { inventoryBeginningBalances, inventoryBeginningBalanceCountAll, inventoryBeginningBalanceCountSynced, inventoryBeginningBalanceCountFailed } = this.props.state;
    const account = this.state.loadingAccount / accountCountAll * 100
    const contact = this.state.loadingContact / contactCountAll * 100
    const product = this.state.loadingProduct / productCountAll * 100
    const tax = this.state.loadingTaxes / taxeCountAll * 100
    const department = this.state.loadingDepartment / departmentCountAll * 100
    const project = this.state.loadingProject / projectCountAll * 100
    const warehouse = this.state.loadingWarehouse / warehouseCountAll * 100
    const fixedAsset = this.state.loadingFixedAsset / fixedAssetCountAll * 100
    const accountBalance = this.state.loadingAccountBalance / accountBeginningBalanceCountAll * 100
    const receivableBalance = this.state.loadingReceivableBalance / receivableBeginningBalanceCountAll * 100
    const payableBalance = this.state.loadingPayableBalance / payableBeginningBalanceCountAll * 100
    const salesBalance = this.state.loadingSalesBalance / salesPrepaymentBeginningBalanceCountAll * 100
    const purchasesBalance = this.state.loadingPurchasesBalance / purchasesPrepaymentBeginningBalanceCountAll * 100
    const inventoryBalance = this.state.loadingInventoryBalance / inventoryBeginningBalanceCountAll * 100
    return (
      <div className={classes.root}>
        <h2>Data - Data</h2>
        {
          all === true || accounts === true || contacts === true || products === true || taxes === true || departments === true || projects === true || warehouses === true || fixedAssets === true || accountBeginningBalances === true || receivableBeginningBalances === true || payableBeginningBalances === true || salesPrepaymentBeginningBalances === true || purchasesPrepaymentBeginningBalances === true || inventoryBeginningBalances === true ?
          '' 
          : <h4>Ups,data kosong,.Silahkan pilih data yang ingin di import..</h4>
        }

        { 
          accounts === true ?
          <div>
            <p><b>Akun:</b> {this.state.loadingAccount} / {accountCountAll}</p>
          {
            this.state.loadingAccount === accountCountAll ?
            <div>
              <p><b>Success:</b> {accountCountSynced}</p>
              <p><b>Failed:</b> <a href="https://www.npmjs.com/package/export-to-csv">{accountCountFailed}</a></p>
            </div> : ''
          }
          <LinearProgress variant="buffer" value={account} valueBuffer={this.state.loadingAccount} />
          <br/>
          </div>  
          : ''
        }

        {
          contacts === true ?
        <div>
          <p><b>Kontak:</b> {this.state.loadingContact} / {contactCountAll}</p>
          {
            this.state.loadingContact === contactCountAll ?
            <div>
              <p><b>Success:</b> {contactCountSynced}</p>
              <p><b>Failed:</b> <a href="https://www.npmjs.com/package/export-to-csv">{contactCountFailed}</a></p>
            </div> : ''
          }
          <LinearProgress variant="buffer" value={contact} valueBuffer={this.state.loadingContact} />
          <br/>
        </div>
        : ''
        }

        {
          products === true ?
        <div>
          <p><b>Produk:</b> {this.state.loadingProduct} / {productCountAll}</p>
          {
            this.state.loadingProduct === productCountAll ?
            <div>
              <p><b>Success:</b> {productCountSynced}</p>
              <p><b>Failed:</b> <a href="https://www.npmjs.com/package/export-to-csv">{productCountFailed}</a></p>
            </div> : ''
          }
          <LinearProgress variant="buffer" value={product} valueBuffer={this.state.loadingProduct} />
          <br/>
        </div>
        : ''
        }

        {
          taxes === true ?
        <div>
          <p><b>Pajak:</b> {this.state.loadingTaxes} / {taxeCountAll}</p>
          {
            this.state.loadingTaxes === taxeCountAll ?
            <div>
              <p><b>Success:</b> {taxeCountSynced}</p>
              <p><b>Failed:</b> <a href="https://www.npmjs.com/package/export-to-csv">{taxeCountFailed}</a></p>
            </div> : ''
          }
          <LinearProgress variant="buffer" value={tax} valueBuffer={this.state.loadingTaxes} />
          <br/>
        </div>
        : ''
        }

        {
          departments === true ?
        <div>
          <p><b>Departemen:</b> {this.state.loadingDepartment} / {departmentCountAll}</p>
          {
            this.state.loadingDepartment === departmentCountAll ?
            <div>
              <p><b>Success:</b> {departmentCountSynced}</p>
              <p><b>Failed:</b> <a href="https://www.npmjs.com/package/export-to-csv">{departmentCountFailed}</a></p>
            </div> : ''
          }
          <LinearProgress variant="buffer" value={department} valueBuffer={this.state.loadingDepartment} />
          <br/>
        </div>
        : ''
        }

        {
          projects === true ?
        <div>
          <p><b>Proyek:</b> {this.state.loadingProject} / {projectCountAll}</p>
          {
            this.state.loadingProject === projectCountAll ?
            <div>
              <p><b>Success:</b> {projectCountSynced}</p>
              <p><b>Failed:</b> <a href="https://www.npmjs.com/package/export-to-csv">{projectCountFailed}</a></p>
            </div> : ''
          }
          <LinearProgress variant="buffer" value={project} valueBuffer={this.state.loadingProject} />
          <br/>
        </div>
        : ''
        }

        {
          warehouses === true ?
        <div>
          <p><b>Gudang:</b> {this.state.loadingWarehouse} / {warehouseCountAll}</p>
          {
            this.state.loadingWarehouse === warehouseCountAll ?
            <div>
              <p><b>Success:</b> {warehouseCountSynced}</p>
              <p><b>Failed:</b> <a href="https://www.npmjs.com/package/export-to-csv">{warehouseCountFailed}</a></p>
            </div> : ''
          }
          <LinearProgress variant="buffer" value={warehouse} valueBuffer={this.state.loadingWarehouse} />
          <br/>
        </div>
        : ''
        }

        {
          fixedAssets === true ?
        <div>
          <p><b>Harta Tetap:</b> {this.state.loadingFixedAsset} / {fixedAssetCountAll}</p>
          {
            this.state.loadingFixedAsset === fixedAssetCountAll ?
            <div>
              <p><b>Success:</b> {fixedAssetCountSynced}</p>
              <p><b>Failed:</b> <a href="https://www.npmjs.com/package/export-to-csv">{fixedAssetCountFailed}</a></p>
            </div> : ''
          }
          <LinearProgress variant="buffer" value={fixedAsset} valueBuffer={this.state.loadingFixedAsset} />
          <br/>
        </div>
        : ''
        }

        {
          accountBeginningBalances === true || receivableBeginningBalances === true || payableBeginningBalances === true || salesPrepaymentBeginningBalances === true || purchasesPrepaymentBeginningBalances === true || inventoryBeginningBalances === true ?
          <h2>Saldo Awal</h2>
          :
          ''
        }

        {
          accountBeginningBalances === true ?
        <div>
          <p><b>Akun:</b> {this.state.loadingAccountBalance} / {accountBeginningBalanceCountAll}</p>
          {
            this.state.loadingAccountBalance === accountBeginningBalanceCountAll ?
            <div>
              <p><b>Success:</b> {accountBeginningBalanceCountSynced}</p>
              <p><b>Failed:</b> <a href="https://www.npmjs.com/package/export-to-csv">{accountBeginningBalanceCountFailed}</a></p>
            </div> : ''
          }
          <LinearProgress variant="buffer" value={accountBalance} valueBuffer={this.state.loadingAccountBalance} />
          <br/>
        </div>
        : ''
        }

        {
          receivableBeginningBalances === true ?
        <div>
          <p><b>Piutang:</b> {this.state.loadingReceivableBalance} / {receivableBeginningBalanceCountAll}</p>
          {
            this.state.loadingReceivableBalance === receivableBeginningBalanceCountAll ?
            <div>
              <p><b>Success:</b> {receivableBeginningBalanceCountSynced}</p>
              <p><b>Failed:</b> <a href="https://www.npmjs.com/package/export-to-csv">{receivableBeginningBalanceCountFailed}</a></p>
            </div> : ''
          }
          <LinearProgress variant="buffer" value={receivableBalance} valueBuffer={this.state.loadingReceivableBalance} />
          <br/>
        </div>
        : ''
        }

        {
          payableBeginningBalances === true ?
        <div>
          <p><b>Utang:</b> {this.state.loadingPayableBalance} / {payableBeginningBalanceCountAll}</p>
          {
            this.state.loadingPayableBalance === payableBeginningBalanceCountAll ?
            <div>
              <p><b>Success:</b> {payableBeginningBalanceCountSynced}</p>
              <p><b>Failed:</b> <a href="https://www.npmjs.com/package/export-to-csv">{payableBeginningBalanceCountFailed}</a></p>
            </div> : ''
          }
          <LinearProgress variant="buffer" value={payableBalance} valueBuffer={this.state.loadingPayableBalance} />
          <br/>
        </div>
        : ''
        }

        {
          salesPrepaymentBeginningBalances === true ?
        <div>
          <p><b>Penjualan:</b> {this.state.loadingSalesBalance} / {salesPrepaymentBeginningBalanceCountAll}</p>
          {
            this.state.loadingSalesBalance === salesPrepaymentBeginningBalanceCountAll ?
            <div>
              <p><b>Success:</b> {salesPrepaymentBeginningBalanceCountSynced}</p>
              <p><b>Failed:</b> <a href="https://www.npmjs.com/package/export-to-csv">{salesPrepaymentBeginningBalanceCountFailed}</a></p>
            </div> : ''
          }
          <LinearProgress variant="buffer" value={salesBalance} valueBuffer={this.state.loadingSalesBalance} />
          <br/>
        </div>
        : ''
        }

        {
          purchasesPrepaymentBeginningBalances === true ?
        <div>
          <p><b>Pembelian:</b> {this.state.loadingPurchasesBalance} / {purchasesPrepaymentBeginningBalanceCountAll}</p>
          {
            this.state.loadingPurchasesBalance === purchasesPrepaymentBeginningBalanceCountAll ?
            <div>
              <p><b>Success:</b> {purchasesPrepaymentBeginningBalanceCountSynced}</p>
              <p><b>Failed:</b> <a href="https://www.npmjs.com/package/export-to-csv">{purchasesPrepaymentBeginningBalanceCountFailed}</a></p>
            </div> : ''
          }
          <LinearProgress variant="buffer" value={purchasesBalance} valueBuffer={this.state.loadingPurchasesBalance} />
          <br/>
        </div>
        : ''
        }

        {
          inventoryBeginningBalances === true ?
        <div>
          <p><b>Persediaan:</b> {this.state.loadingInventoryBalance} / {inventoryBeginningBalanceCountAll}</p>
          {
            this.state.loadingInventoryBalance === inventoryBeginningBalanceCountAll ?
            <div>
              <p><b>Success:</b> {inventoryBeginningBalanceCountSynced}</p>
              <p><b>Failed:</b> <a href="https://www.npmjs.com/package/export-to-csv">{inventoryBeginningBalanceCountFailed}</a></p>
            </div> : ''
          }
          <LinearProgress variant="buffer" value={inventoryBalance} valueBuffer={this.state.loadingInventoryBalance} />
          <br/>
        </div>
        : ''
        }

          <div style={{ width: '100%', textAlign: 'right' }}>
            <Button onClick={this.handlePrevious} variant="contained" color='default' style={{margin: '10px 10px 0 0'}}>
              Kembali
            </Button>
            {
              all === true || accounts === true || contacts === true || products === true || taxes === true || departments === true || projects === true || warehouses === true || fixedAssets === true || accountBeginningBalances === true || receivableBeginningBalances === true || payableBeginningBalances === true || salesPrepaymentBeginningBalances === true || purchasesPrepaymentBeginningBalances === true || inventoryBeginningBalances === true ?
            <Button disabled={this.disableButton()} onClick={this.handleNext} variant="contained" color='primary' style={{margin: '10px 0 0 0'}}>
              Prosess
            </Button>
            : ''
            }
          </div>
        </div>
    );
  }
}

Status.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Status);