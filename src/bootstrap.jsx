import 'Styles/main.less';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { basename } from 'Config/global';
import App from './App';

render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);