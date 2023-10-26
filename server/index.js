import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { connectDb } from './src/config/database.js';
import userRoute from './src/routes/userRoute.js';
import productRoute from './src/routes/productRoute.js';
import couponRoute from './src/routes/couponRoute.js';
import orderRoute from './src/routes/orderRoute.js';
import colorRoute from './src/routes/colorRoute.js';
import brandRoute from './src/routes/brandRoute.js';
import blogCategoryRoute from './src/routes/blogCategoryRoute.js';
import blogRoute from './src/routes/blogRoute.js';
import authRoute from './src/routes/authRoute.js';
import passportConfig from './src/config/passportConfig.js';
import passport from 'passport';
import expressSession from 'express-session';
// import FacebookStrategy from 'passport-facebook';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
connectDb();
const port = process.env.PORT || 3001;
passportConfig(passport);

app.use(
    expressSession({
        secret: 'jayantpatilapp',
        resave: true,
        saveUninitialized: true,
    }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', userRoute);
app.use('/api/v1', productRoute);
app.use('/api/v1', couponRoute);
app.use('/api/v1', orderRoute);
app.use('/api/v1', colorRoute);
app.use('/api/v1', brandRoute);
app.use('/api/v1', blogCategoryRoute);
app.use('/api/v1', blogRoute);
app.use('/api/v1', authRoute);

app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${process.env.PORT}`);
});
