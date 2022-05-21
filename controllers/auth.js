
const axios = require('axios');
const Admin = require("../models/adminSchema");
const { JWT } = require("../utils");
const createError = require("http-errors");

const register = async ({ name, email, password }) => {
    if (await Admin.findOne({ email })) {
        throw createError(409, "User already exists");
    }

    await new Admin({
        name,
        email,
        password,
    }).save();

    return login(email, password);
};

const login = async (email, password) => {
    const user = await Admin.findOne({
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