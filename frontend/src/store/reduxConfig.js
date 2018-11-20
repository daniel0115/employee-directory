////Step3
// create store
//store:Holds application state
//store:Allows access to state via getState()
//store:Allows state to be updated via dispatch(action)
//store:listeners via subscribe(listener)

import { createStore, applyMiddleware, compose } from "redux";
import reducers from "../reducers";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//store: 创造一个存储state空间！
//middleware: 所以的action在经过reducer之前都会经过middleware（thunk就是middleware）
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
