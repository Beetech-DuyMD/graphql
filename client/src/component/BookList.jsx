import { getBooks } from "../graphql-client/queries";
import { useMutation, useQuery } from "@apollo/client";
import BookDetail from "./BookDetail";
import { useState } from "react";
export default function BookList() {
  const { loading, error, data } = useQuery(getBooks);
  const [bookId, setBookId] = useState();
  if (loading) return " loading Book";
  if (error) return " error Book";
  function handleInfoBook(id) {
    setBookId(id);
  }
 
  return (
    <div className="grid grid-cols-12 gap-2 ">
      <div className="grid grid-cols-4 gap-4 col-span-8">
        {data.books.map((book) => (
          <div
            onClick={() => handleInfoBook(book.id)}
            key={book.id}
            className="book-item"
          >
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2"> {book.name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <BookDetail bookId={bookId} />
    </div>
  );
}
