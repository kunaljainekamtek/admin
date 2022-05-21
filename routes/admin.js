

const router = require("express").Router();
const { register, login } = require("../controllers/auth");
const { registerUser, userLogin } = require('../controllers/user')

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
            console.log(userName, userPassword, userEmail, userPhoneNumber);

            const user = await registerUser(userName, userPassword, userEmail, userPhoneNumber);
            res.status(201).json(user);

        } catch (error) {
            res.status(400).json(error)
        }
    }
);


// "email": "anything@gmail.com",
// "password": "1356",
// "userName": "george",
// "userPassword": "14569",
// "userEmail": "george@gmail.com",
// "userPhoneNumber": "1478523699"

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

module.exports = router;
