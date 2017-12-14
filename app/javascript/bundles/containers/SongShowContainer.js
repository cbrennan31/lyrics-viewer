import React, { Component } from 'react';
import SongVerse from '../components/SongVerse'
import ActionCable from 'actioncable'

class SongShowContainer extends Component{
  constructor(props) {
    super(props);

    this.state = {
      cable: ActionCable.createConsumer('/cable'),
      subscription: false,
      currentVerse: 0,
      verseIds: []
    }

    this.handlePrevious = this.handlePrevious.bind(this)
    this.handleNext = this.handleNext.bind(this)
  }

  componentDidMount() {
    this.state.subscription = this.state.cable.subscriptions.create({
      channel: "VersesChannel"
    })
    this.setState({
      currentVerse: 0,
      verseIds: this.props.verses.map((verse) => verse.id)
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentVerse: 0,
      verseIds: nextProps.verses.map((verse) => verse.id)
    })
  }

  handlePrevious(e) {
    e.preventDefault()
    let currentVerse = this.state.currentVerse
    if (currentVerse > 0) {
      if (currentVerse == this.state.verseIds[1]) {
        currentVerse = 0
      } else {
        let indexOfCurrentVerseId = this.state.verseIds.indexOf(currentVerse)
        indexOfCurrentVerseId -= 1
        currentVerse = this.state.verseIds[indexOfCurrentVerseId]
      }
      this.setState({currentVerse: currentVerse}, () => {
        this.state.subscription.send({
          id: this.state.currentVerse
        })
      })
    }
  }

  handleNext(e) {
    e.preventDefault()
    let currentVerse = this.state.currentVerse

    if (currentVerse == this.state.verseIds[this.state.verseIds.length - 1]) {
      currentVerse = 0
    } else {
      let indexOfCurrentVerseId = this.state.verseIds.indexOf(currentVerse)
      indexOfCurrentVerseId += 1
      currentVerse = this.state.verseIds[indexOfCurrentVerseId]
    }

    this.setState({currentVerse: currentVerse}, () => {
      this.state.subscription.send({
        id: this.state.currentVerse
      })
    })
  }

  render() {
    let verses

    if (this.props.verses) {
      verses = this.props.verses.map((verse) => {
        return <SongVerse
          key={verse.id}
          id={verse.id}
          lyrics={verse.lyrics}
          selected = {this.state.currentVerse == verse.id}
        />
      })
    }
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
