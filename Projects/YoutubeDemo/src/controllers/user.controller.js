import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser=asyncHandler(async (req,res)=>{
    // res.status(200).json({
    //     message:"ok"
    // })

    //steps
    //get user details from user fronted
    //validation - not empty
    //check if user already exists : username, email
    // check  for images, check for avatar
    //upload them to cloudinary, avatar
    //create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response

    const {username,password,fullName,email}=req.body;
    console.log("req body ",req.body);
    // console.log("email",email);

    // if(fullName===""){
    //     throw new ApiError(400,"FullName is required")
    // }
    //use for all or use below
    if(
        [fullName,email,password,username].some((field)=>field?.trim()==="")
    )
    {
        throw new ApiError(400,"All fields are required");
    }

    // User.findOne({email}) //only for email
    const existedUser= await User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User with username or email already exist")
    }

    //give by multer
    // console.log("req files",req.files);
    const avatarLocalPath= req.files?.avatar[0]?.path;
    // console.log("Avatar Local Path",avatarLocalPath);
    // const coverImageLocalPath= req.files?.coverImage[0]?.path; //it show error while no cover Image so use below
    // console.log("CoverImage Local Path",coverImageLocalPath);

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length >0) {
        coverImageLocalPath=req.files.coverImage[0].path;
    }
    
    if (!avatarLocalPath) {
        throw new ApiError(400,"Avatar file is required");
    }

    const avatar= await uploadOnCloudinary(avatarLocalPath);
    const coverImage= await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400,"Avatar file is required");   
    }

    const user= await User.create({
        fullName,
        avatar:avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    });

    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken" //filled with dont want with - sign
    );
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while creating User")
    }


    return res.status(201).json(
        new ApiResponse(200,createdUser,"User Registered Successfully")
    )

})

export {registerUser}