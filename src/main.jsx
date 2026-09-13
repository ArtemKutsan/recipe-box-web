import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import App from '@/app/App.jsx';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@/app/styles/index.css';
import { store } from '@/app/providers/store';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <MantineProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </Provider>,
);
