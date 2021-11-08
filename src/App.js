import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import DetailClass from "./screens/DetailClass";
import NotFoundScreen from "./screens/NotFoundScreen";
import { useDispatch, useSelector } from "react-redux";
import { me } from "./redux/actions/auth.action";
import AssignmentClass from "./screens/AssignmentClass";
// const history = createBrowserHistory();

function App() {

  const { isLoggedIn, user } = useSelector(state => state.auth);
  // const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();
  // console.log(message, '------message------');
  useEffect(() => {
    dispatch(me());
  }, [])

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
    }
  ];

  const privateRoutes = [
    {
      path: '/classes/:id/detail',
      component: () => <DetailClass />,
    },
    {
      path: '/classes/:id/assignment',
      component: () => <AssignmentClass />,
    },
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
          <Route path="*" component={NotFoundScreen}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
