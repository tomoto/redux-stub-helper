import {Action} from "redux";
import {createActionCreator, createReducer} from "../src";

// Define your state
export interface IMyState {
  counter: number;
}

// Short name for your state just for convenience
type S = IMyState;

// Define your actions as an interface with generic return type
export interface IMyActions<R> {
  increment(): R;
  decrement(): R;
  add(value: number): R;
}

// Alias to the action creator type which returns Redux actions
export type IMyActionCreator = IMyActions<Action>;

// Alias to the action handler type which returns a function to take an old state and return the new state
export type IMyActionHandler = IMyActions<(s: S) => S>;

// Implement the action handler
export class MyActionHandler implements IMyActionHandler {
  public increment() {
    return (s: S): S => ({
      ...s,
      counter: s.counter + 1,
    });
  }

  public decrement() {
    return (s: S): S => ({
      ...s,
      counter: s.counter - 1,
    });
  }

  public add(x: number) {
    return (s: S): S => ({
      ...s,
      counter: s.counter + x,
    });
  }
}

// Create an action creator instance; a simple proxy is created behind the scenes
export const actions = createActionCreator<IMyActionCreator>();

// Create a reducer instance by tying an action handler instance and the action creator instance above
export const reducer = createReducer<S, IMyActions<any>>(new MyActionHandler(), actions, { counter: 0 });

// Now these actions and reducers are ready to use, for example:
let state: IMyState = { counter: 666 };
state = reducer(state, actions.increment()); // { counter: 667 }
state = reducer(state, actions.add(5)); // { counter: 672 }
