import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import React from 'react'
import reducer from '../reducers'
import thunkMiddleware from 'redux-thunk'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import EventShowContainer from '../containers/EventShowContainer'

const EventShowStore = (props) => {

  const store = createStore(reducer, applyMiddleware(thunkMiddleware))
  return (
    <Provider store={store} >
      <MuiThemeProvider>
        <EventShowContainer event = {props.event} />
      </MuiThemeProvider>
    </Provider>
  )
}

export default EventShowStore
