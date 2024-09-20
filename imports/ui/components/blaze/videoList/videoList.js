import { Template } from 'meteor/templating';
import { Videos } from '../../../../api/files.js';
import { videoPlayerPath } from '../../../states/states.js';
import './videoList.html';

Template.videoList.events({
  'click .list-group-item'(event, template) {
    const videoPath = event.currentTarget.getAttribute('data-video-path');
    const regex = /videos\/(.*)/;
    const match = videoPath.match(regex);
    const videoPlayerPath1 = "videos/" + match[1];
    videoPlayerPath.set(videoPlayerPath1);
  }
});

Template.videoList.helpers({
  videos() {
    return Videos.find().fetch();
  },
});