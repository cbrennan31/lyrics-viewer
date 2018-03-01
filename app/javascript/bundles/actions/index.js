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

const receiveEditedSong = (data, callback) => {
  if (callback) {
    callback(data.song.selected_verse_id)
  }

  return ({
    type: "RECEIVE_EDITED_SONG",
    data
  })
}

const fetchUpdatedVerseSelection = (dispatch, songId, newVerseId, callback) => {
  fetch(`/api/v1/songs/${songId}`, {
    credentials: 'same-origin',
    method: 'PATCH',
    body: JSON.stringify({selected_verse_id: newVerseId}),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(
    response => response.json(),
    error => console.log('An error occurred.', error)
  )
  .then(json => {
    return dispatch(receiveEditedSong(json, callback))
  })
}

export const handlePrevious = (verses, songId, selectedVerseId, callback) => {
  return (dispatch) => {
    let verseIds = verses.map(verse => verse.id)
    let newVerseId = 0

    if (selectedVerseId != verseIds[0]) {
        let indexOfCurrentVerseId = verseIds.indexOf(selectedVerseId)
        indexOfCurrentVerseId -= 1
        newVerseId = verseIds[indexOfCurrentVerseId]
    }
    return fetchUpdatedVerseSelection(dispatch, songId, newVerseId, callback)
  }
}

export const handleNext = (verses, songId, selectedVerseId, callback) => {
  return (dispatch) => {
    let verseIds = verses.map(verse => verse.id)
    let newVerseId = 0

    if (selectedVerseId != verseIds[verseIds.length - 1]) {
      if (selectedVerseId == 0) {
        newVerseId = verseIds[0]
      }
      let indexOfCurrentVerseId = verseIds.indexOf(selectedVerseId)
      indexOfCurrentVerseId += 1
      newVerseId = verseIds[indexOfCurrentVerseId]
    }
    return fetchUpdatedVerseSelection(dispatch, songId, newVerseId, callback)
  }
}

const handleUpdatedEventStatus = (data, callback) => {
  callback(data.event.id)

  return {
    type: 'HANDLE_UPDATED_EVENT_STATUS',
    data
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
        return dispatch(handleUpdatedEventStatus(json, callback))
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
      return dispatch(receiveEditedSong(json))
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

const receiveEditedVerse = (data, callback) => {
  if (callback) {
    callback(data.verse.id)
  }

  return ({
    type: "RECEIVE_EDITED_VERSE",
    data
  })
}

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

export const toggleDeleteSongForm = () => ({
  type: 'TOGGLE_DELETE_SONG_FORM'
})

export const deleteSongRequest = (data) => {
  return (dispatch) => {
    return fetch(`/api/v1/songs/${data.id}`, {
      credentials: 'same-origin',
      method: 'DELETE',
      body: JSON.stringify(data.id),
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

export const toggleDeleteVerseForm = (id) => ({
  type: 'TOGGLE_DELETE_VERSE_FORM',
  id
})

export const deleteVerseRequest = (data) => {
  return (dispatch) => {
    dispatch(toggleDeleteVerseForm())
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

export const handleEditTitleChange = (e) => ({
  type: 'HANDLE_EDIT_TITLE_CHANGE',
  value: e.target.value
})

export const handleAddTitleChange = (e) => ({
  type: 'HANDLE_ADD_TITLE_CHANGE',
  value: e.target.value
})
