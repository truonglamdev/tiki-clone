import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Cookies from 'universal-cookie';
import DefaultLayout from './components/Layout/DefaultLayout';
import ToastContainerCustom from './customs/toastMessage/ToastContainerCustom';
import { getToastError } from './customs/toastMessage/toastMessage';
import { resetUser } from './redux/actions/authAction';
import { routes } from './routes';
import checkExpRefreshToken from './utils/checkExpRefreshToken';
const cookies = new Cookies();

function App() {
    const dispatch = useDispatch();
    const refreshToken = cookies.get('refreshToken');
    if (refreshToken) {
        if (checkExpRefreshToken) {
            dispatch(resetUser());
            getToastError('Your version has expired, please log in again');
        }
    }
    return (
        <div>
            <Router>
                <Routes>
                    {routes.map((route) => {
                        const Page = route.page;
                        const Layout = route.isShowHeader ? DefaultLayout : Fragment;
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
                    })}
                </Routes>
            </Router>
            <ToastContainerCustom />
        </div>
    );
}

export default App;
