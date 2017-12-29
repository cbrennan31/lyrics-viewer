import { combineReducers } from 'redux'
import ActionCable from 'actioncable'

const selectedSong = (state = 1, action) => {
  switch (action.type) {
    case 'SELECT_SONG':
      return action.id
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
      return Object.assign({}, state, {
        songs: [...state.songs, action.data.song],
        verses: [...state.verses, action.data.verses]
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
  songFormRevealed,
  receiveSongs
})

export default EventShowReducer
