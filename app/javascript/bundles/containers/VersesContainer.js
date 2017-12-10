import React, { Component } from 'react';
import Verses from '../components/Verses'
import ActionCable from 'actioncable'

class VersesContainer extends Component{
  constructor(props) {
    super(props);

    this.state = {
      cable: ActionCable.createConsumer('/cable'),
      subscription: false,
      lyrics: null
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
      <Verses lyrics = {this.state.lyrics}/>
    )
  }
}

export default VersesContainer;
