import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import React from 'react'
import reducer from '../reducers'
import thunkMiddleware from 'redux-thunk'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import EventShowContainer from '../containers/EventShowContainer'

const font = "'Fira Sans', sans-serif";

const muiTheme = getMuiTheme({
  fontFamily: font
});

const EventShowStore = (props) => {

  const store = createStore(reducer, applyMiddleware(thunkMiddleware))
  return (
    <Provider store={store} >
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={{fontFamily: font}}>
          <EventShowContainer event = {props.event} />
        </div>
      </MuiThemeProvider>
    </Provider>
  )
}

export default EventShowStore
