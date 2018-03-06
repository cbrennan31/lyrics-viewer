import React from 'React'
const moment = require('moment')

const EventTile = (props) => {
  let eventTime = moment(props.time).format('llll')
  return(
    <div>
      <p>{props.title}</p>
      <p>{eventTime}</p>
    </div>
  )
}

export default EventTile
