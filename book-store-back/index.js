import express, { response } from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

//Middleware to parse request body
app.use(express.json());

//Middleware to enable CORS
app.use(
	cors({
		origin: 'http://localhost:5173',
		methods: 'GET,POST,PUT,DELETE',
		allowedHeaders: 'Content-Type',
	})
);

app.get('/', (req, res) => {
	console.log(req);
	return res.status(200).send('Hello World!');
});

app.use('/books', booksRoute);

mongoose
	.connect(mongoDBURL)
	.then(() => {
		console.log('Connected to MongoDB');
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.log('Error connecting to MongoDB', error);
	});
