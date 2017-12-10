import ReactOnRails from 'react-on-rails';

import VersesContainer from '../bundles/containers/VersesContainer';
import EventShow from '../bundles/components/EventShow';
import EventIndex from '../bundles/components/EventIndex';
import SongShowContainer from '../bundles/containers/SongShowContainer';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  VersesContainer,
  EventShow,
  EventIndex,
  SongShowContainer
});
