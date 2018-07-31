import "jasmine";
import * as Redux from "redux";
import {createActionCreator, createReducer} from "../src";
import {IMyState as S, IMyActionCreator, MyActionHandler} from "./example";

describe("Multiple action creators and combined reducer should work", () => {
  interface ICombinedState {
    counter1: S;
    counter2: S;
  }

  const actions1 = createActionCreator<IMyActionCreator>();
  const actions2 = createActionCreator<IMyActionCreator>();

  const combinedReducer = Redux.combineReducers<ICombinedState>({
    counter1: createReducer<S>(new MyActionHandler(), actions1, { counter: 666 }),
    counter2: createReducer<S>(new MyActionHandler(), actions2, { counter: 100 }),
  });

  it("only with the designated counter #1", () => {
    expect(combinedReducer(undefined, actions1.increment())).toEqual({
      counter1: { counter: 667 },
      counter2: { counter: 100 },
    });
    expect(combinedReducer(undefined, actions1.add(3))).toEqual({
      counter1: { counter: 669 },
      counter2: { counter: 100 },
    });
  });

  it("only with the designated counter #2", () => {
    expect(combinedReducer(undefined, actions2.increment())).toEqual({
      counter1: { counter: 666 },
      counter2: { counter: 101 },
    });
    expect(combinedReducer(undefined, actions2.add(3))).toEqual({
      counter1: { counter: 666 },
      counter2: { counter: 103 },
    });
  });

  it("with store", () => {
    const store = Redux.createStore(combinedReducer);

    expect(store.getState()).toEqual({
      counter1: { counter: 666 },
      counter2: { counter: 100 },
    });

    store.dispatch(actions1.increment());

    expect(store.getState()).toEqual({
      counter1: { counter: 667 },
      counter2: { counter: 100 },
    });

    store.dispatch(actions2.decrement());

    expect(store.getState()).toEqual({
      counter1: { counter: 667 },
      counter2: { counter: 99 },
    });

  });
});
