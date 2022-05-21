
const axios = require('axios');
const User = require("../models/adminSchema");
const { JWT } = require("../utils");

const register = async ({ name, email, password }) => {
    if (await User.findOne({ email })) {
        throw createError(409, "User already exists");
    }

    await new User({
        name,
        email,
        password,
    }).save();

    return login(email, password);
};

const login = async (email, password) => {
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


module.exports = { register, login };