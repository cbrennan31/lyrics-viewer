import React from 'react';
import RaisedButton from 'material-ui/RaisedButton'

const GreenButton = (props) => {
  return (
    <RaisedButton
      backgroundColor="#a4c639"
      label={props.label}
      onClick={props.onClick}
      labelStyle={{
        color: 'white'
      }}
      className="event-button"
    />
  )
}

export default GreenButton
