import React, { Component } from 'react';

class Verse extends Component{
  constructor(props) {
    super(props);

    // this.state = {
    //   lyrics: this.props.lyrics,
    //   // languages: null,
    //   // code: 'en'
    // }

    // this.translate = this.translate.bind(this)
  }

  // translate(lyrics, code) {
  //   fetch(`/api/v1/translations`, {
  //     credentials: 'same-origin',
  //     method: 'POST',
  //     body: JSON.stringify({
  //       code: code,
  //       text: lyrics
  //     }),
  //     headers: { 'Content-Type': 'application/json' }
  //   })
  //   .then(
  //     response => response.json()
  //   )
  //   .then(json => {
  //     this.setState({lyrics: json.translation.text, code: code})
  //   })
  //   .catch(
  //     error => console.log('An error occurred.', error)
  //   )
  // }

  // componentDidMount() {
  //   fetch('api/v1/translations')
  //   .then(
  //     response => response.json()
  //   )
  //   .then(json => {
  //     this.setState({languages: json.languages})
  //   })
  // }

  // componentWillReceiveProps(newProps) {
  //   this.translate(newProps.lyrics, this.state.code)
  // }

  render() {
    // let displayLyrics
    // if (this.state.lyrics) {
    //   let lyricsArray = this.state.lyrics.split("<br />")
    //
    //   displayLyrics = lyricsArray.map((lyric) => {
    //     if (lyricsArray.indexOf(lyric) != lyricsArray.length - 1) {
    //       return <div><span>{lyric}</span><br /></div>
    //     } else {
    //       return <span>{lyric}</span>
    //     }
    //   })
    // }




    return(
      <div>
        {this.props.lyrics}
      </div>
    )
  }
}

export default Verse;
