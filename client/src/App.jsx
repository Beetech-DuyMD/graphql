import BookList from "./component/BookList";
import Form from "./component/Form";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="bg-slate-100">
        <div className="containter bg-cyan-50">
          <h1 className="text-4xl font-bold text-center">My book</h1>
        </div>
        <BookList />
        <hr />
        <Form />
      </div>
    </ApolloProvider>
  );
}

export default App;
