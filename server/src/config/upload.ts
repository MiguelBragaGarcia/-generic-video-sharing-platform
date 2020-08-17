import path from 'path';
import crypto from 'crypto';

import multer, { StorageEngine } from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadAvatarConfig {
  tmpFolder: string;
  uploadAvatarFolder: string;
  uploadVideoFolder: string;

  multer: {
    storage: StorageEngine;
  };
}

export default {
  tmpFolder,
  uploadAvatarFolder: path.resolve(tmpFolder, 'avatar'),
  uploadVideoFolder: path.resolve(tmpFolder, 'videos'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;
        return callback(null, fileName);
      },
    }),
  },
} as IUploadAvatarConfig;
