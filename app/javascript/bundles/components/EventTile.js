import React from 'react'
const moment = require('moment')

const EventTile = (props) => {
  let eventTime = moment(props.time).format('llll')

  return(
    <a className='event-tile-link' href={`/events/${props.id}`}>
      <div className="tile event-tile">
        <h3>{props.title}</h3>
        <span>{eventTime}</span>
      </div>
    </a>
  )
}

export default EventTile
