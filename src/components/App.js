import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapState, mapActions } from 'yax';
import List from './List';
import Mount from './Mount';

class App extends Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    page: PropTypes.string.isRequired,
    getMedias: PropTypes.func.isRequired
  };
  componentWillMount() {
    this.props.getMedias();
  }
  render() {
    const { mode, page } = this.props;
    return (
      <div className={mode === 'dark' ? 'dark' : 'light'}>
        {page === 'list' ? <List /> : <Mount />}
      </div>
    );
  }
}

export default connect(
  mapState({ mode: 'mode', page: 'page' }),
  mapActions({ getMedias: 'getMedias' })
)(App);
