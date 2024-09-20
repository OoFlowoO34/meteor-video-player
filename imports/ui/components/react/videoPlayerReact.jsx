import React, { useState, useEffect } from 'react';
import { videoPlayerPath } from '../../states/states';
import { useTracker } from 'meteor/react-meteor-data';

const VideoPlayerReact = () => {
  const videoPath = useTracker(() => videoPlayerPath.get());

  useEffect(() => {
      const videoPlayer = document.getElementById('videoPlayer');
      videoPlayer.load();
      videoPlayer.play();

  }, [videoPath]);  // L'effet est déclenché quand videoPath change

  return (
    <div className="mt-4">
      <h2>Lecteur vidéo React</h2>
      <p>path : {videoPath}</p>
      <video id="videoPlayer" className="w-100" controls>
        <source src={videoPath} type="video/mp4" />
        Votre navigateur ne supporte pas la balise vidéo.
      </video>
    </div>
  );
};

export default VideoPlayerReact;