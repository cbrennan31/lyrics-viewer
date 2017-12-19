import React from 'react';

const SongVerse = (props) => {
  let fontColor = props.selected ? 'red' : 'black'
  return(
    <div style = {{color: fontColor}}>{props.lyrics}</div>
  )
}

export default SongVerse;
