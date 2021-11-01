import React from "react";
import HomeScreen from "./HomeScreen";
import { Switch, Route, Redirect } from "react-router-dom";
import { PATH } from "../utils/const";
import { SafeAreaView } from "../components/SafeAreaView";

const MainScreen = () => {
  return (
    <SafeAreaView className="bg">
      <Switch>
        <Route exact path={`/`}>
          <Redirect to={`$/home`} />
        </Route>
        <Route path={`/home`} children={<HomeScreen />} />
      </Switch>
    </SafeAreaView>
  );
};

export default MainScreen;
