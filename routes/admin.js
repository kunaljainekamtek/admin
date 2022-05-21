

const router = require("express").Router();
const { register, login } = require("../controllers/auth");


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

router.post(
    "/register",
    async (req, res, next) => {
        try {
            const admin = await register(req.body);
            res.status(201).json(admin);
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    "/login",
    async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const data = await login(email, password);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
);



module.exports = router;
