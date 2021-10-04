const db = require("../config/database");
const jwt = require("jsonwebtoken");

module.exports = {
	login: (req, res, next) => {
		const token = jwt.sign(req.user, "test_user");
		res.status(200).json({status: "success", token});
	},
	register: (req, res, next) => {
		const {name, password, email} = req.body;

		// db.query("DELETE FROM users")

		const id = db.query(
			"INSERT INTO ?? (name, password, email, created_time) VALUES (?);",
			[["users"], [name, password, email, new Date().toISOString().slice(0, 19).replace("T", " ")]],
			(err, results, fields) => {
				if (err) throw err;
				return results.insertId;
			},
		);

		db.query("SELECT * FROM ?? WHERE id = ?;", [["users"], id], (err, data, fields) => {
			if (err) throw err;
			console.log(data);
			res.status(200).json(data);
		});
	},
	home: (req, res, next) => {
		res.status(200).json(req.user);
	},
};
