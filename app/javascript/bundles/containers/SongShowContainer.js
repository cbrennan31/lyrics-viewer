import React, { Component } from 'react';
import SongVerse from '../components/SongVerse'
import ActionCable from 'actioncable'

class SongShowContainer extends Component{
  constructor(props) {
    super(props);

    this.state = {
      cable: ActionCable.createConsumer('/cable'),
      subscription: false,
      currentVerse: ''
    }

    this.handlePrevious = this.handlePrevious.bind(this)
    this.handleNext = this.handleNext.bind(this)
  }

  componentDidMount() {
    this.state.subscription = this.state.cable.subscriptions.create({
      channel: "VersesChannel"
    })
  }

  handlePrevious(e) {
    
  }

  render() {
    let verses = this.props.verses.map((verse) => {
      return <SongVerse
        key={verse.id}
        id={verse.id}
        lyrics={verse.lyrics}
        selected = {this.state.currentVerse}
      />
    })
    return(
      <div>{verses}</div>
      <input type="button" value="Previous" onClick={this.handlePrevious}/>
      <input type="button" value="Next" onClick={this.handleNext}/>
    )
  }
}

export default SongShowContainer;
