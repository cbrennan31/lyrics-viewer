import React from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';

const DeleteConfirmation = (props) => {
  const actions = [
    <RaisedButton
      backgroundColor="#a4c639"
      type="submit"
      id="submit"
      label='Yes'
      labelStyle={{
        textTransform: 'none',
        color: 'white'
      }}
      className="song-form-button"
      onClick={() => props.deleteRequest({id: props.id})}
    />,
    <RaisedButton
      secondary={true}
      id="no"
      label='No'
      labelStyle={{
        textTransform: 'none'
      }}
      className="song-form-button"
      onClick={props.cancel}
    />
  ]
  return(
    <div>
      <Dialog
        actions= {actions}
        open = {props.open}
        actionsContainerStyle = {{
          textAlign: 'center',
          marginTop: '-30px',
          paddingBottom: '24px'
        }}
        contentStyle = {{
          width: '450px',
          textAlign: 'center'
        }}
        bodyStyle = {{
          color: 'black'
        }}
      >
        <p>Are you sure you want to delete this {props.item}?</p>
      </Dialog>
    </div>
  )
}

export default DeleteConfirmation
