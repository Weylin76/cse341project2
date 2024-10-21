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
const MongoStore = require('connect-mongo');
require('dotenv').config(); 

// Initialize Express
const app = express();
const port = process.env.PORT || 8080;

// CORS Middleware - Update based on the environment
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? 'https://cse341project2-s13i.onrender.com' : 'http://localhost:8080',
    credentials: true  // Allow credentials (cookies, headers)
};
app.use(cors(corsOptions));

// Parse incoming requests with JSON payloads
app.use(express.json());

// MongoDB connection
mongoose.connect(config.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    });

// Session middleware (required for Passport)
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Cookies only sent over HTTPS in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Required for cross-site cookies
    },
    store: MongoStore.create({
        mongoUrl: config.url,  // Use the same MongoDB connection for session storage
    })
}));

// Passport.js middleware
app.use(passport.initialize());
app.use(passport.session());

console.log('Passport middleware initialized');

// Google OAuth strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.NODE_ENV === 'production'
        ? process.env.GOOGLE_CALLBACK_URL_PRODUCTION  // For production
        : process.env.GOOGLE_CALLBACK_URL_LOCAL       // For local development
}, (accessToken, refreshToken, profile, done) => {
    console.log('Google OAuth callback reached, user authenticated:', profile.displayName);
    return done(null, profile);
}));

// Serialize and deserialize user (for maintaining login sessions)
passport.serializeUser((user, done) => {
    console.log('Serializing user:', user.displayName);
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    console.log('Deserializing user:', obj.displayName);
    done(null, obj);
});

// Routes for Google OAuth
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        console.log('OAuth callback successful, redirecting to dashboard');
        res.redirect('/dashboard');
    }
);

// Route to log out
app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        console.log('User logged out');
        res.redirect('/');
    });
});

// Protected route example (only accessible if logged in)
app.get('/dashboard', isLoggedIn, (req, res) => {
    if (req.user) {
        console.log(`User authenticated, accessing dashboard: ${req.user.displayName}`);
        res.send(`Hello, ${req.user.displayName}`);
    } else {
        console.log('Unauthorized access to dashboard');
        res.redirect('/');
    }
});

// Swagger API Documentation
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Register routes for dancers and dance classes
app.use('/dancers', dancerRoutes);
app.use('/danceclasses', danceClassRoutes);

// Add root route for home page
app.get('/', (req, res) => {
    console.log('Home page accessed');
    res.send('Welcome to the CSE341 Project 2 Home Page');
});

// Error handling for undefined routes
app.use((req, res) => {
    console.log(`Undefined route accessed: ${req.originalUrl}`);
    res.status(404).send('Sorry, that route does not exist');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Internal server error:', err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://cse341project2-s13i.onrender.com' : `http://localhost:${port}`;
    console.log(`Server is running on ${baseUrl}`);
    console.log(`Swagger API Docs available at ${baseUrl}/api-doc`);
});
