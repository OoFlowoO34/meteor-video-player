import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Videos } from '../api/files.js';
import { Meteor } from 'meteor/meteor';
import { videoPlayerPath } from './states/states.js';

import './app.html';
import './components/blaze/videoList/videoList.js';
import './components/blaze/videoForm/videoForm.js';
import './components/blaze/videoPlayer/videoPlayer.js';
// import './videoList.html';

import VideoPlayerReact from './components/react/videoPlayerReact.jsx';

// Souscription aux vidéos
Meteor.subscribe('videos');

// Publie les vidéos dans le template
Template.videoList.onCreated(function () {
  this.videoPlayerPath = new ReactiveVar('');
});

// Création d'une ReactiveVar pour suivre l'état de l'upload
Template.videoForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

// Gestion des helpers pour suivre l'état de l'upload
Template.videoForm.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  }
});

// Gestion de l'événement de soumission du formulaire
Template.videoForm.events({
  'submit .new-video'(event, template) { // Ajout du template en paramètre pour gérer ReactiveVar
    event.preventDefault();

    const target = event.target;
    const videoFile = target.video.files[0];  // Récupérer le fichier vidéo
    
    if (videoFile) {
      console.log("Nom du fichier:", videoFile.name);
      console.log("Type du fichier:", videoFile.type); // Vérifiez le type du fichier

      // Insérer le fichier vidéo en utilisant `ostrio:files`
      const uploadInstance = Videos.insert({
        file: videoFile,
        chunkSize: 'dynamic'
      }, true); // `true` démarre automatiquement l'upload

      // Gestion des événements de l'upload
      uploadInstance.on('start', function () {
        console.log('Upload démarré pour le fichier:', videoFile.name);
        template.currentUpload.set(this); // Démarre l'upload et met à jour l'état
      });

      uploadInstance.on('progress', function (progress) {
        console.log('Progression de l\'upload :', progress + '%');
      });

      uploadInstance.on('end', function (error, fileObj) {
        if (error) {
          console.error('Erreur lors de l\'upload :', error.reason);
          window.alert('Erreur pendant l\'upload : ' + error.reason);
        } else if (fileObj) {
          console.log("Vidéo enregistrée avec succès :", fileObj._id);
          window.alert('Vidéo "' + fileObj.name + '" téléchargée avec succès');
        } else {
          console.error("Erreur : fileObj est undefined !");
        }
        template.currentUpload.set(false); // Réinitialise l'état après l'upload
      });

    } else {
      console.error("Aucun fichier vidéo sélectionné.");
      window.alert('Veuillez sélectionner un fichier vidéo.');
    }
  },
});

Template.videoList.events({
  'click .list-group-item'(event, template) {
    // Récupérer le chemin de la vidéo à partir de l'attribut de données
    const videoPath = event.currentTarget.getAttribute('data-video-path');
    console.log("videoPath", videoPath);

    const regex = /videos\/(.*)/;
    const match = videoPath.match(regex);

    console.log("match", match[1]);
    const videoPlayerPath1 = "videos/" + match[1];

    console.log("videoPlayerPath", videoPlayerPath1);

    // Mettre à jour la ReactiveVar videoPlayerPath
    
    videoPlayerPath.set(videoPlayerPath1);
    console.log("template.videoPlayerPath.get()",  template.videoPlayerPath.get());
    console.log("Template.instance().videoPlayerPath.get()",  Template.instance().videoPlayerPath.get());

    
  }
});


Template.videoPlayerReact.helpers({
  VideoPlayerReact() {
    return VideoPlayerReact;
  },
  prop() {
    return Template.instance().videoPlayerPath.get();
  }
});

Template.videoList.helpers({
  videos() {
    console.log("Videos.find().get()", Videos.find().get());
    return Videos.find().get(); // Use fetch() to convert cursor to array
  },
});