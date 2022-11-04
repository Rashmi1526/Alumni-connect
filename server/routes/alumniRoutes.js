const express = require('express')
const passport = require('passport')
const router = express.Router()
const upload = require('../utils/multer')

const {  getAllAlumnis, getAlumniByName, alumniLogin,
    updatePassword, forgotPassword, getAlumniByRegName,
    postOTP, postPrivateChat, getPrivateChat, differentChats,
    previousChats, updateProfile } = require('../controller/alumniController')

router.post('/login', alumniLogin)

router.post('/forgotPassword', forgotPassword)

router.post('/postOTP', postOTP)

//UPLOAD PROFILE
router.post('/updateProfile', passport.authenticate('jwt', { session: false }),
    upload.single("avatar"), updateProfile)

//UPLOAD PASSWORD
router.post('/updatePassword', passport.authenticate('jwt', { session: false }), updatePassword)    

//CHAT RELATED ROUTES    
router.get('/chat/:roomId', passport.authenticate('jwt', { session: false }), getPrivateChat)

router.post('/chat/:roomId', passport.authenticate('jwt', { session: false }), postPrivateChat)
 
router.get('/chat/newerChats/:receiverName', passport.authenticate('jwt', { session: false }), differentChats)
    
router.get('/chat/previousChats/:senderName', passport.authenticate('jwt', { session: false }), previousChats)
    

//HELPER ROUTES
router.post('/getAllAlumnis', passport.authenticate('jwt', { session: false }), getAllAlumnis)

router.post('/getAlumniByRegName', passport.authenticate('jwt', { session: false }), getAlumniByRegName)

router.post('/getAlumniByName', passport.authenticate('jwt', { session: false }), getAlumniByName)

module.exports = router