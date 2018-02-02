import React from 'react';
import RaisedButton from 'material-ui/RaisedButton'

const RedGreenButtonDiv = (props) => {
  return (
    <div id='start-end-event-div'>
      <RaisedButton
        backgroundColor="#a4c639"
        label={props.labelRed}
        onClick={props.onClickRed}
        labelStyle={{
          color: 'white'
        }}
        className="event-button"
      />

      <RaisedButton
        secondary={true}
        label={props.labelGreen}
        onClick={props.onClickGreen}
        className="event-button"
      />
    </div>
  )
}

export default RedGreenButtonDiv
