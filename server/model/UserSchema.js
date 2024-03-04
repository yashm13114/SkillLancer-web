const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema({
    fname: {
        type: String,
        required: [true, "Please enter your First Name"],
    },
    lname: {
        type: String,
        required: [true, "Please enter your Last Name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
    },
    password: {
        type: String,
        required: [true, "Please enter your pass"],
    },
    cpassword: {
        type: String,
        required: [true, "Please enter your cpass"],
    }
});
// Hashing password before saving to the database
userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

// Generate authentication token
userSchema.methods.generateAuthToken = async function() {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
};

// Verify password
userSchema.methods.verifyPassword = async function(candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        const isMatch2 = await bcrypt.compare(candidatePassword, this.cpassword);
        return isMatch, isMatch2;
    } catch (err) {
        console.log(err);
        return false;
    }
};
const User = mongoose.model("User", userSchema);
module.exports = User;