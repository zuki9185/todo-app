import { applyMiddleware,compose,createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

const comp = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,comp(applyMiddleware(thunk)));

export default store;