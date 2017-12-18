import { createStore } from 'redux'
import { Provider } from 'react-redux'
import React from 'react'
import reducer from '../reducers'
import EventShowContainer from '../containers/EventShowContainer'

const EventShowStore = (props) => {

  const store = createStore(reducer)
  return (
    <Provider store={store} >
      <EventShowContainer songs = {props.songs} verses = {props.verses} event = {props.event} />
    </Provider>
  )
}

export default EventShowStore
