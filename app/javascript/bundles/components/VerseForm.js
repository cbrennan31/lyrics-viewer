import React, { Component } from 'react';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';

class VerseForm extends Component {

  constructor (props) {
    super(props)

    this.state = {
      value: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({value: e.target.value})
  }
  render () {

    const actions = [
      <RaisedButton
        default={true}
        type="submit"
        id="submit"
        label='Submit'
        labelStyle={{
          textTransform: 'none'
        }}
        className="song-form-button"
        onClick={(e) => {
          e.preventDefault();
          this.props.onSubmit({
            song_id: this.props.songid,
            lyrics: this.state.value.replace(/\r?\n/g, '<br />')
          });
        }}
      />,
      <RaisedButton
        secondary={true}
        id="cancel"
        label='Cancel'
        labelStyle={{
          textTransform: 'none'
        }}
        className="song-form-button"
        onClick={this.props.cancel}
      />
    ]
    return(
      <div>
        <Dialog
          actions= {actions}
          open = {this.props.open}
          actionsContainerStyle = {{
            textAlign: 'center',
            marginTop: '-30px',
            paddingBottom: '24px'
          }}
          contentStyle = {{
            width: '450px',
            textAlign: 'center'
          }}
        >
          <form>
            <label value="Lyrics">
              <TextField
                id="newVerse"
                placeholder={`Press \"Enter\" to add a new line`}
                value={this.state.value}
                onChange={this.handleChange}
                multiLine={true}
                style={{
                  width: '400px'
                }}
              />
            </label>
          </form>
        </Dialog>
      </div>
    )
  }

}

export default VerseForm;
