import React, { Component } from 'react';
import { Spacing } from 'react-elemental';
import DataSourceContainer from 'app/react/containers/control-panel/data-source';
import FiltersContainer from 'app/react/containers/control-panel/filters';
import Header from 'app/react/components/control-panel/header';
import OptionsContainer from 'app/react/containers/control-panel/options';

/**
 * Layout container for all control panel elements.
 */
class ControlPanelContainer extends Component {
  state = { isExpanded: true };

  toggleExpansionState = () => this.setState(({ isExpanded }) => ({ isExpanded: !isExpanded }));

  render() {
    const { isExpanded } = this.state;

    return (
      <Spacing
        size="large"
        style={{
          maxHeight: isExpanded ? '100vh' : '25px',
          overflow: 'hidden',
          transition: 'max-height 0.4s ease',
          width: '500px',
        }}
        top
        right
        bottom
        left
        padding
      >
        <Spacing size="large" bottom>
          <Header isExpanded={isExpanded} onExpandClick={this.toggleExpansionState} />
        </Spacing>

        <Spacing size="large" bottom>
          <DataSourceContainer />
        </Spacing>

        <Spacing size="large" bottom>
          <FiltersContainer />
        </Spacing>

        <OptionsContainer />
      </Spacing>
    );
  }
}

export default ControlPanelContainer;
