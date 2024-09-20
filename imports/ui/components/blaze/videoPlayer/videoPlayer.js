import { Template } from 'meteor/templating';
import VideoPlayerReact from '../../react/videoPlayerReact.jsx';
import './videoPlayer.html';

Template.videoPlayerReact.helpers({
  VideoPlayerReact() {
    return VideoPlayerReact;
  },
  prop() {
    return Template.instance().videoPlayerPath.get();
  }
});