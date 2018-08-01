/*
MIT License

Copyright (c) 2018 Tomoto Shimizu Washio

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
import * as Redux from "redux";

interface IInvokeMethodActionType<AC> {
  origin: AC;
  methodName: string;
}

interface IInvokeMethodAction<AC> extends Redux.Action<IInvokeMethodActionType<AC>> {
  type: IInvokeMethodActionType<AC>;
  args: any[];
}

export function createActionCreator<AC>() {
  const data: { origin?: AC } = {};

  const actionCreator = new Proxy(data, {
    get(target: any, prop: string) {
      return (...args: any[]): IInvokeMethodAction<AC> => ({
        type: {
          origin: data.origin as AC,
          methodName: prop,
        },
        args,
      });
    },
  }) as AC;

  data.origin = actionCreator;

  return actionCreator;
}

export function createReducer<S, AS = any, AH extends AS = AS, AC extends AS = AS>(
    actionHandler: AH, actionOrigin: AC, initialState: S): Redux.Reducer<S, Redux.Action> {
  return (s: S = initialState, a: Redux.Action): S =>
    (a.type.origin === actionOrigin && actionHandler[a.type.methodName]) ?
      actionHandler[a.type.methodName].apply(actionHandler, (a as IInvokeMethodAction<AC>).args)(s) : s;
}
