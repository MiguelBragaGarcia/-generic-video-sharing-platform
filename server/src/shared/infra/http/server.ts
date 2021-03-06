import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { errors } from 'celebrate';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm';
import '@shared/container';
import routes from './routes';

const server = express();

server.use(cors());
server.use(express.json());
server.use(routes);

server.use(
  '/files',
  express.static(uploadConfig.uploadAvatarFolder),
  express.static(uploadConfig.uploadVideoFolder),
  express.static(uploadConfig.uploadThumbnailFolder)
);

server.use(errors());

server.use(
  (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
);

server.listen(3333, () => {
  console.log('Server started on port: 3333');
});
