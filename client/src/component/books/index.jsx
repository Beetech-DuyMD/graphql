import BookList from "./BookList";
import Form from "./Form";
export default function Books() {
  return (
    <div className="bg-slate-100">
      <div className="containter bg-cyan-50">
        <h1 className="text-4xl font-bold text-center">My book</h1>
      </div>
      <BookList />
      <hr />
      <Form />
    </div>
  );
}
