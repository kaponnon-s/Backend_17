const router = require("express").Router()
const passport = require("passport")

const controllers = require("../controllers")

router.post("/register",  controllers.register)
router.post("/login", passport.authenticate("local"), controllers.login)
router.get("/home", passport.authenticate("jwt"), controllers.home )

module.exports = router