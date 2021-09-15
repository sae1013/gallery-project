import { createStore, combineReducers,applyMiddleware, compose } from 'redux'
import thunk from "redux-thunk";
import { connectRouter } from "connected-react-router";

//Slice 
import userSlice from './modules/user';
import postSlice from './modules/post';
import uiSlice from './modules/ui';
import commentSlice from './modules/comment';

import {createBrowserHistory} from 'history';

export const customHistory = createBrowserHistory();

const rootReducer = combineReducers({
    user: userSlice.reducer,
    post:postSlice.reducer,
    comment:commentSlice.reducer,
    ui:uiSlice.reducer,
    router:connectRouter(customHistory),
  });

const middlewares = [thunk.withExtraArgument({history:customHistory})]; 

const env = process.env.NODE_ENV;

if (env === "development") {
    const { logger } = require("redux-logger");
    middlewares.push(logger);
}

const composeEnhancers = 
typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    
    })
    : compose;

const composedEnhancer = composeEnhancers( 
    applyMiddleware(...middlewares) 
    );  

const store = createStore(rootReducer,composedEnhancer);
export default store;