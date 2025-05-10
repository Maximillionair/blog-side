const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (!err) {
                req.user = user;   // Make user available in backend routes
                res.locals.user = { id: user.id, name: user.name } // make user available in views
            }
        });
    } else {
        res.locals.user = null; // Ensure navbar shows correct options
    }
    
    next();
};

// Middleware for protected routes
exports.requireAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden" });
        }
        req.user = user;
        next();
    });
};
