import React from "react";
import ReactDOM from "react-dom";
import { styled, ThemeProvider } from "@material-ui/styles";
import theme from './UI/Theme';
import { Router } from "react-router";
import { Provider } from "react-redux";

import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";

import store from "./redux/configureStore";
import { customHistory } from "./redux/configureStore";

ReactDOM.render(
  <Provider store={store}>
    <Router history={customHistory}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
