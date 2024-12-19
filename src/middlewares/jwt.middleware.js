import jwt from "jsonwebtoken";

export const jwtAuth = (req, res, next) => {
    // Get the token directly from the 'authorization' header
    const token = req.headers['authorization'];

    // Check if token is missing
    if (!token) {
        return res.status(401).send("Unauthorized");
    }

    try {
        // Verify the token using the secret
        const payload = jwt.verify(token, "bK4d|mLmCs`OUfe");
        //console.log(payload.userid);
        
        // If it's valid, store the user ID from the payload
        req.userID = payload.userID;
    } catch (err) {
        // Log the error and respond with 'Unauthorized'
        console.log(err);
        return res.status(401).send("Unauthorized");
    }

    // Proceed to the next middleware or route handler
    next();
};