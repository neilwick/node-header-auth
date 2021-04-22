const express = require('express');
const path = require('path');
const dbLayer = require('./config/db');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const app = express();
const port = 9000;

const auth = require('./middleware/auth');

const User = require('./model/User');
const { isRegExp } = require('util');

app.use('/', express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(express.json());

app.use(auth);

app.get('/login', async (req, res) => {
	res.json(req.auth);
});

app.all('/createuser', (req,res) => {
	if(req.auth.isAuth) {

		let newUser = req.body.newUser;
		let newPass = req.body.newPass;

		const hash = crypto.createHash("sha256").update(newPass).digest("hex");

		User.addUser(newUser, hash);

		res.json({
			status: "Success"
		});
	} else {
		res.json({
			status: "Failed"
		});
	}
});

app.listen(port, () => {
	dbLayer.init();
	console.log(`listening on port: ${port}`);
});
