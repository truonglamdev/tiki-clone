import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const cloudinaryUploadImg = async (fileToUploads) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            fileToUploads,
            {
                folder: 'tiki',
                resource_type: 'image',
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({
                        url: result.secure_url,
                        asset_id: result.asset_id,
                        public_id: result.public_id,
                    });
                }
            },
        );
    });
};


const cloudinaryDeleteImg = async (listPublicId) => {
    return new Promise((resolve, reject) => {
        cloudinary.api.delete_resources(listPublicId, { type: 'upload', resource_type: 'image' }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

export { cloudinaryUploadImg, cloudinaryDeleteImg };
