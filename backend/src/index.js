import 'dotenv/config';
import express from 'express';
import * as admin from 'firebase-admin';
import bodyParser from 'body-parser';
import cors from 'cors';

admin.initializeApp({
	projectId: 'labez-f769c',
	credential: admin.credential.applicationDefault() ,
	databaseURL: 'https://labez-f769c-default-rtdb.asia-southeast1.firebasedatabase.app'
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
	res.send('hii')
});

app.post('/v1/signup', async (req, res) => {
	try {
		const { name, email, role, password } = req.body;
		const user = await admin.auth().createUser({
			password,
			displayName: name,
			emailVerified: true,
			email
		});
		await admin.auth().setCustomUserClaims(user.uid, {
			teacher: role === 'teacher'
		});
		const token = await admin.auth().createCustomToken(user.uid)

		return res.json({
			token,
		})
	} catch (e) {
	    res.status(500).send(e.message)
	}

});

app.listen(8008, () => {
	console.log('listenting?');
})
