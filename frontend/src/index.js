//Step4: Connect React with Redux
//a.The way we recommend to use Redux with React is to use a special Component <Provider> from react-redux,
//make the store available to all React Components to use it once when you render the root Component:
//b.we just need one more step to connect our App Component with Redux using connect() function from react-redux:
//c.you need to define a special function called mapStateToProps that tells how to transform the current Redux store state into the props you want to pass to a presentational component you are wrapping.
//d.you can define a function called mapDispatchToProps() that receives the dispatch() method and returns callback props that you want to inject into the presentational component.

import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";
import store from "./store/reduxConfig";
import App from "./containers/App";

import "antd/dist/antd.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
