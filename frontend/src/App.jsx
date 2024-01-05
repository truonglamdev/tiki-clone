import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Cookies from 'universal-cookie';
import DefaultLayout from './components/Layout/DefaultLayout';
import ToastContainerCustom from './customs/toastMessage/ToastContainerCustom';
import { getToastError } from './customs/toastMessage/toastMessage';
import { getDetailsUser, loginUser, resetUser } from './redux/actions/authAction';
import { decodeJwtFunc, checkExpRefreshToken } from './utils/decodedJwt';
import Loading from './components/Loading/Loading';
import ProtectedRoute from './components/ProtectedRoute';
import routes from './routes/routes';
const cookies = new Cookies();

function App() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    // if (refreshToken) {
    //     if (checkExpRefreshToken) {
    //         dispatch(resetUser());
    //         getToastError('Your version has expired, please log in again');
    //     }
    // }

    useEffect(() => {
        // const refreshToken = cookies.get('refreshToken');
        const accessToken = cookies.get('accessToken');
        if (accessToken) {
            const { id } = decodeJwtFunc(accessToken);
            dispatch(getDetailsUser(id));
        }
        // if (refreshToken) {
        //     if (checkExpRefreshToken) {
        //         dispatch(loginUser());
        //         getToastError('Your version has expired, please log in again');
        //     }
        // }
    }, [dispatch]);
    return (
        <>
            <Router>
                <Routes>
                    {/* {privateRoutes.map((route) => {
                        const Page = route.page;
                        const Layout = route.isShowHeader ? DefaultLayout : Fragment;
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    <ProtectedRoute redirectTo="/login" roles={route.roles}>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </ProtectedRoute>
                                }
                            />
                        );
                    })} */}
                    {routes.map((route) => {
                        const Page = route.page;
                        const Layout = route.isShowHeader ? DefaultLayout : Fragment;
                        if (route.isPrivate) {
                            return (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    element={
                                        <ProtectedRoute redirectTo="/login" roles={route.roles} user={user}>
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        </ProtectedRoute>
                                    }
                                />
                            );
                        } else {
                            return (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        }
                    })}
                </Routes>
            </Router>
            <ToastContainerCustom />
        </>
    );
}

export default App;
