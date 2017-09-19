import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ipcRenderer, remote } from 'electron';

function Header({ mode, dispatch }) {
  const refresh = () => dispatch({
    type: 'getMedias'
  });
  const openMenu = () => {
    ipcRenderer.send('open-menu', mode);
  };
  const hide = () => {
    remote.app.hide();
  };
  return (
    <div className="header">
      <div className="left">
        <a className="btn-close" onClick={hide}>&#x2715;</a>
      </div>
      <div className="title">Disky</div>
      <div className="right">
        <a className="btn" onClick={refresh}><i className="icon icon-refresh" /></a>
        <a className="btn" onClick={openMenu}><i className="icon icon-more" /></a>
      </div>
    </div>
  );
}

Header.propTypes = {
  mode: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(({ mode }) => ({ mode }))(Header);
