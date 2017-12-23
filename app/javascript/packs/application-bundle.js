import ReactOnRails from 'react-on-rails';

import VersesContainer from '../bundles/containers/VersesContainer';
import EventShowStore from '../bundles/components/EventShowStore';
import EventIndex from '../bundles/components/EventIndex';
import SongShowContainer from '../bundles/containers/SongShowContainer';

// This is how react_on_rails can see the HelloWorld in the browser.

ReactOnRails.register({
  VersesContainer,
  EventShowStore,
  EventIndex,
  SongShowContainer
});
