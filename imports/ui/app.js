// import { Texts } from '../../imports/api/texts.js';
// import { Template } from 'meteor/templating';
// import { Meteor } from 'meteor/meteor';

// import './app.html';

// Meteor.subscribe('texts');

// // Publie les textes dans le template
// Template.body.helpers({
//   texts() {
//     return Texts.find({});
//   }
// });

// // Gestion de l'événement de soumission du formulaire
// Template.textForm.events({
//   'submit .new-text'(event) {
//     event.preventDefault();

//     const target = event.target;
//     const videoFile = target.video.files[0];  // Récupérer le fichier vidéo

//     if (videoFile) {
//       const reader = new FileReader();
//       // Lire le fichier vidéo en tant que buffer
//       reader.onload = function (e) {
//         const videoData = e.target.result;
//         console.log(videoFile.name) 


//         // Appeler une méthode serveur pour traiter la vidéo et extraire le texte
//         Meteor.call('texts.extractFromVideo', videoData, videoFile.name, (error, result) => {
//           if (error) {
//             console.error("Erreur lors de l'extraction du texte :", error);
//           } else {
//             console.log("Texte extrait avec succès :", videoFile.name);
//           }
//         });
//       };

//       reader.readAsDataURL(videoFile);  // Lire la vidéo en tant qu'URL de données
//     }
//   },
// });



import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Videos } from '../api/files.js';
import { Meteor } from 'meteor/meteor';

import './app.html';
// import './videoList.html';

// Souscription aux vidéos
Meteor.subscribe('videos');

// Publie les vidéos dans le template
Template.videoList.helpers({
    videos() {
        console.log("Videos.find().get()",Videos.find().get())
        return Videos.find().get(); // Use fetch() to convert cursor to array
    }
});

// Template.videoList.onCreated(function() {
//     this.subscribe('videos');
// });
  

// Template.videoList.helpers({
// videos() {
//     return Videos.find();
// }
// });
  

// // Sample video data
// const sampleVideos = [
//     { name: 'Sample Video 1', url: 'http://example.com/video1.mp4' },
//     { name: 'Sample Video 2', url: 'http://example.com/video2.mp4' },
//     { name: 'Sample Video 3', url: 'http://example.com/video3.mp4' }
//   ];
  
//   // Publie les vidéos dans le template
//   Template.body.helpers({
//     videos() {
//       return sampleVideos; // Return the static array of videos
//     }
// });
  

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
    'click .list-group-item'(event) {
      // Récupérer le chemin de la vidéo à partir de l'attribut de données
      const videoPath = event.currentTarget.getAttribute('data-video-path');
      console.log("videoPath",videoPath)

      const regex = /videos\/(.*)/;
      const match = videoPath.match(regex);

      console.log("match",match[1])
      const videoPlayerPath = "videos/" + match[1];

      console.log("videoPlayerPath",videoPlayerPath)

      // Mettre à jour la source du lecteur vidéo
      const videoPlayer = document.getElementById('videoPlayer');
      videoPlayer.src = videoPlayerPath;


      // Assurez-vous que le lecteur vidéo se met à jour correctement
      videoPlayer.load();
      videoPlayer.play();
    }
  });