import { combineReducers } from 'redux'
import ActionCable from 'actioncable'

const selectedSong = (state = null, action) => {
  switch (action.type) {
    case 'SELECT_SONG':
      return action.id
    case 'RECEIVE_SONGS_ON_MOUNT':
      if (action.data.songs[0]) {
        return action.data.songs[0].id
      } else {
        return state
      }
    case 'HANDLE_DELETED_SONG':
      return action.data.selected_song_id
    default:
      return state
  }
}

const eventInProgress = (state = null, action) => {
  switch (action.type) {
    case 'HANDLE_UPDATED_EVENT_STATUS':
      return action.event.in_progress
    default:
      return state
  }
}

const cable = (state = ActionCable.createConsumer('/cable'), action) => {
  switch (action.type){
    case 'SUBSCRIBE_TO_CHANNEL':
      return Object.assign({}, state, {subscription: action.subscription})
    default:
      return state
  }
}

const verseSelection = (state = {currentVerse: 0}, action) => {
  switch (action.type){
    case 'HANDLE_PREVIOUS':
      return Object.assign({}, state, {currentVerse: action.currentVerse})
    case 'HANDLE_NEXT':
      return Object.assign({}, state, {currentVerse: action.currentVerse})
    default:
      return state
  }
}

const showAddSongForm = (state = false, action) => {
  switch (action.type){
    case 'TOGGLE_ADD_SONG_FORM':
      return !state
    default:
      return state
  }
}

const receiveSongs = (state = {}, action) => {
  switch (action.type){
    case 'RECEIVE_SONGS_ON_MOUNT':
      return Object.assign({}, state, {songs: action.data.songs})
    case 'RECEIVE_SONG':
      let songId = action.data.song.id

      return Object.assign({}, state, {
        songs: [...state.songs, action.data.song],
        verses: Object.assign({}, state.verses, {[songId]: []})
      })
    case 'RECEIVE_EDITED_TITLE':
      let editedIndex = state.songs.findIndex((el) => el.id == action.data.song.id)
      let updatedSongs = state.songs.slice()
      updatedSongs[editedIndex] = action.data.song
      return Object.assign({}, state, {
        songs: updatedSongs
      })
    case 'HANDLE_DELETED_SONG':
      let deletedSongId = action.data.id

      let deleteIndex = state.songs.findIndex((el) => el.id == deletedSongId)
      updatedSongs = state.songs.slice()
      updatedSongs.splice(deleteIndex, 1)

      let updatedVerses = Object.assign({}, state.verses)
      delete updatedVerses[deletedSongId]
      return Object.assign({}, state, {
        songs: updatedSongs,
        verses: updatedVerses
      })
    default:
      return state
  }
}

const showEditSongForm = (state = false, action) => {
  switch (action.type){
    case 'TOGGLE_EDIT_SONG_FORM':
      return !state
    case 'SELECT_SONG':
      return false
    default:
      return state
  }
}

const showAddVerseForm = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_ADD_VERSE_FORM':
      return !state
    default:
      return state
  }
}

const showEditVerseForm = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_EDIT_VERSE_FORM':
      if (!state) {
        return Object.assign({}, state, {id: action.id, defaultValue: action.defaultValue})
      } else {
        return false
      }
    default:
      return state
  }
}

const receiveVerses = (state = {}, action) => {
  let versesCopy = Object.assign({}, state.verses)
  switch (action.type) {
    case 'RECEIVE_SONGS_ON_MOUNT':
      return Object.assign({}, state, {verses: action.data.verses})
    case 'RECEIVE_VERSE':
      let songId = action.data.verse.song_id
      versesCopy[songId] = versesCopy[songId].concat(action.data.verse)

      return Object.assign({}, state, {verses: versesCopy})
    case 'RECEIVE_EDITED_VERSE':
      songId = action.data.verse.song_id
      let editedVerseIndex = versesCopy[songId].findIndex((el) => el.id == action.data.verse.id)
      let updatedVersesArray = versesCopy[songId].slice()
      updatedVersesArray[editedVerseIndex] = action.data.verse
      versesCopy[songId] = updatedVersesArray

      return Object.assign({}, state, {
        verses: versesCopy
      })
    case 'HANDLE_DELETED_VERSE':
      songId = action.data.song_id
      let deletedVerseIndex = versesCopy[songId].findIndex((el) => el.id == action.data.id)
      updatedVersesArray = versesCopy[songId].slice()
      updatedVersesArray.splice(deletedVerseIndex, 1)
      versesCopy[songId] = updatedVersesArray

      return Object.assign({}, state, {
        verses: versesCopy
      })
    default:
      return state
  }
}

const EventShowReducer = combineReducers({
  selectedSong,
  cable,
  verseSelection,
  eventInProgress,
  showAddSongForm,
  receiveSongs,
  receiveVerses,
  showEditSongForm,
  showAddVerseForm,
  showEditVerseForm
})

export default EventShowReducer
