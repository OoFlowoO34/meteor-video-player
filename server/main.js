import { Meteor } from 'meteor/meteor';
import { createWriteStream, mkdirSync, existsSync } from 'fs';
import path from 'path';
import { Videos } from '../imports/api/files.js';
import { FilesCollection } from 'meteor/ostrio:files';

// Définir le chemin du répertoire vidéo relatif au répertoire du projet
// const videoDir = path.join(Meteor.settings.public.rootPath || process.cwd(), 'videos');

// Vérifier si le répertoire existe, sinon le créer
// if (!existsSync(videoDir)) {
//   mkdirSync(videoDir, { recursive: true });
// }

Meteor.startup(() => {
  // Code à exécuter lors du démarrage du serveur
});


Meteor.publish('videos', function() {
  console.log(Videos.find().get())
  return Videos.find().cursor;
});


// Meteor.methods({
//   async 'texts.extractFromVideo'(videoData, videoName) {
//     console.log("videoName", videoName)
//     const filePath = path.join(videoDir, videoName);  // Utiliser le chemin complet pour la vidéo
    
//     try {
//       // Convertir les données base64 en Buffer
//       const buffer = Buffer.from(videoData.split(",")[1], 'base64');
      
//       // Enregistrer le fichier vidéo
//       createWriteStream(filePath).write(buffer);
//       console.log("videoName", videoName)

//       // Utiliser insertAsync pour insérer le texte extrait dans MongoDB
//       await Videos.insertAsync({
//         video: videoData,
//         createdAt: new Date(),
//       });

//       return videoName;
//     } catch (error) {
//       throw new Meteor.Error("Erreur lors de l'extraction ou de l'insertion du texte", error);
//     }
//   }
// });
