import { Route, Switch } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import { Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { authOperations, authSelectors } from './redux/auth/';
import { itemsSelectors } from './redux/items';

import PrivateRoute from './Components/PrivateRoute';
import PublicRoute from './Components/PublicRoute';
import Navigation from './Components/Navigation';
import Modal from './Components/Modal';
import routes from './routes';

import './App.css';

const HomeView = lazy(() =>
  import('./views/HomeView.js' /* webpackChunkName: "home-page" */),
);

const ListsView = lazy(() =>
  import('./views/ListsView.js' /* webpackChunkName: "contact-page" */),
);

const ItemsView = lazy(() =>
  import('./views/ItemsView.js' /* webpackChunkName: "contact-page" */),
);

const LoginView = lazy(() =>
  import('./views/LoginView.js' /* webpackChunkName: "login-page" */),
);

const RegistrationView = lazy(() =>
  import(
    './views/RegistrationView.js' /* webpackChunkName: "registration-page" */
  ),
);

const VerifyView = lazy(() =>
  import('./views/VerifyView.js' /* webpackChunkName: "registration-page" */),
);

function App() {
  const errorLogin = useSelector(authSelectors.getError);
  const isAuthLoading = useSelector(authSelectors.getLoading);
  const errorItem = useSelector(itemsSelectors.getError);
  const isVeryfication = useSelector(authSelectors.getIsVerification);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    errorLogin && toast.warn(`Ошибка! ${errorLogin}`);
  }, [errorLogin]);

  useEffect(() => {
    errorItem && toast.warn(`Ошибка! ${errorItem}`);
  }, [errorItem]);

  useEffect(() => {
    isVeryfication && toast.warn(`Письмо отправлено, пройдите верификацию`);
  }, [isVeryfication]);

  return (
    <Container maxWidth="md">
      <Navigation />
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path={routes.home} component={HomeView} exact />
          <PublicRoute
            path={routes.register}
            restricted
            component={RegistrationView}
            redirectTo={routes.lists}
          />
          <PublicRoute
            path={routes.login}
            restricted
            component={LoginView}
            redirectTo={routes.lists}
          />
          <PrivateRoute
            path={routes.lists}
            component={ListsView}
            redirectTo={routes.login}
          />
          <PrivateRoute
            path={routes.items}
            component={ItemsView}
            redirectTo={routes.login}
          />
          <PublicRoute path={routes.verify} component={VerifyView} />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </Suspense>
      <ToastContainer />
      {isAuthLoading && (
        <Modal>
          <h1>Авторизация...</h1>
        </Modal>
      )}
    </Container>
  );
}

export default App;
