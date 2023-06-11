import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try{
        let token = req.header("Authorization");
        // console.log(token)

        if (!token) {
            return res.status(403).send("Access denied");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
            // console.log(token)
        }
        

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(verified)
        req.user = verified;
        next();
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
