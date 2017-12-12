import React, { Component } from 'react';
import SongVerse from '../components/SongVerse'
import ActionCable from 'actioncable'

class SongShowContainer extends Component{
  constructor(props) {
    super(props);

    this.state = {
      cable: ActionCable.createConsumer('/cable'),
      subscription: false,
      currentVerse: 0
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
    e.preventDefault()
    let currentVerse = this.state.currentVerse
    if (currentVerse > 0) {
      this.setState({currentVerse: currentVerse - 1}, () => {
        this.state.subscription.send({
          id: this.state.currentVerse
        })
      })
    }
  }

  handleNext(e) {
    e.preventDefault()
    let currentVerse = this.state.currentVerse
    if (currentVerse < this.props.verses.length) {
      this.setState({currentVerse: currentVerse + 1}, () => {
        this.state.subscription.send({
          id: this.state.currentVerse
        })
      })
    }
  }

  render() {
    let verses = this.props.verses.map((verse) => {
      return <SongVerse
        key={verse.id}
        id={verse.id}
        lyrics={verse.lyrics}
        selected = {this.state.currentVerse == verse.id}
      />
    })
    return(
      <div>
        {verses}
        <input type="button" value="Previous" onClick={this.handlePrevious}/>
        <input type="button" value="Next" onClick={this.handleNext}/>
      </div>
    )
  }
}

export default SongShowContainer;
