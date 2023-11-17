import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WelcomePage from '../pages/welcome';
import LoginPage from '../pages/login';
import Navbar from '../layout/navbar';
import { SessionProvider } from '../providers/session';
import PrivateRoute from './private-route';
import RegisterPage from '../pages/register';
import PublicRoute from './public-route';
import MyEventsPage from '../pages/myEvents/index.jsx';
import NewEventPage from '../pages/event/new';
import EditEventPage from '../pages/event/edit';
import ViewEventPage from '../pages/event/view';
import UsersPage from '../pages/users/index.jsx';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
      children: [
        {
          path: '/',
          element: (
            <PrivateRoute>
              <WelcomePage />
            </PrivateRoute>
          ),
        },
        {
          path: '/my-events',
          element: (
            <PrivateRoute>
              <MyEventsPage />
            </PrivateRoute>
          ),
        },
        {
          path: '/login',
          element: (
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          ),
        },
        {
          path: '/register',
          element: (
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          ),
        },
        {
          path: '/event/new',
          element: (
            <PrivateRoute>
              <NewEventPage />
            </PrivateRoute>
          ),
        },
        {
          path: '/event/:id/edit',
          element: (
            <PrivateRoute>
              <EditEventPage />
            </PrivateRoute>
          ),
        },
        {
          path: '/event/:id/view',
          element: (
            <PrivateRoute>
              <ViewEventPage />
            </PrivateRoute>
          ),
        },
        {
          path: '/users',
          element: (
            <PrivateRoute admin>
              <UsersPage />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  );
}

export default App;
