import * as Redux from "redux";

interface IInvokeMethodActionType<AC> {
  origin: AC;
  methodName: string;
}

interface IInvokeMethodAction<AC> extends Redux.Action<IInvokeMethodActionType<AC>> {
  type: IInvokeMethodActionType<AC>;
  payload: any[];
}

export function createActionCreator<AC>() {
  const data: { origin?: AC } = {};

  const actionCreator = new Proxy(data, {
    get: (target: any, prop: string) => {
      return (...args: any[]): IInvokeMethodAction<AC> => {
        return {
          type: {
            origin: data.origin as AC,
            methodName: prop,
          },
          payload: args,
        };
      };
    },
  }) as AC;

  data.origin = actionCreator;

  return actionCreator;
}

export function createReducer<S, AS = any, AH extends AS = AS, AC extends AS = AS>(
    actionHandler: AH, actionOrigin: AC, initialState: S): Redux.Reducer<S, Redux.Action> {
  return (s: S = initialState, a: IInvokeMethodAction<AC>): S =>
    (a.type.origin === actionOrigin && actionHandler[a.type.methodName]) ?
      actionHandler[a.type.methodName].apply(actionHandler, a.payload)(s) : s;
}
