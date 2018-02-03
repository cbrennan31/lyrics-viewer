import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';

class AddSongForm extends Component{

  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this)
  }


  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <form onSubmit = {(e) => {
            e.preventDefault();
            this.props.onSubmit({
              id: this.props.eventid,
              title: this.state.value
            });
          }}
        >
          <label value="Song Title">
            <TextField
              id="songTitle"
              placeholder="Enter title"
              value={this.state.value}
              onChange={this.handleChange}
            />

            <RaisedButton
              default={true}
              type="submit"
              id="submit"
              label='Submit'
              labelStyle={{
                textTransform: 'none'
              }}
              className="song-form-button"
            />

            <RaisedButton
              secondary={true}
              id="cancel"
              label='Cancel'
              onClick={() => this.props.toggleAddSongForm(this.props.songFormRevealed)}
              labelStyle={{
                textTransform: 'none'
              }}
              className="song-form-button"
            />
          </label>
        </form>
      </div>
    )
  }
}

export default AddSongForm;
