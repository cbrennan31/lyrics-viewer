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

export const handleAddEventChange = ()
