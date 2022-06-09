import { combineReducers } from "redux";
import todoReducer from "./reducer/todoReducer";

const rootReducer = combineReducers({

    todos:todoReducer,
})
export default rootReducer;