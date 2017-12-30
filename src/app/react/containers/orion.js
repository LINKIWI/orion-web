import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Favicon from 'react-favicon';
import { Helmet } from 'react-helmet';
import { Spacing } from 'react-elemental';
import ControlPanelContainer from 'app/react/containers/control-panel';
import HeaderContainer from 'app/react/containers/header';
import MapContainer from 'app/react/containers/map';
import orionFavicon from 'resources/img/favicon';

/**
 * Main Orion interface container.
 */
const OrionContainer = ({ isCompact }) => {
  const baseStyle = {
    position: 'absolute',
    transition: 'all 0.15s ease',
    zIndex: 2,
  };

  const normalStyle = {
    right: 0,
  };

  const compactStyle = {
    left: 0,
    top: 0,
    width: '100%',
  };

  return (
    <div>
      <Helmet>
        <title>Orion</title>
      </Helmet>
      <Favicon url={orionFavicon} />

      <HeaderContainer />

      <div style={{ width: '100%', height: '100vh' }}>
        <MapContainer />

        <Spacing
          style={{
            ...baseStyle,
            ...isCompact ? compactStyle : normalStyle,
          }}
          top={!isCompact}
          right={!isCompact}
        >
          <ControlPanelContainer isCompact={isCompact} />
        </Spacing>
      </div>
    </div>
  );
};

OrionContainer.propTypes = {
  isCompact: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ context }) => ({
  isCompact: context.isCompact,
});

export default connect(mapStateToProps)(OrionContainer);
