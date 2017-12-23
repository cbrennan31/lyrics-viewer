import React, { Component } from 'react';
import Verse from '../components/Verses'
import ActionCable from 'actioncable'

class VersesContainer extends Component{
  constructor(props) {
    super(props);

    this.state = {
      cable: ActionCable.createConsumer('/cable'),
      subscription: false,
      lyrics: this.props.lyrics,
      currentEvent: this.props.current_event
    }
  }

  componentDidMount() {
    this.state.subscription = this.state.cable.subscriptions.create({
      channel: "VersesChannel"
    }, {
      received: (data) => {this.setState({
          lyrics: data.lyrics,
          currentEvent: data.current_event
        }
      )}
    })
  }

  render() {
    let content
    if (this.state.lyrics) {
      content = <Verse lyrics = {this.state.lyrics}/>
    } else if (!this.state.lyrics && this.state.currentEvent) {
      content = <p>{this.state.currentEvent}</p>
    } else {
      content = <p>Welcome to BCE Lyrics. There are no events currently in progress.</p>
    }
    return(
      <div>
        {content}
      </div>
    )
  }
}

export default VersesContainer;
