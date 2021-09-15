
import * as React from 'react';
import { hot } from "react-hot-loader/root";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Link
} from "react-router-dom";
const routingConfiguration = require("pegasus-loader!./exp/9374");

interface Props {
}

const App = (props: Props) => {
  return (
    <>
      <Router>
        {/* <Link to="/about">About</Link>
        <Link to="/contact/yeet">yeet</Link>
        <Link to="/contact">contact</Link>
        <Link to="/">Home</Link>
        <Switch>
          <Route path="/about">
            <h1>About</h1>
          </Route>

          <Route path="/contact/:id" children={ <Child /> } />
          <Route path="/contact">
            <h1>test</h1>
          </Route>

          <Route path="/">
            <h1>Home</h1>
          </Route>
        </Switch> */}
        {routingConfiguration}
      </Router>
    </>
  );
}

type ChildParams = {
  id: string;
};

const Child = () => {
  const { id } = useParams<ChildParams>();

  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
}

export default hot(App);
