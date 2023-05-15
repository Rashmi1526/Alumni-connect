const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const keys = require('../config/key')
const sendEmail = require('../utils/nodemailer')
const Alumni = require('../models/alumni')
const Message = require('../models/message')


//File Handler
const bufferConversion = require('../utils/bufferConversion')
const cloudinary = require('../utils/cloudinary')

const validateAlumniLoginInput = require('../validation/alumniLogin')
const validateAlumniUpdatePassword = require('../validation/alumniUpdatePassword')
const validateForgotPassword = require('../validation/forgotPassword')
const validateOTP = require('../validation/otpValidation')


module.exports = {
    alumniLogin: async (req, res, next) => {
        const { errors, isValid } = validateAlumniLoginInput(req.body);

        // Check Validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        const { registrationNumber, password } = req.body;

        const alumni = await Alumni.findOne({ registrationNumber })
        if (!alumni) {
            errors.registrationNumber = 'Registration number not found';
            return res.status(404).json(errors);
        }
        const isCorrect = await bcrypt.compare(password, alumni.password)
        if (!isCorrect) {
            errors.password = 'Invalid Credentials';
            return res.status(404).json(errors);
        }
        const payload = { id: alumni.id, alumni };
        jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
                res.json({
                    success: true,
                    token: 'Bearer ' + token
                });
            }
        );


    },
    
    getAllAlumni: async (req, res, next) => {
        try {
            const { department, year } = req.body;
            const alumnis = await Alumni.find({ department, year })
            if (alumnis.length === 0) {
                return res.status(400).json({ message: "No alumni found" })
            }
            return res.status(200).json({ result: alumnis })

        }
        catch (err) {
            return res.status(400).json({ message: err.message })
        }
    },
    getAlumniByName: async (req, res, next) => {
        try {
            const { name } = req.body
            const alumnis = await Alumni.find({ name })
            if (alumnis.length === 0) {
                return res.status(400).json({ message: "No alumni found" })
            }
            return res.status(200).json({ result: alumnis })

        }
        catch (err) {
            return res.status(400).json({ message: err.message })
        }
    },
    updatePassword: async (req, res, next) => {
        try {
            const { errors, isValid } = validateAlumnitUpdatePassword(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { registrationNumber, oldPassword, newPassword, confirmNewPassword } = req.body
            if (newPassword !== confirmNewPassword) {
                errors.confirmNewpassword = 'Password Mismatch'
                return res.status(400).json(errors);
            }
            const alumni = await Alumni.findOne({ registrationNumber })
            const isCorrect = await bcrypt.compare(oldPassword, alumni.password)
            if (!isCorrect) {
                errors.oldPassword = 'Invalid old Password';
                return res.status(404).json(errors);
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(newPassword, 10)
            alumni.password = hashedPassword;
            await alumni.save()
            res.status(200).json({ message: "Password Updated" })
        }
        catch (err) {
            console.log("Error in updating password", err.message)
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const { errors, isValid } = validateForgotPassword(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { email } = req.body
            const alumni = await Alumni.findOne({ email })
            if (!alumni) {
                errors.email = "Email Not found, Provide registered email"
                return res.status(400).json(errors)
            }
            function generateOTP() {
                var digits = '0123456789';
                let OTP = '';
                for (let i = 0; i < 6; i++) {
                    OTP += digits[Math.floor(Math.random() * 10)];
                }
                return OTP;
            }
            const OTP = await generateOTP()
            alumni.otp = OTP
            await alumni.save()
            await sendEmail(alumni.email, OTP, "OTP")
            res.status(200).json({ message: "check your registered email for OTP" })
            const helper = async () => {
                alumni.otp = ""
                await alumni.save()
            }
            setTimeout(function () {
                helper()
            }, 300000);
        }
        catch (err) {
            console.log("Error in sending email", err.message)
        }
    },
    getAlumniByRegName: async (req, res, next) => {
        try {
            const { registrationNumber } = req.body
            const alumnis = await Alumni.findOne({ registrationNumber })
            if (!alumnis) {
                return res.status(400).json({ message: "No alumni found" })
            }
            return res.status(200).json({ result: alumnis })

        }
        catch (err) {
            return res.status(400).json({ message: err.message })
        }
    },
    postOTP: async (req, res, next) => {
        try {
            const { errors, isValid } = validateOTP(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { email, otp, newPassword, confirmNewPassword } = req.body
            if (newPassword !== confirmNewPassword) {
                errors.confirmNewPassword = 'Password Mismatch'
                return res.status(400).json(errors);
            }
            const alumni = await Alumni.findOne({ email });
            if (alumni.otp !== otp) {
                errors.otp = "Invalid OTP, check your email again"
                return res.status(400).json(errors)
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(newPassword, 10)
            alumni.password = hashedPassword;
            await alumni.save()
            return res.status(200).json({ message: "Password Changed" })
        }
        catch (err) {
            console.log("Error in submitting otp", err.message)
            return res.status(200)
        }
    },
    postPrivateChat: async (req, res, next) => {
        try {
            const { senderName, senderId, roomId,
                receiverRegistrationNumber,senderRegistrationNumber,message } = req.body

            const receiverAlumni = await Alumni.findOne({ registrationNumber: receiverRegistrationNumber })
            const newMessage = await new Message({
                senderName,
                senderId,
                roomId,
                message,
                senderRegistrationNumber,
                receiverRegistrationNumber,
                receiverName: receiverAlumni.name,
                receiverId: receiverAlumni._id,
                createdAt: new Date()
            })
            await newMessage.save()
        }
        catch (err) {
            console.log("Error in post private chat", err.message)
        }
    },
    getPrivateChat: async (req, res, next) => {
        try {
            const { roomId } = req.params
            const swap = (input, value_1, value_2) => {
                let temp = input[value_1];
                input[value_1] = input[value_2];
                input[value_2] = temp;
            }
            const allMessage = await Message.find({ roomId })
            let tempArr = roomId.split(".")
            swap(tempArr, 0, 1)
            let secondRomId = tempArr[0] + '.' + tempArr[1]
            const allMessage2 = await Message.find({ roomId: secondRomId })
            var conversation = allMessage.concat(allMessage2);
            conversation.sort();
            res.status(200).json({ result: conversation })
        }
        catch (err) {
            console.log("errr in getting private chat server side", err.message)

        }
    },
    differentChats: async (req, res, next) => {
        try {
            const { receiverName } = req.params
            const newChatsTemp = await Message.find({ senderName: receiverName })
            // if (newChatsTemp.length === 0) {
            //    return res.status(404).json({ result: "No any new Chat" })
            // }
            var filteredObjTemp = newChatsTemp.map(obj => {
                let filteredObjTemp = {
                    senderName: obj.senderName,
                    receiverName: obj.receiverName,
                    senderRegistrationNumber: obj.senderRegistrationNumber,
                    receiverRegistrationNumber: obj.receiverRegistrationNumber,
                    receiverId: obj.receiverId
                }
                return filteredObjTemp
            })
            let filteredListTemp = [...new Set(filteredObjTemp.map(JSON.stringify))].map(JSON.parse)

            // const { receiverName } = req.params
            const newChats = await Message.find({ receiverName })
            // if (newChats.length === 0) {
            //    return res.status(404).json({ result: "No any new Chat" })
            // }
            var filteredObj = newChats.map(obj => {
                let filteredObj = {
                    senderName: obj.senderName,
                    receiverName: obj.receiverName,
                    senderRegistrationNumber: obj.senderRegistrationNumber,
                    receiverRegistrationNumber: obj.receiverRegistrationNumber,
                    receiverId: obj.receiverId
                }
                return filteredObj
            })
            let filteredListPro = [...new Set(filteredObj.map(JSON.stringify))].map(JSON.parse)
            for (var i = 0; i < filteredListPro.length; i++) {
                for (var j = 0; j < filteredListTemp.length; j++) {
                    if (filteredListPro[i].senderName === filteredListTemp[j].receiverName) {
                        filteredListPro.splice(i, 1)

                    }
                }
            }
            res.status(200).json({ result: filteredListPro })
        }
        catch (err) {
            console.log("Error in getting different chats", err.message)
        }
    },
    previousChats: async (req, res, next) => {
        try {
            const { senderName } = req.params
            const newChats = await Message.find({ senderName })
            // if (newChats.length === 0) {
            //     res.status(404).json({ result: "No any new Chat" })
            // }
            var filteredObj = newChats.map(obj => {
                let filteredObj = {
                    senderName: obj.senderName,
                    receiverName: obj.receiverName,
                    senderRegistrationNumber: obj.senderRegistrationNumber,
                    receiverRegistrationNumber: obj.receiverRegistrationNumber,
                    receiverId: obj.receiverId
                }
                return filteredObj
            })
            var filteredList = [...new Set(filteredObj.map(JSON.stringify))].map(JSON.parse)
            console.log("filterdList",filteredList)
            res.status(200).json({ result: filteredList })
        }
        catch (err) {
            console.log("Error in getting previous chats", err.message)
        }
    },
    updateProfile: async (req, res, next) => {
        try {
            const {email, gender, alumniMobileNumber, company, designation, batch} = req.body
            const userPostImg = await bufferConversion(req.file.originalname, req.file.buffer)
            const imgResponse = await cloudinary.uploader.upload(userPostImg)
            const alumni = await Alumni.findOne({ email })
            if (gender) {
                alumni.gender = gender
                await alumni.save()
            }
            if (alumniMobileNumber) {
                alumni.alumniMobileNumber = alumniMobileNumber
                await alumni.save()
            }
            if (company) {
                alumni.company = company
                await alumni.save()
            }
            if (designation) {
                alumni.designation = designation
                await alumni.save()
            }
            if (batch) {
                alumni.batch = batch
                await alumni.save()
            }
                alumni.avatar = imgResponse.secure_url
                await alumni.save()
                res.status(200).json(student)
        }
        catch (err) {
            console.log("Error in updating Profile", err.message)
        }
    },
    
    
          
    }

