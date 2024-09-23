import { Meteor } from 'meteor/meteor';
import { Videos } from '../imports/api/files.js';

Meteor.startup(() => {
  // Code à exécuter lors du démarrage du serveur
});

Meteor.publish('videos', function() {
  return Videos.find().cursor;
});

Meteor.methods({
  async getVideoStream(videoId) {
    const videoArray  = await Videos.find({_id: videoId}).fetchAsync();
    const video = videoArray[0];
    return video.path; 
  }
});
