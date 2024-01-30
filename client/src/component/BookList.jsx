import { getBooks } from "../graphql-client/queries";
import BookDetail from "./BookDetail";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { deleteBook } from "../graphql-client/mutation";
import UpdateBook from "./UpdateBook";

export default function BookList() {
  const { loading, error, data } = useQuery(getBooks);
  const [destroyBook, dataMutation] = useMutation(deleteBook);
  const [bookId, setBookId] = useState();
  const [updateBook, setUpdateBook] = useState(false);
  if (loading) return " loading Book";
  if (error) return " error Book";
  function handleInfoBook(id) {
    setBookId(id);
  }

  const handleRemoveBook = async (id) => {
    console.log("Deleting book with ID:", id);
    try {
      destroyBook({
        variables: { deleteBookId: id },
        refetchQueries: [{ query: getBooks }],
      });
    } catch (error) {
      console.error("Error deleting book:", id + "-" + error.message);
    }
  };
  const handleUpdateShow = () => {
    setUpdateBook(!updateBook);
  };
  // console.log(dataMutation);
  return (
    <div className="grid grid-cols-12 gap-2 ">
      <div className="grid grid-cols-4 gap-4 col-span-8">
        {data.books.map((book) => (
          <div key={book.id} className="flex">
            <div
              onClick={() => handleInfoBook(book.id)}
              key={book.id}
              className="book-item"
            >
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4 flex justify-between">
                  <div className="font-bold text-xl mb-2"> {book.name}</div>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleUpdateShow()}
              className="bg-cyan-200 px-4 ml-2"
            >
              Sửa
            </button>
            <button
              onClick={() => handleRemoveBook(book.id)}
              className="bg-red-600 px-4 ml-2"
            >
              X
            </button>
            <div>{updateBook && <UpdateBook bookId={book.id} />}</div>
          </div>
        ))}
      </div>
      <BookDetail bookId={bookId} />
    </div>
  );
}
