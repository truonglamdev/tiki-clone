import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpeg');
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file format: Only image files are allowed.'), false);
    }
};

const uploadImage = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1000000 },
});

const imageResizeAndSave = (outputPath) => async (req, res, next) => {
    if (!req.files) return next();
    try {
        await Promise.all(
            req.files.map(async (file) => {
                await sharp(file.path)
                    .resize(300, 300)
                    .toFormat('jpeg')
                    .jpeg({ quality: 90 })
                    .toFile(`${outputPath}/${file.filename}`);
                fs.unlinkSync(`${outputPath}/${file.filename}`);
            }),
        );
    } catch (error) {
        console.log(error);
    }
    next();
};

const productImgResize = imageResizeAndSave('public/images');
const blogImgResize = imageResizeAndSave('public/images');
const avatarImgResize = imageResizeAndSave('public/images');

export { uploadImage, productImgResize, blogImgResize, avatarImgResize };
