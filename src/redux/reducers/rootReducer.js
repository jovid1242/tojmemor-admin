import { combineReducers } from "redux";
import customizer from "./customizer/index";
import auth from "./auth/index";
import navbar from "./navbar/index";
import dataList from "./data-list/index";

const rootReducer = combineReducers({
  customizer: customizer,
  auth: auth,
  navbar: navbar,
  dataList: dataList,
});

export default rootReducer;
