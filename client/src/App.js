import React from "react";
import Books from "./pages/Books";
import NoMatch from "./pages/NoMatch";
import Detail from "./pages/Detail";
import Nav from "./components/Nav";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div>
      <Nav />
      <BrowserRouter>
        <Switch>
            <Route exact path="/">
              <Books />
            </Route>
            <Route path="/books/:id">
              <Detail />
            </Route>
            <Route path="/books">
              <Books />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
        </Switch>
      </BrowserRouter>
    </div>
   
  );
}

export default App;
