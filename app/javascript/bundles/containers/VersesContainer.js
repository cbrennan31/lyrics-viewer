import React, { Component } from 'react';
import Verse from '../components/Verses'
import ActionCable from 'actioncable'

class VersesContainer extends Component{
  constructor(props) {
    super(props);

    this.state = {
      cable: ActionCable.createConsumer('/cable'),
      subscription: false,
      lyrics: props.lyrics
    }
  }

  componentDidMount() {
    this.state.subscription = this.state.cable.subscriptions.create({
      channel: "VersesChannel"
    }, {
      received: (data) => {this.setState({lyrics: data.lyrics})}
    })
  }

  render() {
    return(
      <Verse lyrics = {this.state.lyrics}/>
    )
  }
}

export default VersesContainer;
