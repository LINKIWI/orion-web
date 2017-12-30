import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAccuracyFilter } from 'app/redux/actions/filters';
import Filters from 'app/react/components/control-panel/filters';

const MIN_ACCURACY_THRESHOLD = 5;
const MAX_ACCURACY_THRESHOLD = 1000;

/**
 * Container controlling the value of all filters passed to the control panel.
 */
const FiltersContainer = ({ accuracyThreshold, setAccuracyThreshold, width }) => (
  <Filters
    threshold={accuracyThreshold}
    minAccuracy={MIN_ACCURACY_THRESHOLD}
    maxAccuracy={MAX_ACCURACY_THRESHOLD}
    width={width}
    onAccuracyThresholdChange={setAccuracyThreshold}
  />
);

FiltersContainer.propTypes = {
  accuracyThreshold: PropTypes.number.isRequired,
  setAccuracyThreshold: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};

const mapStateToProps = ({ context, filters }) => ({
  width: context.isCompact ? context.width - 60 : 510,
  accuracyThreshold: filters.accuracyThreshold,
});

const mapDispatchToProps = (dispatch) => ({
  setAccuracyThreshold: (threshold) => dispatch(setAccuracyFilter(threshold)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltersContainer);
