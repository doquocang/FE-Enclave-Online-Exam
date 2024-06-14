import { combineReducers } from "redux";
import { reducers as studySearchReducers } from "./StudySearch/reducers";
import { reducers as otherReducers } from "./Other/reducers";

export const rootReducer = combineReducers({
  studySearch: studySearchReducers,
  other: otherReducers,
});