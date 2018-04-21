import { connect } from 'react-redux'
import React, { Component } from 'react';
import * as Actions from '../actions/EventIndex';
import { bindActionCreators } from 'redux';
import EventTile from '../components/EventTile';
import FlatButton from 'material-ui/FlatButton';
import EventForm from '../components/EventForm';
import DeleteConfirmation from '../components/DeleteConfirmation';

const mapStateToProps = (state) => {
  return({
    events: state.events,
    showAddEventForm: state.showAddEventForm,
    addEventTitleValue: state.addEventTitleValue,
    addEventDateValue: state.addEventDateValue,
    showEditEventForm: state.showEditEventForm,
    editEventTitleValue: state.editEventTitleValue,
    editEventDateValue: state.editEventDateValue,
    showDeleteEventForm: state.showDeleteEventForm
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
    handleEditEventChange: Actions.handleEditEventChange,
    handleEditDateChange: Actions.handleEditDateChange,
    editEventRequest: Actions.editEventRequest,
    toggleDeleteEventForm: Actions.toggleDeleteEventForm,
    deleteEventRequest: Actions.deleteEventRequest
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
          toggleDeleteEventForm={this.props.toggleDeleteEventForm}
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
        handleSubmit={this.props.submitEventRequest}
        defaultTitle=''
        defaultDate={null}
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
          handleTitleChange={this.props.handleEditEventChange}
          titleValue={this.props.editEventTitleValue}
          handleDateChange={this.props.handleEditDateChange}
          dateValue={this.props.editEventDateValue}
          handleSubmit={this.props.editEventRequest}
        />
    }

    let deleteEvent

    if (this.props.showDeleteEventForm) {
      deleteEvent =
        <DeleteConfirmation
          id={this.props.showDeleteEventForm}
          deleteRequest={this.props.deleteEventRequest}
          open={!!this.props.showDeleteEventForm}
          cancel={this.props.toggleDeleteEventForm}
          item='event'
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
          {deleteEvent}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventIndexContainer)
