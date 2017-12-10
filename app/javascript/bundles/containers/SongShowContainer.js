import React, { Component } from 'react';
import SongShow from '../components/SongShow'
import ActionCable from 'actioncable'

class SongShowContainer extends Component{
  constructor(props) {
    super(props);

    this.state = {
      cable: ActionCable.createConsumer('/cable'),
      subscription: false,
      verseId: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.state.subscription = this.state.cable.subscriptions.create({
      channel: "VersesChannel"
    })
  }

  handleChange(e) {
    this.setState({verseId: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()

    if (this.state.verseId != '') {
      this.state.subscription.send({
        id: this.state.verseId
      })
    }
  }

  render() {
    return(
      <SongShow
        handleSubmit = {this.handleSubmit}
        handleChange = {this.handleChange}
        verseId = {this.state.verseId}
      />
    )
  }
}

export default SongShowContainer;
