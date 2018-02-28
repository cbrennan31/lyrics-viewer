import React from 'react';
import RaisedButton from 'material-ui/RaisedButton'

const ControlsButton = (props) => {
  let buttonStyle

  if (props.className == "button-not-allowed") {
    buttonStyle = {
      cursor: 'not-allowed'
    }
  }

  return (
    <RaisedButton
      backgroundColor={props.backgroundColor}
      buttonStyle={buttonStyle}
      className="controls-button"
      label={props.label}
      labelStyle={{
        color: 'white'
      }}
      onClick={props.onClick}
    />
  )
}

export default ControlsButton
