import thunkMiddleware from "redux-thunk";
import {createStore, applyMiddleware} from 'redux';
import {MakeStore, createWrapper, Context} from 'next-redux-wrapper';
import rootReducers, {initialState} from './rootReducers';

export const makeStore: MakeStore<initialState> = (context: Context) => {
    const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));
    return store;
};

export const wrapper = createWrapper<initialState>(makeStore, {debug: false});