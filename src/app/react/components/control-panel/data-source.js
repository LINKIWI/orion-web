import React from 'react';
import PropTypes from 'prop-types';
import { SelectList, Spacing, Text, TextField } from 'react-elemental';

/**
 * Controls for setting parameters related to the source of location data for visualization.
 */
const DataSource = ({
  users,
  devices,
  timestampStart,
  timestampEnd,
  onUserChange,
  onDeviceChange,
  onTimestampStartChange,
  onTimestampEndChange,
}) => (
  <div>
    <Spacing size="small" bottom>
      <Text uppercase bold>
        Data source
      </Text>
    </Spacing>

    <Spacing bottom style={{ display: 'flex', justifyContent: 'space-between' }}>
      <SelectList
        label="User"
        sublabel="Username associated with location."
        options={users.map((user) => ({ value: user, label: user }))}
        width={200}
        onChange={onUserChange}
      />

      <SelectList
        label="Device"
        sublabel="Device owned by this user."
        options={devices.map((user) => ({ value: user, label: user }))}
        width={200}
        onChange={onDeviceChange}
      />
    </Spacing>

    <Spacing bottom style={{ display: 'flex', justifyContent: 'space-between' }}>
      <TextField
        label="Start date"
        sublabel="Start of the interval to query."
        type="date"
        value={timestampStart}
        onChange={onTimestampStartChange}
        style={{ width: '220px' }}
      />

      <TextField
        label="End date"
        sublabel="End of the interval to query."
        type="date"
        value={timestampEnd}
        onChange={onTimestampEndChange}
        style={{ width: '220px' }}
      />
    </Spacing>
  </div>
);

DataSource.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string).isRequired,
  devices: PropTypes.arrayOf(PropTypes.string).isRequired,
  timestampStart: PropTypes.string.isRequired,
  timestampEnd: PropTypes.string.isRequired,
  onUserChange: PropTypes.func.isRequired,
  onDeviceChange: PropTypes.func.isRequired,
  onTimestampStartChange: PropTypes.func.isRequired,
  onTimestampEndChange: PropTypes.func.isRequired,
};

export default DataSource;
