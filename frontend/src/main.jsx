import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './redux/store';
import GlobalStyles from './components/Global';
import Modal from 'react-modal';

const appElement = document.getElementById('root');
Modal.setAppElement(appElement);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <React.StrictMode>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </React.StrictMode>
    </Provider>,
);
