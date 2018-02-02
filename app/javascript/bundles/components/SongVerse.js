import React from 'react';
import EditDeleteButtons from './EditDeleteButtons'
const SongVerse = (props) => {
  let className = props.selected ? 'song-verse selected' : 'song-verse'
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
    <div className={className}>
      <div>
        {displayLyrics}
      </div>
      
      <div id="edit-delete-verse">
        <EditDeleteButtons
          onDeleteClick={() => null}
          onEditClick={() => null}
        />
      </div>
    </div>
  )
}

export default SongVerse;
