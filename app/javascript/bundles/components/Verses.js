import React, { Component } from 'react';

class Verse extends Component{
  constructor(props) {
    super(props);

    this.state = {
      lyrics: this.props.lyrics,
      translate: false
    }

    this.translate = this.translate.bind(this)
  }

  translate(lyrics) {
    console.log('fired')
    fetch(`/api/v1/translations`, {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify({
        code: 'de',
        text: lyrics
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    )
    .then(json => {
      this.setState({lyrics: json.translation.text, translate: true})
    })
  }

  componentWillReceiveProps(newProps) {
    if (this.state.translate) {
      this.translate(newProps.lyrics)
    } else {
      this.setState({lyrics: newProps.lyrics})
    }
  }

  render() {
    let displayLyrics
    if (this.state.lyrics) {
      let lyricsArray = this.state.lyrics.split("<br />")

      displayLyrics = lyricsArray.map((lyric) => {
        if (lyricsArray.indexOf(lyric) != lyricsArray.length - 1) {
          return <div><span>{lyric}</span><br /></div>
        } else {
          return <span>{lyric}</span>
        }
      })
    }

    return(
      <div>
        {displayLyrics}
        <input type="button" value="Translate" onClick={() => this.translate(this.state.lyrics)}/>
      </div>
    )
  }
}

export default Verse;
