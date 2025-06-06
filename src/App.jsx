import './App.css'

import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";

import LPtoC from './toC/LP';
import LPtoB from './toB/LP';
import ClientHomeView from './toB/ClientHomeView';
import NewChat from './NewChat';
import EditChat from './EditChat';
import ClientAnalyzeView from './toB/ClientAnalyzeView';
import ClientAnalyzeQuestion from './toB/ClientAnalyzeQuestion';
import ErrorPage from './errorPage';
import './index.css';
import UserHomeView from './toC/UserHomeView';
import Login from './Login';
import Chat from './Chat';
import { useAuthContext } from './contexts/AuthContext';
import SignUp from './Signup';
import LogIn from './Login';
import ClientShareChat from './toB/ClientShareChat';
import NavOuter from './outers/NavOuter';
import EmptySidebarOuter from './outers/EmptySidebarOuter';
import ChatInfoSidebarOuter from './outers/ChatInfoSidebarOuter';
import MyAccountSidebarOuter from './outers/MyAccountSidebarOuter';
import ChangePassword from './myAccount/ChangePassword';
import ChangePlan from './myAccount/ChangePlan';
import Waiting from './activate/Waiting';
import Verified from './activate/Verified';
import ShareActivate from './activate/ShareActivate';
import UsageView from './myAccount/Usage';

const PrivateRoute = ( {children} ) => {
  return children
  const {isAuth} = useAuthContext();
  if (isAuth) {
    return children ;
  } else {
    return <Navigate  to='/login' />;
  }
};

const PrivateToCRoute = ( {children} ) => {
  const {isAuth, hasPermC} = useAuthContext();
  if (isAuth && hasPermC) {
    return children
  } else {
    return <Navigate  to='/' />;
  }
};

const PrivateToBRoute = ( {children} ) => {
  const {isAuth, hasPermC} = useAuthContext();
  return children;
  if (isAuth && !hasPermC) {
    return children
  } else {
    return <Navigate  to='/client' />;
  }
};

const UnauthorizedRoute = ( {children} ) => {
  const {isAuth, hasPermC} = useAuthContext();
  return children;
  if (isAuth) {
    if (hasPermC){
      return <Navigate  to='/home' />
    }else{
      return <Navigate  to='/client/home' />
    }
  } else {
    return children
  }
};


function App() {

  const router = createBrowserRouter([
    {
      path: "",
      element: <NavOuter />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <ClientHomeView />,
          errorElement: <ErrorPage />,
        },
        {
          path: "client",
          element: <LPtoB />,
        },
        {
          path: "login",
          element: <UnauthorizedRoute><LogIn /></UnauthorizedRoute>,
        },
        {
          path: "client/login",
          element: <UnauthorizedRoute><Login /></UnauthorizedRoute>,
        },
        {
          path: "signup",
          element: <UnauthorizedRoute><SignUp /></UnauthorizedRoute>,
        },
        {
          path: "client/signup",
          element: <UnauthorizedRoute><SignUp /></UnauthorizedRoute>,
        },
        {
          path: "signup/done",
          element: <Waiting />,
        },
        {
          path: "user/:activation_token/activation",
          element: <Verified />,
        },
        {
          path: "shared/:activation_token/activation",
          element: <ShareActivate />,
        },
        {
          path: "chat/:source",
          element: <PrivateRoute><Chat /></PrivateRoute>,
        },
        {
          path: "my-account",
          element: <PrivateRoute><MyAccountSidebarOuter /></PrivateRoute>,
          children: [
            {
              path: "change-password",
              element: <PrivateRoute><ChangePassword /></PrivateRoute>,
            },
            {
              path: "change-plan",
              element: <PrivateRoute><ChangePlan /></PrivateRoute>,
            },
            {
              path: "usage",
              element: <PrivateToBRoute><UsageView /></PrivateToBRoute>,
            },
          ]
        },
        {
          element: <EmptySidebarOuter />,
          children: [
            {
              path: "home",
              element: <PrivateToCRoute><UserHomeView /></PrivateToCRoute>,
            },
            {
              path: "client/home/",
              element: <PrivateToBRoute><ClientHomeView /></PrivateToBRoute>,
            },
            {
              path: "new-chat/",
              element: <PrivateToCRoute><NewChat /></PrivateToCRoute>,
            },
            {
              path: "client/new-chat/",
              element: <PrivateToBRoute><NewChat /></PrivateToBRoute>,
            },
          ]
        },
        {
          element: <ChatInfoSidebarOuter />,
          children: [
            {
              path: "edit-chat/:source",
              element: <PrivateToCRoute><EditChat /></PrivateToCRoute>,
            },
            {
              path: "client/edit-chat/:source",
              element: <PrivateToBRoute><EditChat /></PrivateToBRoute>,
            },
            {
              path: "client/share/:source",
              element: <PrivateToBRoute><ClientShareChat /></PrivateToBRoute>,
            },
            {
              path: "client/analysis/:source",
              element: <PrivateToBRoute><ClientAnalyzeView /></PrivateToBRoute>,
            },
            {
              path: "client/analysis/:source/:ref_id",
              element: <PrivateToBRoute><ClientAnalyzeQuestion /></PrivateToBRoute>,
            },
          ]
        },
      ]
    },
  ]);
  //, { basename: "/customgpt-front" });

  return (
    <RouterProvider router={router} />
  )
}

export default App
