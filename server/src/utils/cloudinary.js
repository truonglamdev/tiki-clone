import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dsfx720gh',
    api_key: '259779196625337',
    api_secret: 'x3GN-m8PNsXScWw6VN6D1FdVChs',
});

const cloudinaryUploadImg = async (fileToUploads) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            fileToUploads,
            {
                resource_type: 'auto',
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

export { cloudinaryUploadImg };
