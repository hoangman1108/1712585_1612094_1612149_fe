import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import HomeScreen from "./screens/HomeScreen";
import ClassScreen from "./screens/ClassScreen";
import "./App.css";

const history = createBrowserHistory();

function App() {
  const routes = [
    {
      path: `/classes`,
      component: () => <ClassScreen />,
    },
    {
      path: `/`,
      component: () => <HomeScreen />,
    },
  ];

  return (
    <Router basename={process.env.REACT_APP_PUBLIC_URL} history={history}>
      <Switch>
        {/* <Route exact path={"/"}>
          <Redirect to={`/`} />
        </Route> */}
        {routes.map((item) => (
          <Route key={item.path} path={item.path} children={item.component} />
        ))}
      </Switch>
    </Router>
  );
}

export default App;
