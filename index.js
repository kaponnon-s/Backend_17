const express = require("express")
const passport = require("passport")
const session = require("express-session")

require("./config/database")
require("./config/passport")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({secret: "test", resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

const routes = require("./routes")
app.use(routes)

app.listen(9000)