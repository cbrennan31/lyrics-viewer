import React from 'react';
import RaisedButton from 'material-ui/RaisedButton'

const RedButton = (props) => {
  return (
    <RaisedButton
      secondary={true}
      label={props.label}
      onClick={props.onClick}
      className="event-button"
    />
  )
}

export default RedButton
