import fetch from 'cross-fetch'

export const selectSong = (id) => ({
  type: 'SELECT_SONG',
  id
})

export const subscribe = (cable) => ({
  type: 'SUBSCRIBE_TO_CHANNEL',
  subscription: cable.subscriptions.create({
    channel: "VersesChannel"
  })
})

export const setVerseIDs = (verses) => ({
  type: 'SET_VERSE_IDS',
  verseIDs: verses.map((verse) => verse.id) || []
})

export const handlePrevious = (verseIDs, currentVerse, callback) => {
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

export const handleNext = (verseIDs, currentVerse, callback) => {
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

export const startEvent = (id, callback) => {
  callback(id)
  return {
    type: 'START_EVENT',
    id
  }
}

export const endEvent = (callback) => {
  callback()
  return {
    type: 'END_EVENT'
  }
}

export const addSong = () => ({
  type: 'ADD_SONG'
})

const submitSong = () => {
  return {
    type: 'SUBMIT_SONG'
  }
}

export const receiveSongsOnMount = (data) => ({
  type: 'RECEIVE_SONGS_ON_MOUNT',
  data
})

const receiveSong = (data) => ({
  type: 'RECEIVE_SONG',
  data
})

export const submitSongRequest = (song) => {
  return (dispatch) => {
    dispatch(submitSong())
    return fetch('/api/v1/songs', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(song),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    )
    .then(json => {
      return dispatch(receiveSong(json))
    })
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

export const editSong = (boolean) => ({
  type: "EDIT_SONG",
  boolean
})


const receiveEditedTitle = (data) => ({
  type: "RECEIVE_EDITED_TITLE",
  data
})

export const editTitleRequest = (song, boolean) => {
  return (dispatch) => {
    dispatch(editSong(boolean))
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

export const addVerse = () => ({
  type: 'ADD_VERSE'
})

const submitVerse = () => {
  return {
    type: 'SUBMIT_VERSE'
  }
}

const receiveVerse = (data) => ({
  type: 'RECEIVE_VERSE',
  data
})

export const submitVerseRequest = (verse) => {
  return (dispatch) => {
    dispatch(submitVerse())
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
