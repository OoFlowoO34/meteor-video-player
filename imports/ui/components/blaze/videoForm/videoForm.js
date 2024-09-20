import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './videoForm.html';

Template.videoForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.videoForm.helpers({
  currentUpload() {
    return Template.instance().currentUpload.get();
  }
});

Template.videoForm.events({
  'submit .new-video'(event, template) {
    event.preventDefault();
    const target = event.target;
    const videoFile = target.video.files[0];
    // Logic to handle video file upload
  }
});