import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { shell } from 'electron';
import { mapState } from 'yax';
import Header from './Header';
import NoData from './NoData';

function List({ list, dispatch }) {
  const eject = (v) => {
    if (!v.mount) return;
    dispatch({ type: 'eject', payload: v.node });
  };
  const open = (v) => {
    if (!v.mount) return;
    shell.openExternal(`file://${v.mount}`);
  };
  return (
    <div className="list-page">
      <Header />
      <div className="main">
        {list.length ? null : <NoData />}
        {list.map(media => (
          <dl key={media.udid} className="list">
            <dt>{media.name}</dt>
            {media.volumes.map((v) => {
              const percent = 1 - ((v.free_bytes || 0) / v.size_bytes);
              const width = `${Math.floor(percent * 100)}%`;
              const meta = v.free ? `${v.free} free of ${v.size}` : v.size;
              return (
                <dd key={v.udid} className={v.writable && v.mount ? '' : 'disabled'}>
                  <div className="left" onClick={() => open(v)}>
                    <i className="icon icon-hardisk" />
                  </div>
                  <div className="info" onClick={() => open(v)}>
                    <div className="title">{v.name}</div>
                    <div className="progress">
                      <div className="percent" style={{ width }} />
                    </div>
                    <div className="meta">{meta}</div>
                  </div>
                  <div className="right" onClick={() => eject(v)}>
                    <i className="icon icon-eject" />
                  </div>
                </dd>
              );
            })}
          </dl>
        ))}
      </div>
    </div>
  );
}

List.propTypes = {
  list: PropTypes.array,
  dispatch: PropTypes.func.isRequired
};
List.defaultProps = {
  list: []
};

export default connect(
  mapState({ list: 'list' })
)(List);
