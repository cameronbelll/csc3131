import jwt, {decode} from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try { //must check if user is really who theys say they are; check if token is valid
        const token = req.headers.authorization.split(" ")[1]; //only want token which is in the first position of array
        const isCustomAuth = token.length < 500; //if it is less than 500 characters it is our own created token
        
        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test'); //verifies token

            req.userId = decodedData?.id;

        }
        else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;