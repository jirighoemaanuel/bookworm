import express from 'express';
import pg from 'pg';

const app = express();
const port = 3000;

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'bookworm', //Make sure you have a database with bookworm as name
  password: '', //Add Your password
  port: 5432,
});

db.connect();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/books', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM book');
    const books = result.rows;
    // res.json(books);
    res.render('index.ejs', { books: books });
  } catch (error) {
    console.error(error.stack);
  }
});

app.get('/books/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/books/new', (req, res) => {
  const newBook = req.body;
  const data = [
    newBook.author,
    newBook.title,
    newBook.description,
    newBook.note,
    newBook.isbn,
    newBook.rating,
    newBook.date_read,
    newBook.amazon_link,
  ];
  try {
    db.query(
      'INSERT INTO book (author, title, description, note, isbn, rating, date_read, amazon_link) \
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      data
    );
    res.redirect('/books');
  } catch (error) {
    console.error(error.stack);
  }
});

app.get('/books/edit/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query('SELECT * FROM book WHERE id = $1', [id]);
    const book = result.rows[0];
    res.render('edit.ejs', { book: book });
  } catch (error) {
    console.error(error.stack);
  }
});

app.post('/books/edit/:id', async (req, res) => {
  const id = req.params.id;
  let bookEdit = req.body;
  bookEdit['id'] = id;
  try {
    try {
      await db.query(
        'UPDATE book SET author = $2, title = $3, description = $4, note = $5, isbn = $6, rating = $7, date_read = $8, amazon_link = $9 WHERE id = $1',
        [
          bookEdit.id,
          bookEdit.author,
          bookEdit.title,
          bookEdit.description,
          bookEdit.note,
          bookEdit.isbn,
          bookEdit.rating,
          bookEdit.date_read,
          bookEdit.amazon_link,
        ]
      );
    } catch (error) {
      console.error(error.stack);
    }

    res.redirect('/books');
  } catch (error) {
    console.error(error.stack);
  }
});

app.get('/', async (req, res) => {
  let query = 'SELECT * FROM book';
  const sort = req.query.sort;

  if (sort === 'title') {
    query += ' ORDER BY title';
  } else if (sort === 'newest') {
    query += ' ORDER BY date_read DESC';
  } else if (sort === 'best') {
    query += ' ORDER BY rating DESC';
  }

  try {
    const result = await db.query(query);
    const books = result.rows;
    res.render('index.ejs', { books: books });
  } catch (error) {
    console.error(error.stack);
  }
});

app.get('/books/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query('SELECT * FROM book WHERE id = $1', [id]);
    const book = result.rows[0];
    // res.json(book)
    res.render('note.ejs', { book: book });
  } catch (error) {
    console.error(error.stack);
  }
});

app.listen(port, () => {
  console.log(`Server running at localhost:${port}`);
});
