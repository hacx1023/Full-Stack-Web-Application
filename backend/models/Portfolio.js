const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    aboutText: {
        type: String,
        default: "I am a dedicated professional with a strong track record of delivering high-quality, scalable solutions."
    },
    avatar: {
        type: String,
        default: "",
    },
    skills: {
        type: [String],
        required: true,
    },
    experience: [
        {
            company: String,
            role: String,
            duration: String,
            description: String,
        }
    ],
    projects: [
        {
            title: String,
            description: String,
            technologies: [String],
            link: String,
        }
    ],
    contact: {
        email: String,
        phone: String,
        linkedin: String,
        github: String,
    }
}, {
    timestamps: true,
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;
