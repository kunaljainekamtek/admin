
const router = require("express").Router();
const authRouter = require('./admin');

router.use("/admin", authRouter);

module.exports = router;
