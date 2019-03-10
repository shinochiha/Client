import React from 'react';

import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class Status extends React.Component {
  state = {
    accounts: [],
    contacts: [],
    buffer: 10,
  };

  componentDidMount() {
    axios.get('/accounts')
    .then(res => {
      this.setState({accounts: res.data.count})
    })
     axios.get('/contacts')
    .then(res => {
      this.setState({contacts: res.data.count})
    })
  }

  progress = () => {
    const { accounts } = this.state;
    if (accounts > accounts.length) {
      this.setState({ accounts: 0, buffer: 10 });
    } else {
      const diff = Math.random() * 10;
      const diff2 = Math.random() * 10;
      this.setState({ accounts: accounts + diff, buffer: accounts + diff + diff2 });
    }
  };

  progress2 = () => {
    const { contacts } = this.state;
    if (contacts > contacts.length) {
      this.setState({ contacts: 0, buffer: 10 });
    } else {
      const diff = Math.random() * 10;
      const diff2 = Math.random() * 10;
      this.setState({ contacts: contacts + diff, buffer: contacts + diff + diff2 });
    }
  };

  render() {
    const { classes } = this.props;
    const { accounts, contacts,buffer } = this.state;
    return (
      <div className={classes.root}>
        <p>Accounts: {this.state.accounts}</p>
        <LinearProgress variant="buffer" value={accounts} valueBuffer={buffer} />
        <br />
        <LinearProgress color="secondary" variant="buffer" value={accounts} valueBuffer={buffer} />
        <br />
        <p>Contacts: {this.state.contacts}</p>
        <LinearProgress variant="buffer" value={contacts} valueBuffer={buffer} />
        <br />
        <LinearProgress color="secondary" variant="buffer" value={contacts} valueBuffer={buffer} />
      </div>
    );
  }
}

Status.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Status);
