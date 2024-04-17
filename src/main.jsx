import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import App from './App.jsx';

import { i18n } from './i18n/config.js';
import store from './app/store';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>
);
