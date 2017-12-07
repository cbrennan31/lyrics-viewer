import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';

import EventIndex from './EventIndex'
import EventShow from './EventShow'
import SongShow from './SongShow'
import Lyrics from './Lyrics'


const Routes = props => {
  return(
    <Router history={browserHistory}>
      <Route path="/" component = {Lyrics} />
      <Route path="/events/:id" component = {EventShow} />
      <Route path="/user_games/:id" component = {EventIndex} />
      <Route path="/users/:id" component = {SongShow} />
    </Router>
  )
}

export default Routes;
