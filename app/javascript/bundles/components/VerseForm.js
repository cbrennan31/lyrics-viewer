import React, { Component } from 'react';

const VerseForm = (props) => {
  let textarea

  return(
    <div>
      <form
        onSubmit = {(e) => {
          e.preventDefault();
          props.onSubmit({
            song_id: props.songid,
            lyrics: textarea.value
          });
          textarea.value = ''
        }}
      >
        <label value="Lyrics">
          <textarea
            type="textarea"
            ref={(node) => {
              textarea = node
            }}
          />
          <input type="submit" id="Submit" />
        </label>
      </form>
    </div>
  )
}

export default VerseForm;
