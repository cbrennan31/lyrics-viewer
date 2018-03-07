import { combineReducers } from 'redux'

const events = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_EVENTS_ON_MOUNT':
      return action.data.events
    case 'RECEIVE_NEW_EVENT':
      return [...state, action.data]
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

const addEventTitleValue = (state = null, action) => {
  switch (action.type) {
    case 'HANDLE_ADD_EVENT_CHANGE':
      return action.value
    case 'RECEIVE_NEW_EVENT':
      return null
    default:
      return state
  }
}

const addEventDateValue = (state = null, action) => {
  switch (action.type) {
    case 'HANDLE_ADD_DATE_CHANGE':
      return action.value
    case 'RECEIVE_NEW_EVENT':
      return null
    default:
      return state
  }
}

const EventIndexReducer = combineReducers({
  events,
  showAddEventForm,
  addEventTitleValue,
  addEventDateValue
})

export default EventIndexReducer
