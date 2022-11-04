const mongoose = require('mongoose')
const { Schema } = mongoose

const alumniSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String
    },
    password: {
        type: String,
        required: true,
    },
    year: {
        type: Number
        
    },
    
    gender: {
        type: String
    },
    registrationNumber: {
        type: String
    },
    department: {
        type: String
        
    },
    company: {
        type: String
        
    },
    designation: {
        type: String
        
    },
    
    batch: {
        type: String
    },
    dob: {
        type: String,
        required: true
    },
    alumniMobileNumber: {
        type: Number
    },
    
    otp: {
       type:String
    }
})

module.exports = mongoose.model('alumni',alumniSchema)




