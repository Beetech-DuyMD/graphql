
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
}); 

function App() {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={routes} />
    </ApolloProvider>
  );
}

export default App;
