
const User = require('../models/usersSchema');
const { JWT } = require("../utils");
const createError = require("http-errors");

const registerUser = async (userName, userPassword, userEmail, userPhoneNumber) => {
    if (await User.findOne({ userEmail })) {
        throw createError(409, "User already exists");
    }

    await new User({
        userName,
        userEmail,
        userPassword,
        userPhoneNumber
    }, { _id: true }).save();

    return userLogin(email, password);

};

const userLogin = async (email, password) => {
    const user = await User.findOne({
        email,
        password,
    });

    if (!user) {
        throw createError(400, "Invalid credentials");
    }

    const { _id, role } = user;
    const token = JWT.issueToken({ _id, email, role });

    return { token, user };
};

const fetchUsers = async () => {
    const users = await User.find();
    // console.log(users);
    return users;
}


const deleteUser = async (userId) => {
    const deleteUser = await User.findByIdAndDelete(userId);
    return ({
        'status': 'success',
    })
}


// {
//     "userName": "george",
//     "userEmail": "george@gmail.com",
//     "userPassword": "14569",
//     "userPhoneNumber": "1478523699",
//     "timeStamp": "2022-05-21T09:16:35.748Z",
//     "__v": 0
// }

const updateUser = async (userId, userName, userPassword, userEmail, userPhoneNumber) => {
    const user = {
        userName,
        userPassword,
        userEmail,
        userPhoneNumber
    }
    const updatedUser = await User.findByIdAndUpdate(userId, {userName,userPassword,userEmail,userPhoneNumber});
    return ({
        status: 'success',
    })
}

module.exports = { registerUser, userLogin, fetchUsers, deleteUser, updateUser };