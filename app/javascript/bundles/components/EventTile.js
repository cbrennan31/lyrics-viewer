import React from 'react'
import EditDeleteButtons from './EditDeleteButtons'
const moment = require('moment')

const EventTile = (props) => {
  let eventTime = moment(props.time).format('llll')
  let preventLinkExec = (e) => {
    if (e.target.nodeName == 'SPAN' && e.target.id !== 'event-date') {
      e.preventDefault()
    }
  }

  return(
    <a className='event-tile-link' href={`/events/${props.id}`} onClick={preventLinkExec}>
      <div className="tile event-tile">
        <h3>{props.title}</h3>

        <span id="event-date">{eventTime}</span>

        <EditDeleteButtons
          onClickDelete={() => null}
          onClickEdit={() => props.toggleEditEventForm(props.id, {
              title: props.title,
              time: props.time
            })
          }
        />
      </div>
    </a>
  )
}

export default EventTile
