import mongoose from 'mongoose';

export const connectDb = () => {
    mongoose
        .connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((data) => {
            console.log(`Mongoose connected with server ${data.connection.host}`);
        })
        .catch((error) => {
            console.log(error);
        });
};
