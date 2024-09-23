import { FilesCollection } from 'meteor/ostrio:files';
import path from 'path';

export const Videos = new FilesCollection({
  debug: true,
  collectionName: 'Videos',
  storagePath: () => path.resolve('/Users/florian/Desktop/new-meteor/first-steps-meteor/public/videos'),  // Absolute path to the "videos" folder

  allowClientCode: false, // Disable client-side insertions/updates

  onBeforeUpload(file) {
    // Limit file size to 50MB and accept only video files
    if (file.size <= 500 * 1024 * 1024 && /video/i.test(file.type)) {
      return true;
    }
    return 'Only videos less than 50MB are allowed.';
  }
});
