const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const { ApolloServer } = require('apollo-server-express');
const swaggerUi = require('swagger-ui-express');
const MongoStore = require('connect-mongo');
const { swaggerDocs } = require('./config/swagger');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const config = require('./config/db.config');
const dancerRoutes = require('./routes/dancerRoutes');
const danceClassRoutes = require('./routes/danceClassRoutes');
require('dotenv').config();

// Initialize Express
const app = express();
const port = process.env.PORT || 8080;

// CORS Middleware
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? 'https://cse341project2-s13i.onrender.com' : 'http://localhost:8080',
    credentials: true  // Allow credentials (cookies, headers)
};
app.use(cors(corsOptions));

// Parse incoming requests with JSON payloads
app.use(express.json());

// MongoDB connection
mongoose.connect(config.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    });

// Google OAuth setup ONLY for local environment
if (process.env.NODE_ENV !== 'production') {
    const passport = require('passport');
    const GoogleStrategy = require('passport-google-oauth20').Strategy;
    const session = require('express-session');
    const MongoStore = require('connect-mongo');

    // 4. Session middleware (required for Passport)
    app.use(session({
        secret: process.env.SESSION_SECRET || 'your-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        },
        store: MongoStore.create({ mongoUrl: config.url })
    }));

    // 5. Passport.js middleware
    app.use(passport.initialize());
    app.use(passport.session());

    // 6. Google OAuth strategy
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL_LOCAL
    }, (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    }));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    // OAuth routes
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/failure' }),
        (req, res) => {
            req.session.save((err) => {
                if (err) console.error('Error saving session:', err);
                res.redirect('/dashboard');
            });
        }
    );

    app.get('/logout', (req, res, next) => {
        req.logout((err) => {
            if (err) return next(err);
            res.redirect('/');
        });
    });
}

// Failure route
app.get('/failure', (req, res) => {
    console.log('OAuth login failed');
    res.send('Failed to authenticate.');
});

// 9. Protected route example
app.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`Hello, ${req.user.displayName || 'User'}`);
    } else {
        res.send('Dashboard accessible in production without login.');
    }
});

// Swagger API Documentation
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Register routes for dancers and dance classes
app.use('/dancers', dancerRoutes);
app.use('/danceclasses', danceClassRoutes);

// 12. Root route for home page
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

// Start the server with conditional logging
app.listen(port, () => {
    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://cse341project2-s13i.onrender.com' : `http://localhost:${port}`;
    console.log(`Server is running on ${baseUrl}`);
    console.log(`Swagger API Docs available at ${baseUrl}/api-doc`);
});

module.exports = app;
