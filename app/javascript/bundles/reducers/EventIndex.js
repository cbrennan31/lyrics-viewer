import { combineReducers } from 'redux'

const events = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_EVENTS_ON_MOUNT':
      return action.data.events
    default:
      return state
  }
}

const EventIndexReducer = combineReducers({
  events
})

export default EventIndexReducer
