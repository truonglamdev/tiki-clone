import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Cookies from 'universal-cookie';
import DefaultLayout from './components/Layout/DefaultLayout';
import ToastContainerCustom from './customs/toastMessage/ToastContainerCustom';
import { getToastError } from './customs/toastMessage/toastMessage';
import { getDetailsUser, loginUser, resetUser } from './redux/actions/authAction';
import { routes } from './routes';
import { decodeJwtFunc, checkExpRefreshToken } from './utils/decodedJwt';
import Loading from './components/Loading/Loading';
const cookies = new Cookies();

function App() {
    const dispatch = useDispatch();
    const { user, isLoading } = useSelector((state) => state.auth);
    // if (refreshToken) {
    //     if (checkExpRefreshToken) {
    //         dispatch(resetUser());
    //         getToastError('Your version has expired, please log in again');
    //     }
    // }

    useEffect(() => {
        console.log('re-render-app');
        const accessToken = cookies.get('accessToken');
        // const refreshToken = cookies.get('refreshToken');
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
                    {routes.map((route) => {
                        const Page = route.page;
                        const Layout = route.isShowHeader ? DefaultLayout : Fragment;
                        if (user && route.isPrivate) {
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
                        } else if (!route.isPrivate) {
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
