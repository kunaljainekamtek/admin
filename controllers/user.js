
const User = require('../models/usersSchema');
const { JWT } = require("../utils");
const createError = require("http-errors");

const registerUser = async ({ userName, userPassword, userEmail, userPhoneNumber }) => {
    if (await User.findOne({ email })) {
        throw createError(409, "User already exists");
    }

    await new User({
        name:userName,
        email:userEmail,
        password:userPassword,
    }).save();

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


module.exports = { registerUser,userLogin };