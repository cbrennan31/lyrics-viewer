import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions/index'
import EventShow from '../components/EventShow'

const mapStateToProps = (state) => ({
  selectedSong: state.selectedSong
})

const EventShowContainer = connect(
  mapStateToProps
)(EventShow)

export default EventShowContainer
