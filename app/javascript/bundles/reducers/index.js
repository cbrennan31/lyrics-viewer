import { combineReducers } from 'redux'
import ActionCable from 'actioncable'

const selectedSong = (state = null, action) => {
  switch (action.type) {
    case 'SELECT_SONG':
      return action.id
    case 'RECEIVE_SONGS_ON_MOUNT':
      return action.data.songs[0].id
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

const verseSelection = (state = {verseIDs: [], currentVerse: 0}, action) => {
  switch (action.type){
    case 'SET_VERSE_IDS':
      return Object.assign({}, state, {verseIDs: action.verseIDs})
    case 'HANDLE_PREVIOUS':
      return Object.assign({}, state, {currentVerse: action.currentVerse})
    case 'HANDLE_NEXT':
      return Object.assign({}, state, {currentVerse: action.currentVerse})
    default:
      return state
  }
}

const eventInProgress = (state = 0, action) => {
  switch (action.type){
    case 'START_EVENT':
      return action.id
    case 'END_EVENT':
      return 0
    default:
      return state
  }
}

const songFormRevealed = (state = false, action) => {
  switch (action.type){
    case 'ADD_SONG':
      return true
    case 'SUBMIT_SONG':
      return false
    default:
      return state
  }
}

const receiveSongs = (state = {}, action) => {
  switch (action.type){
    case 'RECEIVE_SONGS_ON_MOUNT':
      return Object.assign({}, state, {
        songs: action.data.songs,
        verses: action.data.verses
      })
    case 'RECEIVE_SONG':
      let id = action.data.song.id

      return Object.assign({}, state, {
        songs: [...state.songs, action.data.song],
        verses: Object.assign({}, state.verses, {[id]: []})
      })
    case 'RECEIVE_EDITED_TITLE':
      let index = state.songs.findIndex((el) => el.id == action.data.song.id)
      let newSongs = state.songs.slice()
      newSongs[index] = action.data.song
      return Object.assign({}, state, {
        songs: newSongs
      })
    case 'RECEIVE_VERSE':
      let song_id = action.data.verse.song_id
      let newVerses = Object.assign({}, state.verses)
      newVerses[song_id] = newVerses[song_id].concat(action.data.verse)

      return Object.assign({}, state, {
        verses: newVerses
      })
    case 'HANDLE_DELETED_SONG':
      let deletedSongId = action.data.id

      let deleteIndex = state.songs.findIndex((el) => el.id == deletedSongId)
      let fewerSongs = state.songs.slice()
      fewerSongs.splice(deleteIndex, 1)

      let fewerVerses = Object.assign({}, state.verses)
      delete fewerVerses[deletedSongId]
      return Object.assign({}, state, {
        songs: fewerSongs,
        verses: fewerVerses
      })
    default:
      return state
  }
}

const songTitleEdit = (state = false, action) => {
  switch (action.type){
    case 'EDIT_SONG':
      return !action.boolean
    default:
      return state
  }
}

const verseFormRevealed = (state = false, action) => {
  switch (action.type) {
    case 'ADD_VERSE':
      return true
    case 'SUBMIT_VERSE':
      return false
    default:
      return state
  }
}

const EventShowReducer = combineReducers({
  selectedSong,
  cable,
  verseSelection,
  eventInProgress,
  songFormRevealed,
  receiveSongs,
  songTitleEdit,
  verseFormRevealed
})

export default EventShowReducer
