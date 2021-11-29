import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import JoinClass from "./screens/JoinClass";
import { useDispatch, useSelector } from "react-redux";
import { me } from "./redux/actions/auth.action";
import AssignmentClass from "./screens/AssignmentClass";
import GradeStructureClass from "./screens/GradeStructureClass";
import { getListClass } from "./redux/actions/class.action";

function App() {

  const { isLoggedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(me());
    dispatch(getListClass());
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      path: '/classes/invite/:id',
      component: () => <JoinClass />,
    },
    {
      path: '/classes/:id/detail',
      component: () => <DetailClass />,
    },
    {
      path: '/classes/:id/assignment',
      component: () => <AssignmentClass />,
    },
    {
      path: '/classes/:id/grade',
      component: () => <GradeStructureClass />,
    },
    {
      path: '/classes',
      component: () => <ClassScreen />,
    },
    {
      path: '/profile',
      component: () => <Management />,
    }
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
