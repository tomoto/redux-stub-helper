import "jasmine";
import * as Redux from "redux";
import {actions, reducer, IMyState as S} from "./example";

describe("Action creator and reducer should work by themselves", () => {
  const s: S = { counter: 666 };

  it("with increment", () => {
    expect(reducer(s, actions.increment())).toEqual({ counter: 667 });
  });
  it("with decrement", () => {
    expect(reducer(s, actions.decrement())).toEqual({ counter: 665 });
  });
  it("with add", () => {
    expect(reducer(s, actions.add(3))).toEqual({ counter: 669 });
  });
});

describe("Action creator and reducer should work with store", () => {
  it("with all actions", () => {
    const store = Redux.createStore(reducer);
    expect(store.getState().counter).toEqual(0);
    store.dispatch(actions.add(666));
    expect(store.getState().counter).toEqual(666);
    store.dispatch(actions.increment());
    expect(store.getState().counter).toEqual(667);
    store.dispatch(actions.increment());
    expect(store.getState().counter).toEqual(668);
    store.dispatch(actions.decrement());
    expect(store.getState().counter).toEqual(667);
  });
});
