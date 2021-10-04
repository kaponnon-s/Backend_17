const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy; 
const ExtractJwt = require("passport-jwt").ExtractJwt;

const db = require("./database");

passport.serializeUser((user, done) => {
	done(null, user);
});
passport.deserializeUser((user, done) => {
	done(null, user);
});

passport.use(
	new LocalStrategy((username, password, done) => {
        db.query(
            "SELECT * FROM ?? WHERE email=? AND password=?;",
			[["users"], username,password],
			(err, data, fields) => {
                console.log(data);
                if (err) done(err);
                if (data) done(null, {...data})
                done(null, false)
			},
		);
	}),
);

passport.use(
	new JWTstrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: "test_user",
		},
		(payload, done) => {
			done(null, payload);
		},
	),
);

module.exports = passport;
