import { combineReducers } from "redux";

import authReducer from "./AuthReducer";
import PostReducer from "./PostReducer";

export const reducers = combineReducers({authReducer,PostReducer})