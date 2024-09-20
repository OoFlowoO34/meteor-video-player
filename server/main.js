import { Meteor } from 'meteor/meteor';
import { Videos } from '../imports/api/files.js';

Meteor.startup(() => {
  // Code à exécuter lors du démarrage du serveur
});

Meteor.publish('videos', function() {
  console.log(Videos.find().get())
  return Videos.find().cursor;
});

Meteor.methods({
  getVideoStream(videoPath) {
    // Remplacer par la logique qui renvoie le flux de la vidéo
    // Ici, on retourne simplement le chemin de la vidéo
    return videoPath;  
  }
});
