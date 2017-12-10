/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

console.log('Hello World from Webpacker')

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
