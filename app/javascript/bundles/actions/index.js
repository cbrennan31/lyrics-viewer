import fetch from 'cross-fetch'

const selectSong = (id) => ({
  type: 'SELECT_SONG',
  id
})

export const updateSelectedSong = (data) => {
  return (dispatch) => {
    return fetch(`/api/v1/events/${data.id}`, {
      credentials: 'same-origin',
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    )
    .then((json) => {
        return dispatch(selectSong(json.event.selected_song_id))
    })
  }
}


export const subscribe = (cable) => ({
  type: 'SUBSCRIBE_TO_CHANNEL',
  subscription: cable.subscriptions.create({
    channel: "VersesChannel"
  })
})

export const handlePrevious = (verses, currentVerse, callback) => {
  let verseIDs = verses.map(verse => verse.id)
  let newVerse = 0

  if (currentVerse != verseIDs[0]) {
      let indexOfCurrentVerseID = verseIDs.indexOf(currentVerse)
      indexOfCurrentVerseID -= 1
      newVerse = verseIDs[indexOfCurrentVerseID]
  }

  callback(newVerse)

  return {
    type: 'HANDLE_PREVIOUS',
    currentVerse: newVerse
  }
}

export const handleNext = (verses, currentVerse, callback) => {
  let verseIDs = verses.map(verse => verse.id)
  let newVerse = 0

  if (currentVerse != verseIDs[verseIDs.length - 1]) {
    if (currentVerse == 0) {
      newVerse = verseIDs[0]
    }
    let indexOfCurrentVerseId = verseIDs.indexOf(currentVerse)
    indexOfCurrentVerseId += 1
    newVerse = verseIDs[indexOfCurrentVerseId]
  }

  callback(newVerse)

  return {
    type: 'HANDLE_NEXT',
    currentVerse: newVerse
  }
}

const handleUpdatedEventStatus = (event, callback) => {
  callback(event.id)
  return {
    type: 'HANDLE_UPDATED_EVENT_STATUS',
    event
  }
}

export const updateEventStatus = (data, callback) => {
  return (dispatch) => {
    return fetch(`/api/v1/events/${data.id}`, {
      credentials: 'same-origin',
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    )
    .then((json) => {
        return dispatch(handleUpdatedEventStatus(json.event, callback))
      }
    )
  }
}

export const toggleAddSongForm = () => ({
  type: 'TOGGLE_ADD_SONG_FORM'
})

export const receiveSongsOnMount = (data) => ({
  type: 'RECEIVE_SONGS_ON_MOUNT',
  data
})

const receiveSong = (data) => ({
  type: 'RECEIVE_SONG',
  data
})

export const submitSongRequest = (data) => {
  return (dispatch) => {
    if (data.title) {
      dispatch(toggleAddSongForm())
      return fetch('/api/v1/songs', {
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
        dispatch(updateSelectedSong({
          id: json.song.event_id,
          selected_song_id: json.song.id
        }))
        return(
          dispatch(receiveSong(json))
        )
      })
    }
  }
}

export const requestSongsOnMount = (id) => {
  return (dispatch) => {
    return fetch(`/api/v1/events/${id}`)
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    )
    .then(json => {
      return dispatch(receiveSongsOnMount(json))
    })
  }
}

export const toggleEditSongForm = () => ({
  type: "TOGGLE_EDIT_SONG_FORM"
})


const receiveEditedTitle = (data) => ({
  type: "RECEIVE_EDITED_TITLE",
  data
})

export const editTitleRequest = (song) => {
  return (dispatch) => {
    dispatch(toggleEditSongForm())
    return fetch(`/api/v1/songs/${song.id}`, {
      credentials: 'same-origin',
      method: 'PATCH',
      body: JSON.stringify(song),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    )
    .then(json => {
      return dispatch(receiveEditedTitle(json))
    })
  }
}

export const toggleAddVerseForm = () => ({
  type: 'TOGGLE_ADD_VERSE_FORM'
})

const receiveVerse = (data) => ({
  type: 'RECEIVE_VERSE',
  data
})

export const submitVerseRequest = (verse) => {
  return (dispatch) => {
    dispatch(toggleAddVerseForm())
    return fetch('/api/v1/verses', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(verse),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    )
    .then(json => {
      return dispatch(receiveVerse(json))
    })
  }
}

export const toggleEditVerseForm = (id, defaultValue) => ({
  type: 'TOGGLE_EDIT_VERSE_FORM',
  id,
  defaultValue
})

const receiveEditedVerse = (data) => ({
  type: "RECEIVE_EDITED_VERSE",
  data
})

export const editVerseRequest = (verse) => {
  return (dispatch) => {
    dispatch(toggleEditVerseForm())
    return fetch(`/api/v1/verses/${verse.verse_id}`, {
      credentials: 'same-origin',
      method: 'PATCH',
      body: JSON.stringify(verse),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    )
    .then(json => {
      return dispatch(receiveEditedVerse(json))
    })
  }
}

const handleDeletedSong = (data) => ({
  type: 'HANDLE_DELETED_SONG',
  data
})

export const deleteSongRequest = (id) => {
  return (dispatch) => {
    return fetch(`/api/v1/songs/${id}`, {
      credentials: 'same-origin',
      method: 'DELETE',
      body: JSON.stringify(id),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    )
    .then(json => {
      dispatch(updateSelectedSong({
        id: json.song.event_id,
        selected_song_id: json.selected_song_id
      }))
      return dispatch(handleDeletedSong(json))
    })
  }
}

const handleDeletedVerse = (data) => ({
  type: 'HANDLE_DELETED_VERSE',
  data
})

export const deleteVerseRequest = (data) => {
  return (dispatch) => {
    return fetch(`/api/v1/verses/${data.id}`, {
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
      return dispatch(handleDeletedVerse(json))
    })
  }
}
