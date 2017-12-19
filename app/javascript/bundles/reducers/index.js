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


const EventShowReducer = combineReducers({
  selectedSong, cable
})

export default EventShowReducer
