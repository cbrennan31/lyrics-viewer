import React from 'react';

const SongVerse = (props) => {
  let fontColor = props.selected ? 'red' : 'black'
  let displayLyrics

  if (props.lyrics) {
    let lyricsArray = props.lyrics.split("<br />")
    displayLyrics = lyricsArray.map((lyric) => {
      if (lyricsArray.indexOf(lyric) != lyricsArray.length - 1) {
        return <div><span>{lyric}</span><br /></div>
      } else {
        return <span>{lyric}</span>
      }
    })
  }

  return(
    <div style = {{color: fontColor}}>{displayLyrics}</div>
  )
}

export default SongVerse;
