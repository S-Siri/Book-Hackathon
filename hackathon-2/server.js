const mongoose = require('mongoose');
const express = require('express');
const Book = require('./models/bookModel');
const cors=require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors("http://localhost:3000"))

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/addBook', async (req, res) => {
    try{
        const book =await Book.create(req.body)
        res.status(201).json(book)
    }catch(err){
        console.log(err);
        res.status(400).json({message:'Something went wrong'});
    }
    });

app.get('/getbooks', async (req, res) => {
    try {
        const books = await Book.find({}, { __v: 0 }); // Exclude __v field
        res.status(200).json(books);
    } catch(err) {
        console.log(err);
        res.status(400).json({ message: 'Something went wrong' });
    }
    });

app.delete('/deletebook/:id', async (req, res) => {
    try{
        const book = await Book.findByIdAndDelete(req.params.id);
        if(!book){
            res.status(404).json({message:'Book not found ${id}'});
        }
        res.status(200).json(book);
    }catch(err){
        console.log(err);
        res.status(400).json({message:'Something went wrong'});
    }
});

app.put('/updatebook/:id', async (req, res) => {
    try{
        const book = await Book.findByIdAndUpdate(req.params.id, req.body);
        if(!book){
            res.status(404).json({message:'Book not found ${id}'});
        } 
        const updatebook=await Book.findById(req.params.id);
        res.status(200).json(updatebook);
    }catch(err){
        console.log(err);
        res.status(400).json({message:'Something went wrong'});
    }
});

app.get('/getbook/title/:title', async (req, res) => {
    try {
        const book = await Book.findOne({ title: req.params.title });
        if (!book) {
            res.status(404).json({ message: `Book not found with title ${req.params.title}` });
        }
        res.status(200).json(book);
    } catch(err) {
        console.log(err);
        res.status(400).json({ message: 'Something went wrong' });
    }
});

// // Route to get a book by author
// app.get('/getbook/author/:author', async (req, res) => {
//     try {
//         const book = await Book.findOne({ author: req.params.author });
//         if (!book) {
//             res.status(404).json({ message: `Book not found with author ${req.params.author}` });
//         }
//         res.status(200).json(book);
//     } catch(err) {
//         console.log(err);
//         res.status(400).json({ message: 'Something went wrong' });
//     }
// });

// // Route to get a book by genre
// app.get('/getbook/genre/:genre', async (req, res) => {
//     try {
//         const book = await Book.findOne({ genre: req.params.genre });
//         if (!book) {
//             res.status(404).json({ message: `Book not found with genre ${req.params.genre}` });
//         }
//         res.status(200).json(book);
//     } catch(err) {
//         console.log(err);
//         res.status(400).json({ message: 'Something went wrong' });
//     }
// });

app.get('/getbooks/author/:author', async (req, res) => {
    try {
        const books = await Book.find({ author: req.params.author });
        if (books.length === 0) {
            res.status(404).json({ message: `No books found for author ${req.params.author}` });
        }
        res.status(200).json(books);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Something went wrong' });
    }
});

// Route to get books by genre
app.get('/getbooks/genre/:genre', async (req, res) => {
    try {
        const books = await Book.find({ genre: req.params.genre });
        if (books.length === 0) {
            res.status(404).json({ message: `No books found for genre ${req.params.genre}` });
        }
        res.status(200).json(books);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Something went wrong' });
    }
});
   

mongoose.set("strictQuery", false);

mongoose.connect('mongodb://localhost:27017/BookStore', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to local MongoDB');
    app.listen(3001, () => {
      console.log(`Node API app is running on port 3001`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to local MongoDB:', error);
  });