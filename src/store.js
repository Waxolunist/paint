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
  compose,
  applyMiddleware,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import {lazyReducerEnhancer} from 'pwa-helpers/lazy-reducer-enhancer.js';

import app from './reducers/app.js';
import paint from './reducers/painting.js';
import {REMOVE_PAINTING} from './actions/painting';
import database from './utils/database';
import {paintingSelector} from './reducers/painting';

const localStorageMiddleware = ({getState}) => (next) => async (action) => {
  console.log(action);
  const db = await database();
  switch (action.type) {
    case REMOVE_PAINTING:
      await db.paintings.delete(action.paintingid);
      break;
    default:
      const paintingToStore = paintingSelector(getState());
      if (paintingToStore && paintingToStore.strokes) {
        await db.paintings.put(paintingToStore);
      }
      break;
  }
  return next(action);
};


const store = createStore(
    (state, action) => state,
    {paint: {paintings: []}},
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)(
        lazyReducerEnhancer(combineReducers),
        applyMiddleware(thunk, localStorageMiddleware),
    ),
);

store.addReducers({
  app, paint,
});

export default store;

