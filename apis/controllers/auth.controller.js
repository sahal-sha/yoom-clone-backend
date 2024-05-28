import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signUp = async (req, res) => {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    
    
      try {
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });
        console.log(newUser ) 
        if(newUser){
            const userSaved = await newUser.save();
            generateTokenAndSetCookie(newUser._id,res)
            const {...resData} = userSaved._doc;
            console.log(resData,"❤️😊❄️");
            
            
            res.status(200).json(resData);

        }else{
            console.log("Error in signUp controller");
            res.status(400).json({error: "Invalid server error"})
        }

    } catch (error) {
        console.error(error.message);
        
    }
};


export const login = async (req,res) =>{
    const {username,password} = req.body;
    try {
         const user = await User.findOne({username:username});
         const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        
         if(!user||!isPasswordCorrect){
             return res.status(400).json({error:"Invalid username or password" });
            }
        
        
        generateTokenAndSetCookie(user._id,res);
        const {...restData} = user._doc;
        res.status(200).json(restData);

        
  

    } catch (error) {
        console.log("Error in login controller");
        res.status(400).json({ error: "Invalid server error" });
        
    }
}

export const logout =  (req,res) =>{
    try {

        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
        console.log("logout route");
        
    } catch (error) {
        console.log("Error in logout controller");
        res.status(400).json({ error: "Invalid server error" });
        
    }

}