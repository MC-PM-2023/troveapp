import pool from '../config/database.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendOTPEmail } from '../utils/email.js';
import { error, profile } from 'console';
import jwt from 'jsonwebtoken';

const SECRET_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJyb2xlIjoiSVAgVGVhbSIsImlhdCI6MTczOTE4Mjk3MCwiZXhwIjoxNzM5MTkwMTcwfQ.lHW2wB8iBhif7drXABmXCp5aSAd3DA0HP8OWB8TvpPc"
const user = {
    async create({ username, email, password }) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction(); // Start a transaction

            const hashedPassword = await bcrypt.hash(password, 10);
            const otp = crypto.randomInt(100000, 999999); // Generate OTP

            // Insert the user data, including OTP, but don't commit yet
            const query = 'INSERT INTO troveusers (username, email, password, otp, isverified) VALUES (?, ?, ?, ?, ?)';
            const [results] = await connection.execute(query, [username, email, hashedPassword, otp, false]);

            console.log(`User created with ID: ${results.insertId}`);

            // Try sending OTP email
            try {
                await sendOTPEmail(email, otp);
                await connection.commit(); // Commit the transaction if email is sent successfully
                console.log(`OTP email sent to ${email}`);
                return { userID: results.insertId, otp };
            } catch (emailError) {
                console.error("Error sending OTP email:", emailError.message);
                await connection.rollback(); // Rollback the transaction if email fails
                throw new Error('Failed to send OTP email. Please try again later.');
            }

        } catch (error) {
            console.error("Error during user creation:", error);
            await connection.rollback(); // Rollback transaction if any error occurs
            throw error;
        } finally {
            connection.release();
        }
    },

    // Find user by email to check if it already exists
    async findByEmail(email) {
        const query = 'SELECT * FROM troveusers WHERE email = ?';
        const [results] = await pool.execute(query, [email]);
        return results.length > 0 ? results[0] : null;
    },


    async verifyOTP({ email, otp }) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            // Fetch the user by email and check the OTP
            const query = 'SELECT otp, isverified FROM troveusers WHERE email = ?';
            const [results] = await connection.execute(query, [email]);

            if (results.length === 0) {
                throw new Error('User not found');
            }

            const user = results[0];

            if (user.isverified) {
                throw new Error('User already verified');
            }

            // Ensure OTP comparison is type-safe
            if (parseInt(user.otp, 10) !== parseInt(otp, 10)) {
                throw new Error('Invalid OTP');

            }

            // Update the user's verification status
            const updateQuery = 'UPDATE troveusers SET isverified = ?, otp = NULL WHERE email = ?';
            await connection.execute(updateQuery, [true, email]);

            await connection.commit();
            console.log(`User ${email} verified successfully`);
            return { message: 'User verified successfully' };
        } catch (error) {
            console.error("Error verifying OTP:", error);
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },
    // async login({ email, password }) {
    //     const connection = await pool.getConnection();
    //     try {
    //         const query = 'SELECT * FROM troveusers WHERE email = ?';
    //         const [results] = await connection.execute(query, [email]);

    //         if (results.length === 0) {
    //             throw new Error('User not found');
    //         }

    //         const user = results[0];

    //         if (!user.isverified) {
    //             throw new Error('User is not verified. Please verify your account before logging in.');
    //         }

    //         const isPasswordValid = await bcrypt.compare(password, user.password);
    //         if (!isPasswordValid) {
    //             throw new Error('Invalid email or password.');
    //         }

    //         console.log(`User ${email} logged in successfully`);
    //         return { message: 'Login successful', userID: user.id, username: user.username };
    //     } catch (error) {
    //         console.error("Error during login:", error);
    //         throw error;
    //     } finally {
    //         connection.release();
    //     }
    // },

//corrected one

   async login({ email, password }) {
    const connection = await pool.getConnection();
    try {
        // Get user from troveusers
        const query = 'SELECT * FROM troveusers WHERE email = ?';
        const [results] = await connection.execute(query, [email]);

        if (results.length === 0) {
            throw new Error('User not found');
        }

        const user = results[0];

        if (!user.isverified) {
            throw new Error('User is not verified. Please verify your account before logging in.');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password.');
        }

        // ✅ Fetch profile link from Users_Profile
        const profileQuery = 'SELECT Image_URL FROM Users_Profiles WHERE Email_ID = ?';
        const [profileResults] = await connection.execute(profileQuery, [email]);
        const profileLink = profileResults.length > 0 ? profileResults[0].Image_URL : null;
       

        
        // ✅ Generate JWT token with profile link
        const token = jwt.sign(
            { userID: user.id, email: user.email, profileLink },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        // ✅ Return token along with user details and profile link 
        return { 
            message: 'Login successful',
            userID: user.user_id,
            username: user.username,
            email: user.email,
            profileLink,
            token
        };
    } catch (error) {
        throw error; 
    } finally {
        connection.release(); 
    }
},



    
    async forgotpassword({ email, newpassword, confirmnewpassword }) {

        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const query = `select * from troveusers where email =?`;
            const queryupdate = `update troveusers set password= ? where email=?`
            const [results] = await connection.execute(query, [email])
            if (results.length === 0) {
                throw new error("User Not found !")
            }
            if (newpassword != confirmnewpassword) {
                throw new error("New password and confirm password doesn't match")
            }
            const hashedPassword = await bcrypt.hash(newpassword, 10)
            await connection.execute(queryupdate, [hashedPassword, email])
            await connection.commit();
            // console.log(`Password updated successfully for ${email}`)
            return ({ message: "Password updated successfully" })
        }
        catch (error) {
            // console.error("Error in forgotpassword reset model:", error)
            await connection.rollback();
            throw error;
        }
        finally {
            connection.release();
        }
    },

    async resendOtp({ email }) {
        const connection = await pool.getConnection();
       
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error("Invalid email format!");
            }
            await connection.beginTransaction();
            const query = `select * from troveusers where email =?`;
            const [results] = await connection.execute(query, [email]);
            if (results.length === 0) {
                throw new Error("User not found !")
            }
            const users = results[0]
            if (users.isverified) {
                throw new Error("User is already verified !")
            }
            const otp = crypto.randomInt(100000, 999999)
            const updateotpquery = `update troveusers set otp=? where email=?`
            await connection.execute(updateotpquery, [otp, email])

            try {
                await sendOTPEmail(email, otp)
                await connection.commit();
                // console.log(`OTP sent to ${email}`)
                return({message:"OTP Sent successfully"})
            }
            catch (emailerror) {
                // console.error("Error sending resend otp email:", emailerror.message)
                await connection.rollback();
                throw emailerror;
            }
        }
        catch (error) {
            // console.error("Error in resendotp model:",error)
            await connection.rollback();
throw  error;

        }
        finally {
            connection.release()
        }
    }

};

export default user;
