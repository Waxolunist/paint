/**
@license
Copyright (C) 2018  Christian Sterzl <christian.sterzl@gmail.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>
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
//import localforage from 'localforage';
import Dexie from 'dexie';

const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || origCompose;

export const db = new Dexie("PaintingsDB");
db.version(1).stores({
  paintings: '++id,strokes,dataURL'
});
db.version(2).upgrade(trans => {
  console.log('upgrade');
  const paintingsFromLS = localStorage.getItem('paintings');
  const paintings = JSON.parse(paintingsFromLS).map(p => new Painting(p));
  localStorage.setItem('paintings', null);
  return trans.paintings.bulkAdd(paintings);
});
db.paintings.mapToClass(Painting);
db.open()
  .then(db => {
    console.log(`DB successfule opened. Version ${db.verno}`);
    return db;
  })
  .catch (function (err) {
    console.error('Failed to open db: ' + (err.stack || err));
  });

const localStorageMiddleware = ({getState}) => {
  return (next) => (action) => {
      const result = next(action);
      getState().paint.paintings.forEach(p => db.paintings.put(p));
      //localforage.setItem('paintings', JSON.stringify(getState().paint.paintings));
      //localStorage.setItem('paintings', JSON.stringify(getState().paint.paintings));
      return result;
  };
};

const reHydrateStore = async () => {
  const paintings = await db.paintings.toArray();
  return { paint: { paintings }}
}

export const store = createStore(
  (state, action) => state,
  { paint: { paintings: [] }},
  compose(lazyReducerEnhancer(combineReducers), applyMiddleware(thunk, localStorageMiddleware))
);

store.addReducers({
  app, paint
});
