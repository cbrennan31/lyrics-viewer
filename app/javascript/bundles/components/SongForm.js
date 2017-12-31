import React, { Component } from 'react';

const SongForm = (props) => {
  let input;

  return (
    <div>
      <form onSubmit = {(e) => {
          e.preventDefault();
          props.onSubmit({
            id: props.eventid,
            title: input.value
          });
          input.value = ''
        }}
      >
        <label value="Song Title">
          <input
            type="text"
            ref={(node) => {
              input = node
            }}
          />
          <input type="submit" id="Submit" />
        </label>
      </form>
    </div>
  )
}

export default SongForm;
