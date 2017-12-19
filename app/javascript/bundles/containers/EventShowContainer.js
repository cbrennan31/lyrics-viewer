import { connect } from 'react-redux'
import EventShow from '../components/EventShow'

const mapStateToProps = (state) => ({
  selectedSong: state.selectedSong,
  cable: state.cable,
  subscription: state.subscription
})

const EventShowContainer = connect(
  mapStateToProps
)(EventShow)

export default EventShowContainer
