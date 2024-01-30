import { useQuery } from "@apollo/client";
import { getDetailBook } from "../../graphql-client/queries";

export default function BookDetail(props) {
  const { bookId } = props;
  const { loading, error, data } = useQuery(getDetailBook, {
    variables: { input: { id: bookId } },
    skip: !bookId,
  });
  if (loading) return <div className="col-span-4">  Loading</div>;
  if (error) return <div className="col-span-4">  Error</div>;
  if (!data) return <div className="col-span-4">  Nơi hiển thị thông tin sách</div>;
  console.log(data);
  return (
    <div className="col-span-4">
      <div className="book-item">
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{data.book.name}</div>
            <p>{data.book.gengre}</p>
            <p>{data.book.author.name}</p>

            <p>All books by this other</p>
            <ul>
              <li>{data.book.author.books.map(book => (book.name))}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
