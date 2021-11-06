import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
// import { createBrowserHistory } from "history";
import HomeScreen from "./screens/HomeScreen";
import ClassScreen from "./screens/ClassScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import "./App.css";
import Header from "./components/Header";
import Management from "./screens/Management";
import PrivateRoute from './components/PrivateRouter';
import PublicRoute from './components/PublicRouter';
import { useSelector } from "react-redux";
// const history = createBrowserHistory();

function App() {

  const { isLoggedIn } = useSelector(state => state.auth);



  const publicRoutes = [
    {
      path: '/auth/login',
      component: () => <LoginScreen />,
    },
    {
      path: '/auth/register',
      component: () => <RegisterScreen />,
    },
    {
      path: '/',
      component: () => <HomeScreen />,
    },
  ];

  const privateRoutes = [
    {
      path: '/classes',
      component: () => <ClassScreen />,
    },
    {
      path: '/management',
      component: () => <Management />,
    },
  ]

  return (
    <>
      <Router>
        <Header />
        <Switch>
          {publicRoutes.map((item) => (
            <PublicRoute
              exact
              key={item.path}
              path={item.path}
              component={item.component} />
          ))}
          {privateRoutes.map((item) => (
            <PrivateRoute
              isAuthenticated={isLoggedIn}
              exact
              key={item.path}
              path={item.path}
              component={item.component} />
          ))}
        </Switch>
      </Router>
    </>
  );
}

export default App;
