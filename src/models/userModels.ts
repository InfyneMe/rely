import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {type: String, require: "User name is require"},
    phone_number: {type: Number, require: "Phone number is require"},
    alternate_number: {type: Number, require: "Alternate number is require"},
    email: {type: String, require: "Email id is require"},
    password: {type: String, require: false},
    access_token: {type: String},
    refresh_token: {type: String},
    email_verified: {type: Boolean},
    picture: {type: String},
    id_token: {type: String}
},{ timestamps: true })

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
export default UserModel