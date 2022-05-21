
const User = require('../models/usersSchema');

const registerUser = async ({ userName, userPassword, userEmail, userPhoneNumber }) => {
    if (await User.findOne({ email })) {
        throw createError(409, "User already exists");
    }

    await new User({
        name: userName,
        password: userPassword,
        email: userEmail,
        phoneNumber: userPhoneNumber
    }).save();

    return login(email, password);
};


const userlogin = async (email, password) => {
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


module.exports = { registerUser,userlogin };