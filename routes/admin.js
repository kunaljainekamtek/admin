

const router = require("express").Router();
const { register, login } = require("../controllers/auth");
const { registerUser, userLogin, fetchUsers, deleteUser, updateUser } = require('../controllers/user')

// just for checking 
router.get('/',
    async (req, res, next) => {
        try {
            res.status(200).send({
                status: 'you are ok.'
            })
        } catch (error) {
            next(error)
        }
    }
)


// admin register 
router.post(
    "/register",
    async (req, res, next) => {
        try {
            const admin = await register(req.body);
            res.status(201).json(admin);
        } catch (error) {
            res.status(400).json(error)
        }
    }
);

// admin login

router.get(
    "/login",
    async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const data = await login(email, password);
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json(error)
        }
    }
);


// existing admin hi create user

router.post(
    "/users/register",
    async (req, res, next) => {
        try {
            const { email, password, userName, userPassword, userEmail, userPhoneNumber } = req.body;
            const data = await login(email, password);

            const user = await registerUser(userName, userPassword, userEmail, userPhoneNumber);
            res.status(201).json(user);

        } catch (error) {
            res.status(400).json(error)
        }
    }
);


// login users created by the admin
router.get(
    "/users/login",
    async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const data = await userLogin(email, password);
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json(error)
        }
    }
);


// list of all users
router.get(
    "/users",
    async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const data = await login(email, password);
            const users = await fetchUsers()
            console.log(users);
            res.status(200).send(users)
        } catch (error) {
            res.status(400).json(error)
        }
    }
);

// delete seleted users

router.delete(
    "/users/delete",
    async (req, res, next) => {
        try {
            const { email, password, userId } = req.body;
            const data = await login(email, password);
            const deletedUser = await deleteUser(userId);
            res.status(200).json(deletedUser);

        } catch (error) {
            res.status(400).json(error)
        }
    }
);

// edit selected user
router.put(
    "/users/edit",
    async (req, res, next) => {
        try {
            const { email, password, userId, userName, userPassword, userEmail, userPhoneNumber } = req.body;
            const data = await login(email, password);
            const updatedUser = await updateUser(userId);
            res.status(200).json(updateUser);
            // res.status(200).json(data);
        } catch (error) {
            res.status(400).json(error)
        }
    }
);


module.exports = router;
