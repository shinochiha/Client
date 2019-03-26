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
    accounts: [],
    // contacts: [],
    // products: [],
    // departments: [],
    // projects: [],
    // taxes: [],
    // warehouses: [],
    // fixedAssets: [],
    // accountBeginningBalances: [],
    // receivableBeginningBalances: [],
    // payableBeginningBalances: [],
    // salesPrepaymentBeginningBalances: [],
    // purchasesPrepaymentBeginningBalances: [],
    // inventoryBeginningBalances: []
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
    //   contacts: this.props.state.contactCountAll, 
    //   products: this.props.state.productCountAll, 
    //   departments: this.props.state.departmentCountAll,
    //   projects: this.props.state.projectCountAll,
    //   taxes: this.props.state.taxesCountAll,
    //   warehouses: this.props.state.warehouseCountAll,
    //   fixedAssets: this.props.state.fixedAssetCountAll,
    //   accountBeginningBalances: this.props.state.accountBeginningBalanceCountAll,
    //   receivableBeginningBalances: this.props.state.receivableBeginningBalanceCountAll,
    //   payableBeginningBalances: this.props.state.payableBeginningBalanceCountAll,
    //   salesPrepaymentBeginningBalances: this.props.state.salesPrepaymentBeginningBalanceCountAll,
    //   purchasesPrepaymentBeginningBalances: this.props.state.purchasesPrepaymentBeginningBalanceCountAll, 
    //   inventoryBeginningBalances: this.props.state.inventoryBeginningBalanceCountAll
    })
    this.timer = setInterval(this.progress, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleNext = () => {
    if (this.props.state.accounts === true) {
      axios.post('/accounts', {
        skip: 12,
        token: this.props.state.accessToken,
          origin: {
              database: this.props.state.originSlug
          },
          destination: {
              url: this.props.state.destUrl,
              slug: this.props.state.destSlug
          }
      })
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error);
      });
    }
  };

  progress = () => {
    const { accounts } = this.state;
    if (accounts === 100) {
      this.setState({ accounts: 0});
    } else {
      const diff = Math.random() * 10;
      this.setState({ accounts: Math.min(accounts + diff, 100) });
    }
  };

  render() {
    const { classes } = this.props;
    const { accountCountAll } = this.props.state;
    const { accounts } = this.state;
    return (
      <div className={classes.root}>
        <h2>Data - Data</h2>
        <p>Akun: {accountCountAll}</p>
        <LinearProgress variant="determinate" value={accounts} />
        <br />
        <LinearProgress color="secondary" variant="determinate" value={accounts / 2}/>
          <div style={{ width: '100%', textAlign: 'right' }}>
            <Button onClick={this.handleNext} variant="contained" color='primary' style={{margin: '10px 0 0 0'}}>
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