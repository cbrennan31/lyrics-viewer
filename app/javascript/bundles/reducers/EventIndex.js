import { combineReducers } from 'redux'

const events = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_EVENTS_ON_MOUNT':
      return action.data.events
    default:
      return state
  }
}

const showAddEventForm = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_ADD_EVENT_FORM':
      return !state
    default:
      return state
  }
}

const EventIndexReducer = combineReducers({
  events,
  showAddEventForm
})

export default EventIndexReducer
