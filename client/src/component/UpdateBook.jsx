import { useMutation, useQuery } from "@apollo/client";
import { getDetailBook, getAuthors, getBooks } from "../graphql-client/queries";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { updateBook } from "../graphql-client/mutation";
import BookList from "./BookList";

export default function UpdateBook(props) {
  const { bookId } = props;
  const form = useForm();
  const { register, control, handleSubmit, setValue, formState } = form;
  const { errors } = formState;

  const [updateSingleBook, dataMutation] = useMutation(updateBook);

  const handleFormSubmit = (data) => {
    updateSingleBook({
      variables: {
        updateBookId: bookId,
        input: {
          name: data.name,
          gengre: data.gengre,
          authorId: data.authorId,
        },
      },
      refetchQueries: [{ query: getBooks, getDetailBook }],
    });
  };
  const {
    loading,
    error,
    data: dataBook,
  } = useQuery(getDetailBook, {
    variables: { input: { id: bookId } },
    skip: !bookId,
  });
  const {
    loading: loadingAuthors,
    error: errorAuthor,
    data: dataAuthors,
  } = useQuery(getAuthors);

  useEffect(() => {
    if (dataBook) {
      setValue("name", dataBook.book.name);
      setValue("gengre", dataBook.book.gengre);
    }
  }, [dataBook, setValue]);

  if (loading) return <div className="col-span-4"> Loading</div>;
  if (error) return <div className="col-span-4"> Error</div>;
  if (!dataBook) return <div className="col-span-4"> Form update book</div>;
  const { book } = dataBook;
  const { authors } = dataAuthors;

  const handleChange = () => {};
  return (
    <div className="fixed z-1000 top-0 bg-slate-50 ">
      <form action="" onSubmit={handleSubmit(handleFormSubmit)}>
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
                {...register("name")}
                type="text"
                id="name-book"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập tên sách"
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
                {...register("gengre")}
                // value={setValue("gengre", book.gengre)}
                type="text"
                // value={book.gengre}
                id="genre"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập số trang"
                required
              ></input>
            </div>

            <select
              onChange={(e) => handleChange(e)}
              {...register("authorId")}
              id="author"
              value={book.authorId}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {authors.map((author) => (
                <option
                  selected={book.author.id === author.id}
                  key={author.id}
                  value={author.id}
                >
                  {author.name}
                </option>
              ))}
            </select>
            {/* <select
              onChange={(e) => handleChange(e)}
              name="authorId"
              id="author"
              value={book.authorId}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" selected disabled>
                Choose a Author
              </option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select> */}
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
          <DevTool control={control} />
        </div>
      </form>
    </div>
  );
}
