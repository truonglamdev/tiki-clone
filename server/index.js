import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDb } from './src/config/database.js';
import userRoute from './src/routes/userRoute.js';
import productRoute from './src/routes/productRoute.js';
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectDb();
const port = process.env.PORT || 3001;

app.use('/api/v1', userRoute);
app.use('/api/v1', productRoute);

app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${process.env.PORT}`);
});
