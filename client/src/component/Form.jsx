import { useState } from "react";
import { getAuthors, getBooks } from "../graphql-client/queries";
import { useMutation, useQuery } from "@apollo/client";
import { createAuthor, createBook } from "../graphql-client/mutation"

export default function Form() {
  const [addBook, dataMutation] = useMutation(createBook)
  const [addAuthor, dataMutationAutor] = useMutation(createAuthor)
  const { loading, error, data } = useQuery(getAuthors)
  
  const [newBook, setNewBook] = useState(
    {
      name: '',
      gengre: '',
      authorId: ''
    }
  )
  const [newAuthor, setNewAuthor] = useState(
    {
      name: '',
      age: ''
    }
  )

  const handleChangeAuthor = (e) => {
    setNewAuthor({
      ...newAuthor,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmitAuthor = (e) => {
    e.preventDefault()
    addAuthor({
      variables: { input: { name: newAuthor.name, age: parseInt(newAuthor.age) } },
      refetchQueries: [{ query: getAuthors }]
    })
    setNewAuthor({
      name: '',
      age: ''
    })
  }

  const handleChange = (e) => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addBook({
      variables: { input: { name: newBook.name, gengre: newBook.gengre, authorId: newBook.authorId } },
      refetchQueries: [{ query: getBooks }]
    })
    setNewBook({
      name: '',
      gengre: '',
      authorId: ''
    })
  }
  
  if (loading) return " loading Book";
  if (error) return " error Book";
  const { authors } = data

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>

        <form action="" onSubmit={e => handleSubmit(e)}>
          <div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name-book"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name BOOK
                </label>
                <input
                  name="name"
                  value={newBook.name}
                  type="text"
                  id="name-book"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập tên sách"
                  onChange={e => handleChange(e)}
                  required
                ></input>
              </div>

              <div>
                <label
                  htmlFor="genre"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Genre
                </label>
                <input
                  name="gengre"
                  type="text"
                  value={newBook.gengre}
                  id="genre"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập số trang"
                  required
                  onChange={e => handleChange(e)}
                ></input>
              </div>

              <select
                onChange={e => handleChange(e)}
                name="authorId"
                id="author"
                value={newBook.authorId}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value='' selected disabled>
                  Choose a Author
                </option>
                {authors.map(author => (
                  <option key={author.id} value={author.id}>{author.name}</option>
                ))}

              </select>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <div>
        <form action="" onSubmit={e => handleSubmitAuthor(e)}>
          <div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name-author"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tên tác giả
                </label>
                <input
                  name="name"
                  value={newAuthor.name}
                  type="text"
                  id="name-author"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập tên sách"
                  required
                  onChange={e => handleChangeAuthor(e)}
                ></input>
              </div>

              <div>
                <label
                  htmlFor="genre"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tuổi
                </label>
                <input
                  name="age"
                  type="number"
                  value={newAuthor.age}
                  id="genre"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập số tuổi"
                  required
                  onChange={e => handleChangeAuthor(e)}
                ></input>
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
