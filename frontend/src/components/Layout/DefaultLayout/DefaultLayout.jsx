/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import ToastContainerCustom from '~/customs/toastMessage/ToastContainerCustom';

export default function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div>{children}</div>
            <Footer />
            <ToastContainerCustom />
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
