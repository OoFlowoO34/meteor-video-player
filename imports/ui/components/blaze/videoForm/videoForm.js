import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Videos } from '../../../../api/files.js';

import './videoForm.html';

Template.videoForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(0);
});

Template.videoForm.helpers({
  currentUpload() {
    return Template.instance().currentUpload.get();
  }
});

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
      }, false); // `true` démarre automatiquement l'upload

      // Gestion des événements de l'upload
      uploadInstance.on('start', function () {
        console.log('Upload démarré pour le fichier:', videoFile.name);
        template.currentUpload.set(this); // Démarre l'upload et met à jour l'état
      });

      // uploadInstance.on('progress', function (progress) {
      //   console.log('Progression de l\'upload :', progress + '%');
      //   const currentUpload = template.currentUpload.get();

      //   if (currentUpload) {
      //     currentUpload.progress = progress;
      //     template.currentUpload.set(currentUpload);
      //   }
      // });

      uploadInstance.on('end', function (error, fileObj) {
        if (error) {
          console.error('Erreur lors de l\'upload :', error.reason);
          window.alert('Erreur pendant l\'upload : ' + error.reason);
        } else if (fileObj) {
          console.log("Vidéo enregistrée avec succès :", videoFile.name);
          window.alert('Vidéo "' + videoFile.name + '" téléchargée avec succès');
        } else {
          console.error("Erreur : fileObj est undefined !");
        }
        template.currentUpload.set(false); // Réinitialise l'état après l'upload
      });

      uploadInstance.start()

    } else {
      console.error("Aucun fichier vidéo sélectionné.");
      window.alert('Veuillez sélectionner un fichier vidéo.');
    }
  },
});