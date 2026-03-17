import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import config from "../config/config.js"

const userSchema = new Schema(
{
    userName: {
        type: String,
        required: [true, "username must be required"],
        unique: [true, "username must be unique" ],
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: [true, "email must be required"],
        unique: [true, "email must be unique" ],
        index: true
    },
    fullName: {
        type: String,
        required: [true, "username must be required"],
    },
    avatar: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    },
    watchHistory: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Videos"
        }
    ]

}, 
{
    timestamps: true
})

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password.toString(), this.password.toString())
}

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName
        },
        config.ACCESS_TOKEN_SECRET,
        {
            expiresIn: config.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        config.REFRESH_TOKEN_SECRET,
        {
            expiresIn: config.REFRESH_TOKEN_EXPIRY
        }
    )
}

const User = mongoose.model("User", userSchema)

export default User;