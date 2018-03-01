import { combineReducers } from 'redux'

const test = (state = 'Redux is wired up!', action) => {
  switch (action.type) {
    default:
      return state
  }
}

const EventIndexReducer = combineReducers({
  test
})

export default EventIndexReducer
