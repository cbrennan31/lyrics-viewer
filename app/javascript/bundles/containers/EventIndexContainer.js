import { connect } from 'react-redux'
import React, { Component } from 'react';
import * as Actions from '../actions/EventIndex'
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  return({
    test: state.test
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({

  }, dispatch)
}

class EventIndexContainer extends Component{

  render() {
    return(
      <div>
        <p>{this.props.test}</p>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventIndexContainer)
