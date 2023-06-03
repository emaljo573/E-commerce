import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js';
//@desc Auth user
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(401);
        throw new Error(`Invalid email or password`)
    }
})

//@desc Register user
//@route POST /api/users/
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { name, email, password } = req.body
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('User already exists')
    }

    //if user does not exis create new user
    const user = await User.create(
        { name, email, password }
    )
    //if user created succesfully
    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//@desc Logout user-clear cookie
//@route POST /api/users/logout
//@access Public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({ message: 'Logged out succesfully' })
})

//@desc Get user profile
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

//@desc Update user profile
//@route PUT /api/users/profile
//@access Public
const updateUserProfile = asyncHandler(async (req, res) => {
    console.log(req.body)
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name,
            user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }
        const updateUser = await user.save();
        res.status(200).json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

//@desc Get all users
//@route GET /api/users/
//@access Private/admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users)
})

//@desc Get user by id
//@route GET /api/users/:id
//@access Private/admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404)
        throw new Error('No user found')
    }
})

//@desc Delete user
//@route DeLETE /api/users/:id
//@access Private/admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        if (user.isAdmin) {
            res.status(400)
            throw new Error('Cannot delete admin user')
        } else {
            await User.deleteOne({ _id: user._id })
            res.status(200).json({ message: 'User deleted sccessfully' })
        }
    } else {
        res.status(404)
        throw new Error('No user found')
    }
})

//@desc Update user
//@route PUT/api/users/:id
//@access Private/admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = Boolean(req.body.isAdmin)

        const updatedUser=await user.save(user);
        res.status(200).json(updatedUser)

    } else {
        res.status(404)
        throw new Error('No user found')
    }
})

export {
    authUser, registerUser, logoutUser, getUserProfile, getUsers, getUserById,
    updateUserProfile, deleteUser, updateUser
}





