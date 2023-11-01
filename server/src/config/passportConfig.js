import GoogleStrategy from 'passport-google-oauth20';
const passportConfig = (passport) => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                // callbackURL: 'http://localhost:3002/api/v1/login/google',
            },
            async (accessToken, refreshToken, profile, done) => {
                console.log('check run passport config');
                return done(null, profile);
            },
        ),
    );
    passport.serializeUser(function (user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function (obj, cb) {
        cb(null, obj);
    });
};

export default passportConfig;
