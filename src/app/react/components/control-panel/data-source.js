import React from 'react';
import PropTypes from 'prop-types';
import { Label, SelectList, Spacing, Text, TextField } from 'react-elemental';

/**
 * Controls for setting parameters related to the source of location data for visualization.
 */
const DataSource = ({
  users,
  devices,
  timestampStart,
  timestampEnd,
  fieldWidth,
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
      <div>
        <Label
          label="User"
          sublabel="User for queried locations"
        />
        <SelectList
          options={users.map((user) => ({ value: user, label: user }))}
          width={fieldWidth}
          onChange={onUserChange}
        />
      </div>

      <div>
        <Label
          label="Device"
          sublabel="Device owned by this user"
        />
        <SelectList
          options={devices.map((user) => ({ value: user, label: user }))}
          width={fieldWidth}
          onChange={onDeviceChange}
        />
      </div>
    </Spacing>

    <Spacing bottom style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Label
          label="Start date"
          sublabel="Start of the interval to query"
        />
        <TextField
          type="date"
          value={timestampStart}
          onChange={onTimestampStartChange}
          style={{ width: `${fieldWidth + 20}px` }}
        />
      </div>

      <div>
        <Label
          label="End date"
          sublabel="End of the interval to query"
        />
        <TextField
          type="date"
          value={timestampEnd}
          onChange={onTimestampEndChange}
          style={{ width: `${fieldWidth + 20}px` }}
        />
      </div>
    </Spacing>
  </div>
);

DataSource.propTypes = {
  // Array of available users
  users: PropTypes.arrayOf(PropTypes.string).isRequired,
  // Array of devices owned by this user
  devices: PropTypes.arrayOf(PropTypes.string).isRequired,
  // Start of the timestamp to query
  timestampStart: PropTypes.string.isRequired,
  // End of the timestamp to query
  timestampEnd: PropTypes.string.isRequired,
  // Width (in pixels) of each editable field
  fieldWidth: PropTypes.number.isRequired,
  // Callback to invoke when the user is changed
  onUserChange: PropTypes.func.isRequired,
  // Callback to invoke when the device is changed
  onDeviceChange: PropTypes.func.isRequired,
  // Callback to invoke when the starting timestamp is changed
  onTimestampStartChange: PropTypes.func.isRequired,
  // Callback to invoke when the ending timestamp is changed
  onTimestampEndChange: PropTypes.func.isRequired,
};

export default DataSource;
