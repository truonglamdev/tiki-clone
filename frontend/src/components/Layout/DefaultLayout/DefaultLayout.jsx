/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import Header from '../Header/Header';

export default function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div>{children}</div>
        </div>
    );
}

DefaultLayout.PropTypes = {
    children: PropTypes.node.isRequired,
};
