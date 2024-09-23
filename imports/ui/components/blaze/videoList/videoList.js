import { Template } from 'meteor/templating';
import { Videos } from '../../../../api/files.js';
import { videoPlayerPath } from '../../../states/states.js';

import './videoList.html';

Template.videoList.events({
  'click .list-group-item'(event, template) {
    const videoId = event.currentTarget.getAttribute('data-video-id');
    // Appel de la méthode côté serveur pour obtenir le chemin de la vidéo
    Meteor.call('getVideoStream', videoId, (error, videoPath) => {
      if (error) {
        console.error('Erreur lors de la récupération de la vidéo :', error);
      } else {
        const regex = /videos\/(.*)/;
        const match = videoPath.match(regex);
        if (match && match[1]) {
          const videoPlayerPathRgx = "videos/" + match[1];
          videoPlayerPath.set(videoPlayerPathRgx); // Met à jour l'état avec le chemin de la vidéo
        } else {
          console.error('Aucune correspondance trouvée pour le chemin de la vidéo.');
        }
      }
    });
  }
});

Template.videoList.helpers({
  videos() {
    return Videos.find().get();
  },
});