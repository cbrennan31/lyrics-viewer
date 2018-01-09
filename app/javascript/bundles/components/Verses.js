import React, { Component } from 'react';

class Verse extends Component{
  constructor(props) {
    super(props);

    this.state = {
      lyrics: this.props.lyrics,
      translate: false,
      languages: null,
      code: null
    }

    this.translate = this.translate.bind(this)
  }

  translate(lyrics, code) {
    fetch(`/api/v1/translations`, {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify({
        code: code,
        text: lyrics
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(
      response => response.json()
    )
    .then(json => {
      this.setState({lyrics: json.translation.text, translate: true})
    })
    .catch(
      error => console.log('An error occurred.', error)
    )
  }

  componentDidMount() {
    fetch('api/v1/translations')
    .then(
      response => response.json()
    )
    .then(json => {
      this.setState({languages: json.languages})
    })
  }

  componentWillReceiveProps(newProps) {
    if (this.state.translate) {
      this.translate(newProps.lyrics, this.state.code)
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

    let selectLang

    if (this.state.languages) {
      let langOptions = this.state.languages.map(lang => {
        return <option value={lang.code}>{lang.name}</option>
      })

      selectLang = <select onChange = {(e) => this.translate(this.state.lyrics, e.target.value)}>{langOptions}</select>
    }

    return(
      <div>
        {selectLang}
        {displayLyrics}
      </div>
    )
  }
}

export default Verse;
