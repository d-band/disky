import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function NoData({ dispatch }) {
  const refresh = () => dispatch({
    type: 'getMedias'
  });
  return (
    <div className="no-data">
      <h3>No flash disk</h3>
      <p>Refresh by clicking below button</p>
      <p>
        <a className="btn btn-refresh" onClick={refresh}>
          <i className="icon icon-refresh" />
        </a>
      </p>
    </div>
  );
}

NoData.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(NoData);
