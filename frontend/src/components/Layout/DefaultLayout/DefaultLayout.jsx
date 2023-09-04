/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';

export default function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div>{children}</div>
            <Footer />
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
