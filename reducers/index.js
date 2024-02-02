import { combineReducers } from "redux";
import data from './reducers';
import reminders from "./reducers";
import remindersLang from "./reducerLang";

const stor= combineReducers({
    data:reminders,
    data1:remindersLang
    
})

export default stor;