import express from "express";

const app = express();

app.use(express.json());
let books = [
    { id: 1, title: "Atomic Habits", author: "James Clear", year: 2018 },
    { id: 2, title: "The Pragmatic Programmer", author: "Andrew Hunt", year: 1999 },
    { id: 3, title: "Clean Code", author: "Robert C. Martin", year: 2008 },
  ];

  const nextId=4; // Next ID to assign to a new book
app.get("/",(req,res)=>{
    res.send("Hello World");
})

// Get all books (with optional ?author= filter)
app.get("/books", (req, res) => {
    const { author } = req.query;
    if (author) {
      return res.json(books.filter(b => b.author.toLowerCase().includes(author.toLowerCase())));
    }
    res.json(books);
  });
  
  // Get one book by id
  app.get("/books/:id", (req, res) => {
    const id = Number(req.params.id); // params are always strings
    const book = books.find(b => b.id === id);
  
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  });

  app.post("/books", (req, res) => {
    const { title, author, year } = req.body;
  
    if (!title || !author) {
      return res.status(400).json({ message: "title and author are required" });
    }
  
    const newBook = { id: nextId++, title, author, year };
    books.push(newBook);
  
    res.status(201).json(newBook); // 201 = Created
  });

  app.put("/books/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = books.findIndex(b => b.id === id);
  
    if (index === -1) return res.status(404).json({ message: "Book not found" });
  
    const { title, author, year } = req.body;
    if (!title || !author) {
      return res.status(400).json({ message: "title and author are required" });
    }
  
    // PUT replaces the whole resource (keep the same id)
    books[index] = { id, title, author, year };
    res.json(books[index]);
  });

  app.delete("/books/:id", (req, res) => {
    const id = Number(req.params.id);
    const exists = books.some(b => b.id === id);
  
    if (!exists) return res.status(404).json({ message: "Book not found" });
  
    books = books.filter(b => b.id !== id);
    res.status(204).send(); // 204 = success, no content
  });
  
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})