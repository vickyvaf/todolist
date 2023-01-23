import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { todosReducer } from "./todosReducer";

const rootReducer = combineReducers({
  loginReducer: loginReducer,
  todosReducer: todosReducer,
});

export default rootReducer;
