import { createStore, applyMiddleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleware = [thunk];

const makeStore = () => createStore(rootReducer, applyMiddleware(...middleware));

export const wrapper = createWrapper(makeStore);
