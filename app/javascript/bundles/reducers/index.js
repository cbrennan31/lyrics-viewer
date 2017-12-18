import { combineReducers } from 'redux'

const selectedSong = (state = 1, action) => {
  switch (action.type) {
    case 'SELECT_SONG':
      return action.id
    default:
      return state
  }
}

const selectedSongReducer = combineReducers({
  selectedSong
})

export default selectedSongReducer
