import express from 'express'
import {signUp,signIn,getUser,deletePost,getComments,commentDetails,getEachData,newPost,logOut,updateDetails,logCheck,getData} from '../controllers/userController.js'

const router = express.Router()

router.route('/signin').post(signIn)
router.route('/signup').post(signUp)
router.route('/logout').get(logOut)
router.route("/logcheck").get(logCheck)
router.route("/newpost").post(newPost)
router.route("/getuser").get(getUser)
router.route("/getdata").get(getData)
router.route("/geteach/:id").get(getEachData)
router.route("/updatepost").put(updateDetails)
router.route('/comments/:id').post(commentDetails)
router.route('/getcomments/:id').get(getComments)
router.route('/deletepost/:id').delete(deletePost)

export default router
