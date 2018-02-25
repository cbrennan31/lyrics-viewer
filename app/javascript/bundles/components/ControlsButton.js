import React from 'react';
import RaisedButton from 'material-ui/RaisedButton'

const ControlsButton = (props) => {
  return (
    <RaisedButton
      backgroundColor={props.backgroundColor}
      label={props.label}
      labelStyle={{
        color: 'white'
      }}
      onClick={props.onClick}
      className="event-button"
    />
  )
}

export default ControlsButton
