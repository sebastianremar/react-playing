import { useEffect, useState } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import axios from 'axios';


function App() {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        const address = "http://localhost:3001/books";
        const response = await axios.get(address);
        setBooks(response.data);
    }

    useEffect(() => {
        fetchBooks();
    }, []);

    const createBook = async (title) => {
        const address = "http://localhost:3001/books";
        const response = await axios.post(address, {title});

        const updatedBooks = [
            ...books,
            response.data
        ];
        setBooks(updatedBooks);
    }

    const editBookById = async (id, newTitle) => {
        const response = await axios.put(`http://localhost:3001/books/${id}`, {
            title: newTitle,
        });

        console.log(response);


        const updatedBooks = books.map((book) => {
            if (book.id === id) {
                return { ...book, ...response.data };
            }
            return book;
        })
        setBooks(updatedBooks);
    }

    const deleteBookById = async (id) => {
        const response = await axios.delete(`http://localhost:3001/books/${id}`);
        const updatedBooks = books.filter((book) => {
            return book.id !== id;
        })
        setBooks(updatedBooks);
    }

    return (
        <div className="app">
            <BookCreate onSubmit={createBook} />
            <BookList books={books} deleteBook={deleteBookById} editBook={editBookById} />
        </div>
    );
}

export default App;