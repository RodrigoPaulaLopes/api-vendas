import multer, { diskStorage } from 'multer';
import path from 'path';
import AppError from 'shared/errors/error';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

const storage = diskStorage({
    destination: uploadFolder,
    filename(request, file, callback) {
        const filename = `${Date.now()}-${file.originalname}`;
        callback(null, filename);
    }
});

const fileFilter = (request: any, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
    const allowedMimes = [
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/gif',
    ];

    if (allowedMimes.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(new AppError('Invalid file type. Only images are allowed!', 400));
    }
};

export default {
    directory: uploadFolder,
    storage,
    fileFilter
};
