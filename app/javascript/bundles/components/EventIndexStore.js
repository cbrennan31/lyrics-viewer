import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import React from 'react'
import reducer from '../reducers/EventIndex'
import thunkMiddleware from 'redux-thunk'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import EventIndexContainer from '../containers/EventIndexContainer'

const font = "'Fira Sans', sans-serif";

const muiTheme = getMuiTheme({
  fontFamily: font
});

const EventIndexStore = (props) => {

  const store = createStore(reducer, applyMiddleware(thunkMiddleware))
  return (
    <Provider store={store} >
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={{fontFamily: font}}>
          <EventIndexContainer event = {props.event} />
        </div>
      </MuiThemeProvider>
    </Provider>
  )
}

export default EventIndexStore
