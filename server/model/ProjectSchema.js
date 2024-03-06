const mongoose = require("mongoose");
const ProjectSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter your title"],
    },
    discription: {
        type: String,
        required: [true, "Please enter yourdiscription"],
    },
    phonenumber: {
        type: Number,
        required: [true, "Please enter number"],
    },
    skills: {
        type: String,
        required: [true, "Please enter your skills"],
    },
    budget: {
        type: String,
        required: [true, "Please enter your budget"],
    }
});

const project = mongoose.model("projects", ProjectSchema);
module.exports = project;