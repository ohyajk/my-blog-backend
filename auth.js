import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
    // Retrieve the access token from the request headers or query parameters
    const accessToken = req.headers.authorization?.split(' ')[1] || req.query.token;

    if (!accessToken) {
        return res.status(401).json({ message: 'Access token not found' });
    }

    try {
        // Verify and decode the access token
        const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);

        // Attach the decoded user ID to the request object for further use
        req.userId = decoded.userId;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid access token' });
    }
};

export default authenticate;
