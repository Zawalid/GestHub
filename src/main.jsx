import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { I18nextProvider } from 'react-i18next';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App.jsx';
import { ErrorScreen } from './components/ui/ErrorScreen.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { ConfirmationModalProvider } from './context/ConfirmationModal';

import { i18n } from './i18n/config.js';
import './styles/index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <ErrorBoundary
      FallbackComponent={ErrorScreen}
      onError={(error, stack) => {
        console.log(
          '%c%s',
          'color: #ffffff;font-weight : bold; background: #ff0000; padding : 10px 20px; border-radius : 10px',
          `Error : ${error}`
        );
        console.log(stack?.componentStack);
      }}
    >
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ConfirmationModalProvider>
            <App />
          </ConfirmationModalProvider>
        </QueryClientProvider>
      </I18nextProvider>
    </ErrorBoundary>
  </ThemeProvider>
);
