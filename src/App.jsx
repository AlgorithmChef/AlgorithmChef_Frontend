import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './component/Root'
import ErrorPage from './component/Error'
import HomePage from './component/HomePage'
import Login from './component/Auth/Login'
import SignUp from './component/Auth/Signup'
import FindId from "./component/Auth/Id/FindId"
import FindPassword from './component/Auth/Password/FindPassword'
import UpdateTempPassword from './component/Auth/Password/UpdateTempPassword'

const router = createBrowserRouter([
  {
    path : "/",
    element : <RootLayout />,
    errorElement : <ErrorPage />,
    children : [
      {
        index: true,
        element : <HomePage />
      },
      {
        path : "/auth/login",
        element : <Login />
      },
      {
        path : "/auth/signup",
        element : <SignUp />
      },
      {
        path : "/auth/findUserId",
        element : <FindId />
      },
      {
        path : "/auth/findPassword",
        element : <FindPassword />
      },
      {
        path : "/auth/update-tempPasswrod",
        element : <UpdateTempPassword />
      }

    ]
  }

])
function App() {
  return (
    <>
      <RouterProvider router={router} />;
    </>
  )
}

export default App
