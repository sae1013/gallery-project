import React, { useEffect,Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//page

import LoadingPage from "../../pages/LoadingPage";
//UI-Component
import Header from "../../UI/Header"
import FloatButton from "../../elements/FloatButton";
import Permit from "../../shared/Permit";
import MainContainer from "../../UI/MainContainer";

//else
import { apiKey } from "../../shared/firebase";
import { loginCheckFB } from "../../shared/api/Auth";
import classes from "./App.module.scss";
import Spinner from "../../elements/Spinner";

function App(props) {
  const dispatch = useDispatch();
  const sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isSessionValue = sessionStorage.getItem(sessionKey) ? true : false;
  const isLogin = useSelector((state) => state.user.isLogin);

  const PostList = React.lazy(()=> import('../../pages/PostList'))
  const Login = React.lazy(()=>import("../../pages/Login"));
  const Signup = React.lazy(()=>import("../../pages/Signup"))
  const PostDetail = React.lazy(()=>import("../../pages/PostDetail"))
  const PostWrite  = React.lazy(()=> import("../../pages/PostWrite"))
  const NotificationList = React.lazy(()=> import("../../pages/NotificationList"))
  const Page404 = React.lazy(()=> import("../../pages/Page404"))
  const Profile = React.lazy(()=> import('../../pages/Profile'));

  useEffect(() => {
    if (isSessionValue) {
      dispatch(loginCheckFB());
    }
  }, []);

  return (
    <div>
      
      <Header></Header>
      <MainContainer>
        <Suspense fallback={<LoadingPage/>}>
          <Switch>
            <Route path="/" exact component={PostList}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/signup" exact component={Signup}></Route>
            <Route path="/post/:id" exact component={PostDetail}></Route>
            <Route path="/write" exact component={PostWrite}></Route>
            <Route path="/write/:id" exact component={PostWrite}></Route>
            <Route path="/notify" exact component={NotificationList}></Route>
            <Route path='/profile' exact component={Profile}></Route>
            <Route path='/*' component={Page404}></Route>
            
          </Switch>
        </Suspense>
        <Permit>
          <FloatButton />
        </Permit>
      </MainContainer>
    </div>
  );
}

export default App;
