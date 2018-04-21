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

export const submitEventRequest = (data, id) => {
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

export const toggleEditEventForm = (id, defaults) => ({
  type: 'TOGGLE_EDIT_EVENT_FORM',
  id,
  defaults,
})

export const handleEditEventChange = (e) => ({
  type: 'HANDLE_EDIT_EVENT_CHANGE',
  value: e.target.value
})

export const handleEditDateChange = (value) => ({
  type: 'HANDLE_EDIT_DATE_CHANGE',
  value
})

const receiveUpdatedEvent = (data) => ({
  type: 'RECEIVE_UPDATED_EVENT',
  data
})

export const editEventRequest = (data, id) => {
  return (dispatch) => {
    if (data.title !== '' && data.time) {
      dispatch(toggleEditEventForm())
      return fetch(`/api/v1/events/${id}`, {
        credentials: 'same-origin',
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json => {
        return dispatch(receiveUpdatedEvent(json.event))
      })
    }
  }
}

export const toggleDeleteEventForm = (id) => ({
  type: 'TOGGLE_DELETE_EVENT_FORM',
  id
})

const handleDeletedEvent = (data) => ({
  type: 'HANDLE_DELETED_EVENT',
  data
})

export const deleteEventRequest = (data) => {
  return (dispatch) => {
    dispatch(toggleDeleteEventForm())
    return fetch(`/api/v1/events/${data.id}`, {
      credentials: 'same-origin',
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    )
    .then(json => {
      return dispatch(handleDeletedEvent(json))
    })
  }
}
