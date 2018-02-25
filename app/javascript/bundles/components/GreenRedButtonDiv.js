import React from 'react';
import RaisedButton from 'material-ui/RaisedButton'

const GreenRedButtonDiv = (props) => {
  return (
    <div id='start-end-event-div'>
      <RaisedButton
        backgroundColor="#a4c639"
        label={props.labelGreen}
        onClick={props.onClickGreen}
        labelStyle={{
          color: 'white'
        }}
        className="event-button"
      />

      <RaisedButton
        secondary={true}
        label={props.labelRed}
        onClick={props.onClickRed}
        className="event-button"
      />
    </div>
  )
}

export default GreenRedButtonDiv
