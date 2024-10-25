function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log('User is authenticated:', req.user);
        return next();
    } else {
        console.log('User is not authenticated, redirecting to home');
        res.redirect('/');
    }
}

module.exports = { isLoggedIn };
