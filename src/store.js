/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import {
  createStore,
  compose as origCompose,
  applyMiddleware,
  combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';

import app from './reducers/app.js';
import paint from './reducers/painting.js'
import { Painting } from './model/painting.js';

// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || origCompose;

// Initializes the Redux store with a lazyReducerEnhancer (so that you can
// lazily add reducers after the store has been created) and redux-thunk (so
// that you can dispatch async actions). See the "Redux and state management"
// section of the wiki for more details:
// https://github.com/Polymer/pwa-starter-kit/wiki/4.-Redux-and-state-management

const localStorageMiddleware = ({getState}) => {
  return (next) => (action) => {
      const result = next(action);
      localStorage.setItem('paintings', JSON.stringify(getState().paint.paintings));
      return result;
  };
};

const reHydrateStore = () => {

  if (localStorage.getItem('paintings') !== null) {
      let paintings = JSON.parse(localStorage.getItem('paintings'));
      return { paint: { paintings: paintings.map(p => new Painting(p)) }}
  }
  return { paint: { paintings: [] }};
}

export const store = createStore(
  (state, action) => state,
  reHydrateStore(),
  compose(lazyReducerEnhancer(combineReducers), applyMiddleware(thunk, localStorageMiddleware))
);


// Initially loaded reducers.
store.addReducers({
  app, paint
});
