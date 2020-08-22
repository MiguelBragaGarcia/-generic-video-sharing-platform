import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProviderThumbnail implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadThumbnailFolder, file)
    );
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadThumbnailFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }

  public async deleteFileFailUpload(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.tmpFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProviderThumbnail;
