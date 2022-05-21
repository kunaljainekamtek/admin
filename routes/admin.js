

const router = require("express").Router();
const { register, login } = require("../controllers/auth");
const { registerUser,userlogin } = require('../controllers/user')

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
            if (data) {
                const admin = await registerUser(req.body);
                res.status(201).json(admin);
                await registerUser(userName, userPassword, userEmail, userPhoneNumber);
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }
);


router.get(
    "/users/login",
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

module.exports = router;
