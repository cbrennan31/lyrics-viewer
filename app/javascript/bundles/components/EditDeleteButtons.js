import React from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

const EditDeleteButtons = (props) => {
  return (
    <div className='edit-delete-buttons'>
      <FlatButton
        label="Edit"
        onClick={props.onClickEdit}
        secondary={true}
        backgroundColor='hsl(0, 0%, 92%)'
        fullWidth={false}
        labelStyle={{
          textTransform: 'none',
          fontSize: '14px',
          verticalAlign: 'none',
          marginTop: '-17.5px',
          marginLeft: '-28.5px',
          position: 'absolute',
        }}
        style={{
          verticalAlign: 'middle',
          margin: '10px',
          width: '40px',
          minWidth: '0px',
          height: '20px',
        }}
      />
      <RaisedButton
        secondary={true}
        label="Delete"
        onClick={props.onClickDelete}
        labelStyle={{
          textTransform: 'none',
          fontSize: '14px',
          verticalAlign: 'none',
          marginTop: '-17.5px',
          marginLeft: '-6px',
        }}
        style={{
          verticalAlign: 'middle',
          margin: '0px 5px 0px 0px',
          width: '60px',
          minWidth: '0px',
          height: '20px',
          textAlign: 'center',
          boxShadow: '0px'
        }}
      />
    </div>
  )
}

export default EditDeleteButtons
