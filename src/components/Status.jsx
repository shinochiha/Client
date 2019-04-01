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
    accounts: [],
    contacts: [],
    loadingAccount: 0,
    loadingContact: 0,
};

    handleBack = () => {
    if (this.props.state.activeStep > 0) {
      this.props.handler({
        name: 'activeStep',
        value: this.props.state.activeStep - 1,
      })
    }
  };

  componentDidMount() {
    this.setState({
      accounts : this.props.state.accountCountAll,
      contacts : this.props.state.contactCountAll,
    })
    // this.timer = setInterval(this.progress, 500);
  }

  // componentWillUnmount() {
  //   clearInterval(this.timer);
  // }

  handleNext = () => {
  let skip = this.state.skip + 1
  this.setState({
    skip: skip
  })
   if (this.props.state.accounts === true) {
    // Accounts
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
              slug: 'a'
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

    if (this.props.state.contacts === true) {
    // Contacts
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
              slug: 'a'
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
    if (this.state.loadingAccount !== this.props.state.accountCountAll && this.state.loadingContact !== this.props.state.contactCountAll) {
      return false
    } else {
      return true
    }
  }
  render() {
    const { classes } = this.props;
    const { accountCountAll, accountCountSynced, accountCountFailed } = this.props.state;
    const { contactCountAll, contactCountSynced, contactCountFailed } = this.props.state;
    const accounts = this.state.loadingAccount / accountCountAll * 100
    const contacts = this.state.loadingContact / contactCountAll * 100
    return (
      <div className={classes.root}>
        <h2>Data - Data</h2>
        <p><b>Akun:</b> {this.state.loadingAccount} / {accountCountAll}</p>
        <p><b>Success:</b> {accountCountSynced}</p>
        <p><b>Failed:</b> <a href="https://www.npmjs.com/package/export-to-csv">{accountCountFailed}</a></p>
        <LinearProgress variant="buffer" value={accounts} valueBuffer={this.state.loadingAccount} />
        <br/>
        <p><b>Akun:</b> {this.state.loadingContact} / {contactCountAll}</p>
        <p><b>Success:</b> {contactCountSynced}</p>
        <p><b>Failed:</b> <a href="https://www.npmjs.com/package/export-to-csv">{contactCountFailed}</a></p>
        <LinearProgress variant="buffer" value={contacts} valueBuffer={this.state.loadingContact} />
          <div style={{ width: '100%', textAlign: 'right' }}>
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