import { Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Injectable()
export class JobPhotoMulter {
  static MulterOption(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: './uploads/jobphoto',
        filename(req, file, callback) {
          const filename = `image-${Date.now()}.${file.mimetype.split('/')[1]}`;
          return callback(null, filename);
        },
      }),
      fileFilter(req, file, callback) {
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          callback(null, true);
        } else {
          return callback(
            new UnsupportedMediaTypeException(
              'Only png or jpeg format allowed',
            ),
            false,
          );
        }
      },
      limits: { fileSize: 3 * 1024 * 1024 },
    };
  }
}
