import * as Redux from "redux";
export declare function createActionCreator<AC>(): AC;
export declare function createReducer<S, AS = any, AH extends AS = AS, AC extends AS = AS>(actionHandler: AH, actionOrigin: AC, initialState: S): Redux.Reducer<S, Redux.Action>;
