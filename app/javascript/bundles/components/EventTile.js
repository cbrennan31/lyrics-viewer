import React from 'react'
import EditDeleteButtons from './EditDeleteButtons'
const moment = require('moment')

const EventTile = (props) => {
  let eventTime = moment(props.time).format('llll')

  return(
    <a className='event-tile-link' href={`/events/${props.id}`}>
      <div className="tile event-tile">
        <h3>{props.title}</h3>

        <span>{eventTime}</span>

        <EditDeleteButtons
          onClickDelete={() => props.toggleDeleteVerseForm(props.id)}
          onClickEdit={() => props.toggleEditVerseForm(props.id, props.lyrics)}
        />
      </div>
    </a>
  )
}

export default EventTile
