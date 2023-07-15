import { useState } from "react";
import BookEdit from "./BookEdit";

function BookShow({ book, deleteBook, editBook }) {
    const [showEdit, setShowEdit] = useState(false);    

    const handleDelete = () => {
        deleteBook(book.id);
    }

    const handleEdit = (id, newTitle) => {
        setShowEdit(false);
        editBook(id, newTitle);
    }

    const handleEditClick = () => {
        setShowEdit(!showEdit);
    }

    let content = <h3>{book.title}</h3>;
    if (showEdit) {
        content = <BookEdit book={book} onSubmit={handleEdit}/>;
    }

    return (
        <div className="book-show">
            <div>{content}</div>
            <div className="actions">
                <button className="edit" onClick={handleEditClick}>
                    Edit
                </button>
                <button className="delete" onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default BookShow;