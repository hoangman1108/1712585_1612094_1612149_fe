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
import DiscussClass from "./screens/DiscussClass";
import GradeStructureClass from "./screens/GradeStructureClass";
import GradeBoardClass from "./screens/GradeBoardClass";
import { getListClass } from "./redux/actions/class.action";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import VerifyAccountScreen from "./screens/VerifyAccountScreen";

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
      path: '/auth/forgot-password',
      component: () => <ForgotPasswordScreen />
    },
    {
      path: '/auth/verify/reset-password/:id',
      component: () => <ResetPasswordScreen />
    },
    {
      path: '/auth/verify/account/:id',
      component: () => <VerifyAccountScreen />
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
      path: '/classes/:id/discuss',
      component: () => <DiscussClass />,
    },
    {
      path: '/classes/:id/grade',
      component: () => <GradeStructureClass />,
    },
    {
      path: '/classes/:id/grade-board',
      component: () => <GradeBoardClass />,
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
