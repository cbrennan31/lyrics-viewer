import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import React from 'react'
import reducer from '../reducers'
import thunkMiddleware from 'redux-thunk'

import EventShowContainer from '../containers/EventShowContainer'

const EventShowStore = (props) => {

  const store = createStore(reducer, applyMiddleware(thunkMiddleware))
  return (
    <Provider store={store} >
      <EventShowContainer event = {props.event} />
    </Provider>
  )
}

export default EventShowStore
