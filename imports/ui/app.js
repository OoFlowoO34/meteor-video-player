import { Meteor } from 'meteor/meteor';

import './app.html';
import './components/blaze/videoList/videoList.js';
import './components/blaze/videoForm/videoForm.js';
import './components/blaze/videoPlayer/videoPlayer.js';

Meteor.subscribe('videos');