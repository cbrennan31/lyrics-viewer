import { connect } from 'react-redux'
import React, { Component } from 'react';
import * as Actions from '../actions/EventIndex'
import { bindActionCreators } from 'redux';
import EventTile from '../components/EventTile'

const mapStateToProps = (state) => {
  return({
    events: state.events
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    requestEventsOnMount: Actions.requestEventsOnMount
  }, dispatch)
}

class EventIndexContainer extends Component{

  componentDidMount() {
    this.props.requestEventsOnMount()
  }

  render() {
    let events = this.props.events.map((event) => {
      return (
        <EventTile
          key={event.id}
          title={event.title}
          data={event.date}
        />
      )
    })
    
    return(
      <div>
        {events}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventIndexContainer)
