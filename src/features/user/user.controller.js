import userModel from './user.model.js';
import jwt from 'jsonwebtoken';
import UserRepository from './user.repo.js';
import bcrypt from 'bcrypt';

export default class userController {
    // SignUp Method
    // async signUP(req, res) {
    //     const { name, email, pass, type } = req.body;  // De-structure the request body
    //     if (!pass) {
    //         return res.status(400).send("Password is required");
    //     }

    //     // Hash the password
    //     const hashedpassword = await bcrypt.hash(pass, 12);  // Increase hash strength to 12 rounds

    //     const newUser = new userModel(name, email, hashedpassword, type);  // Create new user object for DB

    //     // Insert user into the database using UserRepository
    //     await UserRepository.signUP(newUser);

    //     console.log("User created successfully");
    //     res.send({ message: "User signed up successfully", user: newUser });  // Return success message
    // }
    async signUP(req, res) {
        const { name, email, pass, type } = req.body;
    
        // Validate required fields
        if (!name || !email || !pass || !type) {
            return res.status(400).send("All fields (name, email, pass, type) are required");
        }
    
        // Validate password strength before hashing
        const passwordRegex = /(?=^.{8,12}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        if (!passwordRegex.test(pass)) {
            return res.status(400).send("Password should be between 8 to 12 characters and contain at least one special character, one uppercase letter, and one digit.");
        }
    
        try {
            // Hash the password
            const hashedpassword = await bcrypt.hash(pass, 12);
    
            // Create the user object
            const newUser = { name, email, hashedpassword, type };
    
            // Save the user to the database
            const savedUser = await UserRepository.signUP(newUser);
    
            console.log("User created successfully:", savedUser);
            res.status(201).send({ message: "User signed up successfully", user: savedUser });
        } catch (err) {
            console.error("Error during signup:", err.message);
    
            // Handle duplicate email error
            if (err.code === 11000) {
                return res.status(400).send("Email already exists");
            }
    
            res.status(500).send("Failed to create user");
        }
    }
    

    // SignIn Method
   async signIN(req, res) {
    const { email, pass } = req.body;

    // Retrieve user by email
    const user = await UserRepository.findByEmail(email);
    console.log("User retrieved from DB:", user);

    if (!user) {
        return res.status(400).send("Invalid credentials");
    }

    if (!user.hashedpassword) {
        console.error("Hashed password is undefined. Check database or user creation.");
        return res.status(500).send("Server error: Password not found");
    }

    // Compare provided password with the hashed password from DB
    const result = await bcrypt.compare(pass, user.hashedpassword);

    if (result) {
        const token = jwt.sign(
            { userID: user._id, email: email },
            'bK4d|mLmCs`OUfe',
            { expiresIn: '10h' }
        ); 
        return res.status(200).send(token);
    } else {
        return res.status(400).send("Invalid credentials");
    }
}

    async resetPassword(req, res) {
        const { newPassword } = req.body;
        const userId = req.userID;
        // console.log(userId);
        
        // console.log(newPassword);


        const hashedPassword = await bcrypt.hash(newPassword, 12);
        try {
            await UserRepository.resetPassword(userId, hashedPassword);

            res.status(200).send("Password is updated")
        } catch (err) {
            console.log(err);

        }

    }

}
