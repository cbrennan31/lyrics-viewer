import fetch from 'cross-fetch'

const receiveEventsOnMount = (data) => ({
  type: 'RECEIVE_EVENTS_ON_MOUNT',
  data
})

export const requestEventsOnMount = (id) => {
  return (dispatch) => {
    return fetch(`/api/v1/events/`)
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    )
    .then(json => {
      return dispatch(receiveEventsOnMount(json))
    })
  }
}

export const toggleAddEventForm = () => ({
  type: 'TOGGLE_ADD_EVENT_FORM'
})

export const handleAddEventChange = (e) => ({
  type: 'HANDLE_ADD_EVENT_CHANGE',
  value: e.target.value
})

export const handleAddDateChange = (value) => ({
  type: 'HANDLE_ADD_DATE_CHANGE',
  value
})

const receiveNewEvent = (data) => ({
  type: 'RECEIVE_NEW_EVENT',
  data
})

export const submitEventRequest = (data) => {
  return (dispatch) => {
    if (data.title !== '' && data.time) {
      dispatch(toggleAddEventForm())
      return fetch('/api/v1/events', {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json => {
        return dispatch(receiveNewEvent(json.event))
      })
    }
  }
}
