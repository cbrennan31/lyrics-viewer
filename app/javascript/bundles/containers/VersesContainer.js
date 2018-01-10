import React, { Component } from 'react';
import Verse from '../components/Verses'
import ActionCable from 'actioncable'

class VersesContainer extends Component{
  constructor(props) {
    super(props);

    let text
    let defaultText = "Welcome to BCE Lyrics. There are no events currently in progress."

    if (this.props.lyrics) {
      text = this.props.lyrics
    } else if (this.props.current_event){
      text = this.props.current_event
    } else {
      text = defaultText
    }

    this.state = {
      cable: ActionCable.createConsumer('/cable'),
      subscription: false,
      text: text,
      languages: null,
      enText: text,
      code: 'en',
      defaultText: defaultText
    }

    this.translate = this.translate.bind(this)
  }

  componentDidMount() {
    this.state.subscription = this.state.cable.subscriptions.create({
        channel: "VersesChannel"
      }, {
        received: (data) => {
          if (data.lyrics) {
            this.translate(data.lyrics, this.state.code)
          } else if (data.current_event){
            this.translate(data.current_event, this.state.code)
          } else {
            this.translate(this.state.defaultText, this.state.code)
          }
      }
    })
    fetch('api/v1/translations')
    .then(
      response => response.json()
    )
    .then(json => {
      this.setState({languages: json.languages})
    })
  }

  translate(text, code) {
    fetch(`/api/v1/translations`, {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify({
        code: code,
        text: text
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(
      response => response.json()
    )
    .then(json => {
      this.setState({text: json.translation.text, enText: text, code: code})
    })
    .catch(
      error => console.log('An error occurred.', error)
    )
  }

  render() {
    let textArray = this.state.text.split("<br />")

    let displayText = textArray.map((line) => {
      if (textArray.indexOf(line) != textArray.length - 1) {
        return <div><span>{line}</span><br /></div>
      } else {
        return <span>{line}</span>
      }
    })

    let content = <Verse text={displayText} languages={this.state.languages}/>

    let selectLang

    if (this.state.languages) {
      let langOptions = this.state.languages.map(lang => {
        return <option value={lang.code}>{lang.name}</option>
      })

      selectLang =
        <select
          onChange = {(e) => this.translate(this.state.enText, e.target.value)}
          value = {this.state.code}
        >
          {langOptions}
        </select>
    }

    return(
      <div>
        {selectLang}
        {content}
      </div>
    )
  }
}

export default VersesContainer;
