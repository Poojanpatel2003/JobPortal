import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
                SUCCESS: false,
            });
        }

        // Verify token
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                SUCCESS: false,
            });
        }

        // Attach user ID to request object
        req.id = decode.UserId;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.log("Error in isAuthenticated middleware:", error);
        res.status(500).json({
            message: "Internal Server Error",
            SUCCESS: false,
        });
    }
};

export default isAuthenticated;
