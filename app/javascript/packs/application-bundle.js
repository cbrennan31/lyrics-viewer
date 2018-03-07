import ReactOnRails from 'react-on-rails';

import TextContainer from '../bundles/containers/TextContainer';
import EventShowStore from '../bundles/components/EventShowStore';
import EventIndexStore from '../bundles/components/EventIndexStore';
import SongShowContainer from '../bundles/containers/SongShowContainer';

// This is how react_on_rails can see the HelloWorld in the browser.

ReactOnRails.register({
  TextContainer,
  EventShowStore,
  EventIndexStore,
  SongShowContainer
});
