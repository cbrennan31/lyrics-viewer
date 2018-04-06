import React, { Component } from 'react';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';
const moment = require('moment');
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'

Moment.locale('en')
momentLocalizer()

const EventForm = (props) => {

  let titleValue, dateValue

  if (!props.titleValue) {
    titleValue = props.defaultTitle
  } else {
    titleValue = props.titleValue
  }

  if (!props.dateValue) {
    dateValue = props.defaultDate
  } else {
    dateValue = props.dateValue
  }

  const actions = [
    <RaisedButton
      default={true}
      type="submit"
      id="submit"
      label='Submit'
      labelStyle={{
        textTransform: 'none'
      }}
      className="song-form-button"
      onClick={(e) => {
        e.preventDefault();
        props.submitEventRequest({
          time: props.dateValue,
          title: titleValue
        });
      }}
    />,
    <RaisedButton
      secondary={true}
      id="cancel"
      label='Cancel'
      labelStyle={{
        textTransform: 'none'
      }}
      className="song-form-button"
      onClick={props.cancel}
    />
  ]
  return(
    <div>
      <Dialog
        actions={actions}
        open={props.open}
        actionsContainerStyle={{
          textAlign: 'center',
          marginTop: '-30px',
          paddingBottom: '24px'
        }}
        contentStyle={{
          width: '450px',
          textAlign: 'center',
          overflow: 'visible',
        }}
      >
        <div id="date-time-picker">
          <DateTimePicker
            placeholder='Select date and time'
            value={dateValue}
            onChange={(value) => props.handleDateChange(value)}
          />
        </div>

        <form>
          <div id="event-title-input-field">
            <TextField
              placeholder='Event Title'
              id='newEvent'
              value={titleValue}
              onChange={props.handleTitleChange}
              style={{
                width: '400px'
              }}
            />
          </div>
        </form>
      </Dialog>
    </div>
  )
}

export default EventForm;
