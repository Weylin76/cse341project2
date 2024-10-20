const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const { swaggerUi: swaggerSetup, swaggerDocs } = require('./config/swagger');
const dancerRoutes = require('./routes/dancerRoutes');
const danceClassRoutes = require('./routes/danceClassRoutes');
const config = require('./config/db.config');
const { isLoggedIn } = require('./middlewares/authMiddleware');

// Additional packages for OAuth
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
require('dotenv').config();

// Initialize Express
const app = express();
const port = process.env.PORT || 8080;

// Middleware setup
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(config.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    });

// Session middleware (required for Passport)
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
}));

// Passport.js middleware
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID, // from .env file
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, // from .env file
    callbackURL: process.env.GOOGLE_CALLBACK_URL // Use your redirect URI here from .env
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// Routes for Google OAuth
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/dashboard');
    }
);

// Route to log out
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
});

// Protected route example
app.get('/dashboard', isLoggedIn, (req, res) => {
    res.send(`Hello, ${req.user.displayName}`);
});

// Swagger API Documentation
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Register routes for dancers and dance classes
app.use('/dancers', dancerRoutes);
app.use('/danceclasses', danceClassRoutes);

// Start the server
app.listen(port, () => {
    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://cse341project2-s13i.onrender.com' : `http://localhost:${port}`;
    console.log(`Server is running on ${baseUrl}`);
    console.log(`Swagger API Docs available at ${baseUrl}/api-doc`);
});
