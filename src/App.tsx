import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Routing from './routes/Routing';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <CssBaseline />
        <Routing />
      </BrowserRouter>
    </I18nextProvider>
  );
};

export default App;
