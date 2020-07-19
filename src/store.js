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
import {REMOVE_PAINTING, TRIGGER} from './actions/painting';
import database from './utils/database';
import {paintingSelector} from './reducers/painting';

const localStorageMiddleware = ({getState}) => (next) => async (action) => {
  const db = await database();
  switch (action.type) {
    case REMOVE_PAINTING:
      await db.paintings.delete(action.paintingId);
      break;
    case TRIGGER:
      const paintingToStore = paintingSelector(getState());
      if (paintingToStore && paintingToStore.strokes) {
        await db.paintings.put(paintingToStore);
      }
      break;
    default:
      break;
  }
  return next(action);
};

/**
 * @type {Store<S, Action> & Store<S, A> & LazyStore}
 */
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

