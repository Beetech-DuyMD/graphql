import { useQuery } from "@apollo/client";
import { getDetailBook } from "../graphql-client/queries";

export default function BookDetail(props) {
  const { bookId } = props;
  const { loading, error, data } = useQuery(getDetailBook, {
    variables: { input: { id: bookId } },
    skip: !bookId,
  });
  console.log(error);
        if (loading) return " loading Book";
        if (error) return " error Book";
        if (!data) return "Nơi hiển thị thông tin sách";
        return (
  <div className="col-span-4">
      <div className="book-item">
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{data.book.name}</div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
            <p>90</p>
            <p>All books by this other</p>
            <ul>
              <li>12321</li>
              <li>12321</li>
              <li>12321</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
