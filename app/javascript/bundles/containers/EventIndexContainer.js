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
    addEventDateValue: state.addEventDateValue,
    showEditEventForm: state.showEditEventForm
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    requestEventsOnMount: Actions.requestEventsOnMount,
    toggleAddEventForm: Actions.toggleAddEventForm,
    handleAddEventChange: Actions.handleAddEventChange,
    handleAddDateChange: Actions.handleAddDateChange,
    submitEventRequest: Actions.submitEventRequest,
    toggleEditEventForm: Actions.toggleEditEventForm,
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
          id={event.id}
          userId={event.user_id}
          title={event.title}
          time={event.time}
          toggleEditEventForm={this.props.toggleEditEventForm}
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
        defaultTitle=''
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

    let editEvent

    if (this.props.showEditEventForm) {
      editEvent =
        <EventForm
          id={this.props.showEditEventForm.id}
          open={!!this.props.showEditEventForm}
          cancel={this.props.toggleEditEventForm}
          defaultTitle={this.props.showEditEventForm.defaults.title}
          defaultDate={new Date(this.props.showEditEventForm.defaults.time)}
        />
    }

    return(
      <div>
        <h1 id="events-header">Events</h1>

        <div id="tile-grid">
          {events}
        </div>

        <div id="add-event-button">
          {addEvent}
          {editEvent}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventIndexContainer)
