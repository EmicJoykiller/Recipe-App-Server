// importing libraries to make the routes work
//express for server
import express from 'express';
// jwt and bcrypt for password hashing
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
//importing the UserModel to work with userRoute
import { UserModel } from '../models/Users.js'

// defining the actual router for it to work
const router = express.Router()

//api post requests for users
router.post("/register", async (req, res) => {
    //data under res to be shown to the frontend
    const { username, password } = req.body;
    //checking if the user with above info exist in the database
    const user = await UserModel.findOne({ username });
    //check to see if username already exists
    if (user) {
        return res.json({ message: "User exists!" })
    }
    // creating and hashing password
    const hashedPassword = await bcrypt.hash(password, 10);
    //creating users with the username and hashed password
    const newUser = new UserModel({ username, password: hashedPassword });
    //saving data on the database
    await newUser.save();
    //message to show successful new user operation
    res.json({ message: "User Registered Successfully!" })

    //message to return the search result
    res.json(user);

});

router.post("/login", async (req, res) => {
    //check the inputs and search the database for them
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    //show message if the user doesn't exist
    if (!user) {
        return res.json({ message: "User Doesn't Exist!" })
    }
    //if the user exists, check if the password(hashed) is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    //return response based on the password validation
    if (!isPasswordValid) {
        return res.json({ message: "Username or password Is Incorrect" })
    }
    //now that the credentials match, start the login process
    const token = jwt.sign({ id: user._id }, "secret");
    //store the validation results in the program
    res.json({ token, userID: user._id });



});







export { router as userRouter };

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        jwt.verify(authHeader, "secret", (err) => {
            if (err) {
                return res.sendStatus(403);
            }
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
