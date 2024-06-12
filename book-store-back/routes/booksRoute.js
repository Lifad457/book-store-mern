import express from 'express';
import { Book } from '../models/bookModels.js';

const router = express.Router();

// Add a new route to create a book
router.post('/', async (req, res) => {
	try {
		if (!req.body.title || !req.body.author || !req.body.publishYear) {
			return res.status(400).send({ message: 'All fields are required' });
		}
		const newBook = {
			title: req.body.title,
			author: req.body.author,
			publishYear: req.body.publishYear,
		};

		const book = await Book.create(newBook);
		return res.status(201).send(book);
	} catch (error) {
		console.log(error.message);
		return res.status(500).send({ message: error.message });
	}
});

// Add a new route to get all books
router.get('/', async (req, res) => {
	try {
		const books = await Book.find();
		return res.status(200).json({
			count: books.length,
			books,
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).send({ message: error.message });
	}
});

// Add a new route to get a book by id
router.get('/:id', async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);
		if (!book) {
			return res.status(404).send({ message: 'Book not found' });
		}
		return res.status(200).send(book);
	} catch (error) {
		console.log(error.message);
		return res.status(500).send({ message: error.message });
	}
});

// Add a new route to update a book by id
router.put('/:id', async (req, res) => {
	try {
		if (!req.body.title || !req.body.author || !req.body.publishYear) {
			return res.status(400).send({ message: 'All fields are required' });
		}
		const book = await Book.findByIdAndUpdate(req.params.id, req.body);
		if (!book) {
			return res.status(404).json({ message: 'Book not found' });
		}
		return res.status(200).send({ message: 'Book updated successfully' });
	} catch (error) {
		console.log(error.message);
		return res.status(500).send({ message: error.message });
	}
});

// Add a new route to delete a book by id
router.delete('/:id', async (req, res) => {
	try {
		const book = await Book.findByIdAndDelete(req.params.id);
		if (!book) {
			return res.status(404).json({ message: 'Book not found' });
		}
		return res.status(200).send({ message: 'Book deleted successfully' });
	} catch (error) {
		console.log(error.message);
		return res.status(500).send({ message: error.message });
	}
});

export default router;