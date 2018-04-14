import { combineReducers } from 'redux'

const events = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_EVENTS_ON_MOUNT':
      return action.data.events
    case 'RECEIVE_NEW_EVENT':
      return [...state, action.data]
    case 'RECEIVE_UPDATED_EVENT':
      let events = state.slice()
      const index = events.findIndex((e) => e.id === action.data.id)
      events[index] = action.data
      return events
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
    case 'TOGGLE_ADD_EVENT_FORM':
      return null
    default:
      return state
  }
}

const addEventDateValue = (state = null, action) => {
  switch (action.type) {
    case 'HANDLE_ADD_DATE_CHANGE':
      return action.value
    case 'TOGGLE_ADD_EVENT_FORM':
      return null
    default:
      return state
  }
}

const showEditEventForm = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_EDIT_EVENT_FORM':
      if (!state) {
        return Object.assign({}, state, {id: action.id, defaults: action.defaults})
      } else {
        return false
      }
    default:
      return state
  }
}

const editEventTitleValue = (state = null, action) => {
  switch (action.type) {
    case 'HANDLE_EDIT_EVENT_CHANGE':
      return action.value
    case 'TOGGLE_EDIT_EVENT_FORM':
      return null
    default:
      return state
  }
}

const editEventDateValue = (state = null, action) => {
  switch (action.type) {
    case 'HANDLE_EDIT_DATE_CHANGE':
      return action.value
    case 'TOGGLE_EDIT_EVENT_FORM':
      return null
    default:
      return state
  }
}

const EventIndexReducer = combineReducers({
  events,
  showAddEventForm,
  addEventTitleValue,
  addEventDateValue,
  showEditEventForm,
  editEventTitleValue,
  editEventDateValue
})

export default EventIndexReducer
