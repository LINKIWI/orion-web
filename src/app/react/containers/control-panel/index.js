import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { spacing, Spacing } from 'react-elemental';
import DataSourceContainer from 'app/react/containers/control-panel/data-source';
import FiltersContainer from 'app/react/containers/control-panel/filters';
import Header from 'app/react/components/control-panel/header';
import OptionsContainer from 'app/react/containers/control-panel/options';

/**
 * Layout container for all control panel elements.
 */
class ControlPanelContainer extends Component {
  static propTypes = {
    isCompact: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      // Default to a non-expanded state if the device is compact
      isExpanded: !props.isCompact,
    };
  }

  root = React.createRef();

  toggleExpansionState = () => this.setState(({ isExpanded }) => {
    // When transitioning from an expanded to a contracted state, reset the scroll position
    if (isExpanded && this.root.current) {
      this.root.current.scrollTop = 0;
    }

    return { isExpanded: !isExpanded };
  });

  render() {
    const { isCompact } = this.props;
    const { isExpanded } = this.state;

    const baseStyle = {
      backgroundColor: 'white',
      maxHeight: '110px',
      opacity: 0.5,
      overflowX: 'hidden',
      overflowY: 'hidden',
      padding: `0 ${spacing.large}`,
      transition: 'all 0.3s ease',
      width: '500px',
    };

    const expandedStyle = {
      maxHeight: '100vh',
      opacity: 1,
      overflowY: 'auto',
    };

    const compactStyle = {
      boxSizing: 'border-box',
      maxHeight: '40px',
      height: '100vh',
      overflowX: 'hidden',
      overflowY: 'hidden',
      width: 'inherit',
    };

    return (
      <div
        ref={this.root}
        style={{
          ...baseStyle,
          ...isCompact && compactStyle,
          ...isExpanded && expandedStyle,
        }}
      >
        <Spacing
          size={(isCompact && !isExpanded) ? 'tiny' : 'large'}
          style={{ transition: 'all 0.15s ease' }}
          top
          bottom
          padding
        >
          <Spacing size="large" bottom>
            <Header
              isExpanded={isExpanded}
              isCompact={isCompact}
              onExpandClick={this.toggleExpansionState}
            />
          </Spacing>

          <Spacing size="large" bottom>
            <DataSourceContainer />
          </Spacing>

          <Spacing size="large" bottom>
            <FiltersContainer />
          </Spacing>

          <OptionsContainer />
        </Spacing>
      </div>
    );
  }
}

export default ControlPanelContainer;
