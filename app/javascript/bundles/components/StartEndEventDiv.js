import React from 'react';
import RaisedButton from 'material-ui/RaisedButton'

const StartEndEventDiv = (props) => {
  return (
    <div id='start-end-event-div'>
      <RaisedButton
        backgroundColor="#a4c639"
        label="Start Event"
        onClick={() =>
          props.startEvent(props.event.id, (id) => {
            props.subscription.send({current_event: id})
          })
        }
        labelStyle={{
          color: 'white'
        }}
        className="event-button"
      />

      <RaisedButton
        secondary={true}
        label="End Event"
        onClick={() => props.endEvent(() => {
            props.subscription.send({current_event: 0})
          })
        }
        className="event-button"
      />
    </div>
  )
}

export default StartEndEventDiv
