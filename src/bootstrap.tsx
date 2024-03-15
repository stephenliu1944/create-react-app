import 'Styles/main.less';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { basename } from 'Config/global';
import httpSettings from 'Config/http';
import http from 'Utils/http';
import App from './App';

// 设置http请求的默认参数
http.defaults(httpSettings);

render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);