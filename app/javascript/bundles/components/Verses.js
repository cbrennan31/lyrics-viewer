import React, { Component } from 'react';

class Verse extends Component{
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    let lyricsArray = this.props.lyrics.split("<br />")
    
    let displayLyrics = lyricsArray.map((lyric) => {
      if (lyricsArray.indexOf(lyric) != lyricsArray.length - 1) {
        return <div><span>{lyric}</span><br /></div>
      } else {
        return <span>{lyric}</span>
      }
    })

    return(
      <div>{displayLyrics}</div>
    )
  }
}

export default Verse;
