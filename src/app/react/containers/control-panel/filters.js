import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAccuracyFilter } from 'app/redux/actions/filters';
import Filters from 'app/react/components/control-panel/filters';

/**
 * Container controlling the value of all filters passed to the control panel.
 */
const FiltersContainer = ({ accuracyThreshold, setAccuracyThreshold }) => (
  <Filters
    minAccuracy={5}
    maxAccuracy={1000}
    threshold={accuracyThreshold}
    onAccuracyThresholdChange={setAccuracyThreshold}
  />
);

FiltersContainer.propTypes = {
  accuracyThreshold: PropTypes.number.isRequired,
  setAccuracyThreshold: PropTypes.func.isRequired,
};

const mapStateToProps = ({ filters }) => ({
  accuracyThreshold: filters.accuracyThreshold,
});

const mapDispatchToProps = (dispatch) => ({
  setAccuracyThreshold: (threshold) => dispatch(setAccuracyFilter(threshold)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltersContainer);
