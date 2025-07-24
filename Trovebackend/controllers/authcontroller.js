import user from '../models/usermodel.js';
import jwt from 'jsonwebtoken';
// import { sendOTPEmail } from '../utils/email.js';


const authcontroller = {
    async register(req, res) {
        const { username, email, password } = req.body;

        // Email validation on the server-side
        const domainEmailRegex = /@datasolve-analytics\.com$/;
        if (!domainEmailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email address! Only "@datasolve-analytics.com" is allowed.' });
        }

        // Basic validation for other fields
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required.' });
        }

        try {
            // Check if user already exists
            const existingUser = await user.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'User with this email already exists.' });
            }

            // Call the user model to create the user and send OTP email
            const result = await user.create({ username, email, password });

            res.status(201).json({ message: 'User registered successfully. Please check your email for OTP verification.' });
        } catch (error) {
            console.error("Error during user registration:", error);
            res.status(500).json({ message: 'An error occurred during registration. Please try again later.' });
        }
    },
    async verifyOTP(req, res) {
        const { email, otp } = req.body;


        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
        }

        // Ensure OTP is a valid number
        if (isNaN(otp)) {
            return res.status(400).json({ message: 'Invalid OTP format' });
        }

        try {
            const result = await user.verifyOTP({ email, otp });
            return res.status(200).json(result);
        } catch (error) {
            console.error("Error in verifyOTP controller:", error.message);
            return res.status(400).json({ message: error.message });
        }
    },

    // async login(req, res) {
    //     const { email, password } = req.body;

    //     if (!email || !password) {
    //         return res.status(400).json({ message: 'Email and password are required.' });
    //     }

    //     try {
    //         const result = await user.login({ email, password });
    //         return res.status(200).json(result);
    //     } catch (error) {
    //         console.error("Error in login controller:", error.message);
    //         return res.status(400).json({ message: error.message });
    //     }

    // },

    async login(req, res) {
        const { email, password } = req.body;
    
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }
    
        try {
            const result = await user.login({ email, password });
    
            // ✅ Send response including the token
            return res.status(200).json({
                message: result.message,
                userID: result.userID,
                username: result.username,
                token: result.token
            });
        } catch (error) {
            console.error("Error in login controller:", error.message);
            return res.status(400).json({ message: error.message });
        }
    },
    
    
    async forgotpassword(req, res) {

        const { email, newpassword, confirmnewpassword } = req.body;
        if (!email || !newpassword || !confirmnewpassword) {
            return res.status(400).json({ message: "All fields are required !" })
        }


        try {
            const result = await user.forgotpassword({ email, newpassword, confirmnewpassword })
            return res.status(200).json(result)
        }
        catch (error) {
            console.log("Error in forgot password controller:", error)
            return res.status(400).json({ message: error.message })
        }

    },
    
    async resendotp(req,res){

        const {email}=req.body;
        if(!email){
            return res.status(400).json({message:"Email is required !"})
        }
        try{
            const result=await user.resendOtp({email})
            return res.status(200).json(result)
        }
        catch(error){
            console.error("Error in resendotp controller:",error)
            return res.status(500).json({message:error.message})
        }
    },
    async verifyToken (req, res) {
       
const SECRET_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJyb2xlIjoiSVAgVGVhbSIsImlhdCI6MTczOTE4Mjk3MCwiZXhwIjoxNzM5MTkwMTcwfQ.lHW2wB8iBhif7drXABmXCp5aSAd3DA0HP8OWB8TvpPc";
        const token = req.headers.authorization?.split(" ")[1];
      
        if (!token) {
          return res.status(401).json({ message: "No token provided" });
        }
      
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
          if (err) {
            return res.status(403).json({ message: "Invalid token" });
          }
          res.status(200).json({ message: "Token is valid", user: decoded });
        });
      }


};

export default authcontroller;
