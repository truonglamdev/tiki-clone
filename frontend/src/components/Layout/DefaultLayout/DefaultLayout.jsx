/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import Header from '../Header';

export default function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div>{children}</div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
