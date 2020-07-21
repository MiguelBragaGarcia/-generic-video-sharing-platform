import fs from 'fs';
import path from 'path';
import uploadAvatarConfig from '../../../config/uploadAvatarConfig';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadAvatarConfig.tmpFolder, file),
      path.resolve(uploadAvatarConfig.uploadFolder, file)
    );
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadAvatarConfig.uploadFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
