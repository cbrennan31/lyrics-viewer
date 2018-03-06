import { connect } from 'react-redux'
import React, { Component } from 'react';
import * as Actions from '../actions/EventIndex';
import { bindActionCreators } from 'redux';
import EventTile from '../components/EventTile';
import FlatButton from 'material-ui/FlatButton';
import EventForm from '../components/EventForm';

const mapStateToProps = (state) => {
  return({
    events: state.events,
    showAddEventForm: state.showAddEventForm,
    addEventTitleValue: state.addEventTitleValue,
    addEventDateValue: state.addEventDateValue
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    requestEventsOnMount: Actions.requestEventsOnMount,
    toggleAddEventForm: Actions.toggleAddEventForm,
    handleAddEventChange: Actions.handleAddEventChange,
    handleAddDateChange: Actions.handleAddDateChange,
    submitEventRequest: Actions.submitEventRequest
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
          time={event.time}
        />
      )
    })

    let addEvent = this.props.showAddEventForm ?
      <EventForm
        open={this.props.showAddEventForm}
        cancel={this.props.toggleAddEventForm}
        titleValue={this.props.addEventTitleValue}
        handleTitleChange={this.props.handleAddEventChange}
        dateValue={this.props.addEventDateValue}
        handleDateChange={this.props.handleAddDateChange}
        submitEventRequest={this.props.submitEventRequest}
        defaultValue=''
      />
      :
      <FlatButton
        label="Add Event"
        onClick={this.props.toggleAddEventForm}
        secondary={true}
        backgroundColor='hsl(0, 0%, 92%)'
        labelStyle={{
          textTransform: 'none',
          fontSize: '16',
        }}
      />

    return(
      <div>
        {events}
        {addEvent}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventIndexContainer)
