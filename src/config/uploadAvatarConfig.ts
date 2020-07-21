import path from 'path';
import crypto from 'crypto';

import multer, { StorageEngine } from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadAvatarConfig {
  tmpFolder: string;
  uploadFolder: string;

  multer: {
    storage: StorageEngine;
  };
}

export default {
  tmpFolder,
  uploadFolder: path.resolve(tmpFolder, 'avatar'),

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
