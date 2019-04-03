import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class Status extends React.Component {
  state = {
    skip: 0,
    accounts: this.props.state.accountCountAll,
    contacts: this.props.state.contactCountAll,
    loadingAccount: 0,
    loadingContact: 0,
};

  handlePrevious = () => {
    this.props.handler({
      name: 'activeStep',
      value: 2,
    })
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

  handleNext = () => {
  let skip = this.state.skip + 1
  this.setState({
    skip: skip
  })
    // Accounts
   if (this.props.state.accounts === true) {
    for (let i = 0; i < this.props.state.accountCountAll; i++) {
      axios.post('/accounts', {
        skip: i,
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
        loadingAccount: this.state.loading + 1
      })
        this.props.handler({'name':'accountCountFailed', 'value': this.props.state.accountCountFailed + 1})
        console.log(err.response.data.response.error.message);
      });
    }
  }

    // Contacts
    if (this.props.state.contacts === true) {
    for (let i = 0; i < this.props.state.contactCountAll; i++) {
      axios.post('/contacts', {
        skip: i,
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
    }
  }
};

  disableButton = () => {
    // if (this.state.loadingAccount !== this.props.state.accountCountAll && this.state.loadingContact !== this.props.state.contactCountAll) {
    if (this.state.loadingAccount === 0 && this.state.loadingContact === 0) {
      return false
    } else {
      return true
    }
  }
  render() {
    const { classes } = this.props;
    const { accounts, accountCountAll, accountCountSynced, accountCountFailed } = this.props.state;
    const { contacts, contactCountAll, contactCountSynced, contactCountFailed } = this.props.state;
    const account = this.state.loadingAccount / accountCountAll * 100
    const contact = this.state.loadingContact / contactCountAll * 100
    return (
      <div className={classes.root}>
        <h2>Data - Data</h2>
        { 
          accounts === true ?
          <div>
            <p><b>Akun:</b> {this.state.loadingAccount} / {accountCountAll}</p>
            <p><b>Success:</b> {accountCountSynced}</p>
            <p><b>Failed:</b> <a href="https://www.npmjs.com/package/export-to-csv" target="_blank">{accountCountFailed}</a></p>
            <LinearProgress variant="buffer" value={account} valueBuffer={this.state.loadingAccount} />
            <br/>
          </div>  
          : ''
        }
        {
          contacts === true ?
        <div>
          <p><b>Kontak:</b> {this.state.loadingContact} / {contactCountAll}</p>
          <p><b>Success:</b> {contactCountSynced}</p>
          <p><b>Failed:</b> <a href="https://www.npmjs.com/package/export-to-csv" target="_blank">{contactCountFailed}</a></p>
          <LinearProgress variant="buffer" value={contact} valueBuffer={this.state.loadingContact} />
          <br/>
        </div>
        : ''
        }
          <div style={{ width: '100%', textAlign: 'right' }}>
            <Button onClick={this.handlePrevious} variant="contained" color='default' style={{margin: '10px 10px 0 0'}}>
              Kembali
            </Button>
            <Button disabled={this.disableButton()} onClick={this.handleNext} variant="contained" color='primary' style={{margin: '10px 0 0 0'}}>
              Prosess
            </Button>
          </div>
        </div>
    );
  }
}

Status.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Status);