import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Mount({ dispatch }) {
  const gotoList = () => dispatch({
    type: 'gotoPage',
    payload: 'list'
  });
  const mount = () => dispatch({
    type: 'mount'
  });
  return (
    <div className="main mount-page">
      <a className="btn btn-close" onClick={gotoList}>
        <i className="icon icon-close" />
      </a>
      <a className="btn-activate" onClick={mount}>
        <i className="icon icon-rocket" />
        <span>Activate</span>
      </a>
    </div>
  );
}

Mount.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(Mount);
