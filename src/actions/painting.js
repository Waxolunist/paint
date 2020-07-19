/** @type {import("redux-thunk").ThunkAction} */
/**
 * Actions for scope painting.
 *
 * @redux
 * @reduxActionScope painting
 * @module paintingActions
 *
 */
import {updateLocationURL} from './app.js';

import {Painting} from '../model/painting.js';
import database from '../utils/database';

/**
 * @constant ADD_PAINTING
 * @type {Redux.ActionType}
 */
export const ADD_PAINTING = 'ADD_PAINTING';

/**
 * @constant REMOVE_PAINTING
 * @type {Redux.ActionType}
 */
export const REMOVE_PAINTING = 'REMOVE_PAINTING';

/**
 * @constant SHARE_PAINTING
 * @type {Redux.ActionType}
 */
export const SHARE_PAINTING = 'SHARE_PAINTING';

/**
 * @constant OPEN_PAINTING
 * @type {Redux.ActionType}
 */
export const OPEN_PAINTING = 'OPEN_PAINTING';

/**
 * @constant RECEIVE_PAINTING
 * @type {Redux.ActionType}
 */
export const RECEIVE_PAINTING = 'RECEIVE_PAINTING';

/**
 * @constant TRIGGER
 * @type {Redux.ActionType}
 */
export const TRIGGER = 'TRIGGER';

/**
 * @constant INITIAL_DATA_LOAD
 * @type {Redux.ActionType}
 */
export const INITIAL_DATA_LOAD = 'INITIAL_DATA_LOAD';

/**
 * @constant UNSELECT_PAINTING
 * @type {Redux.ActionType}
 */
export const UNSELECT_PAINTING = 'UNSELECT_PAINTING';

/**
 * Action to create a new painting.
 * Dispatches an {@link module:paintingActions~ADD_PAINTING ADD_PAINTING} and
 * {@link module:paintingActions~openPainting openPainting} action.
 *
 * @name addPainting
 * @method
 * @redux
 * @return { ThunkAction }
 * @see {@link Redux.AsyncActionCreator}
 * @see {@link module:paintingActions~ADD_PAINTING ADD_PAINTING}
 * @see {@link module:paintingActions~openPainting openPainting}
 */
export const addPainting = () => (dispatch) => {
  const painting = new Painting();
  dispatch({
    type: ADD_PAINTING,
    painting,
  });
  dispatch(openPainting(painting.id));
};

/**
 * Action to load a painting into the state
 * ({@link module:paintingActions~RECEIVE_PAINTING RECEIVE_PAINTING}).
 *
 * @name receivePainting
 * @method
 * @redux
 * @param {number | string} paintingId Id of the painting to load from the database
 * @return { ThunkAction }
 * @see {@link Redux.AsyncActionCreator}
 * @see {@link module:paintingActions~RECEIVE_PAINTING RECEIVE_PAINTING}
 */
export const receivePainting = (paintingId) => async (dispatch) => {
  const db = await database();
  const painting = await db.paintings.get(parseInt(paintingId));
  dispatch({
    type: RECEIVE_PAINTING,
    paintingId,
    painting,
  });
};

/**
 * Action to load a painting and open it.
 *
 * @name openPainting
 * @method
 * @redux
 * @param {number | string} paintingId Id of the painting to open
 * @return { ThunkAction }
 * @see {@link Redux.AsyncActionCreator}
 * @see {@link module:paintingActions~receivePainting receivePainting}
 */
export const openPainting = (paintingId) => async (dispatch) => {
  await dispatch(receivePainting(paintingId));
  dispatch(updateLocationURL('/paint/' + paintingId));
};

/**
 * Remove a painting.
 *
 * @name removePainting
 * @method
 * @redux
 * @param {number | string} paintingId Id of the painting to remove
 * @return { ThunkAction }
 * @see {@link Redux.AsyncActionCreator}
 * @see {@link module:paintingActions~REMOVE_PAINTING REMOVE_PAINTING}
 */
export const removePainting = (paintingId) => async (dispatch) => {
  dispatch({
    type: REMOVE_PAINTING,
    paintingId,
  });
};

/**
 * Share a painting.
 *
 * @name sharePainting
 * @method
 * @redux
 * @param {number | string} paintingId Id of the painting to share
 * @return { ThunkAction }
 * @see {@link Redux.AsyncActionCreator}
 * @see {@link module:paintingActions~SHARE_PAINTING SHARE_PAINTING}
 */
export const sharePainting = (paintingId) => async (dispatch) => {
  dispatch({
    type: SHARE_PAINTING,
    paintingId,
  });
};

/**
 * Trigger state changed event.
 *
 * @name trigger
 * @method
 * @redux
 * @return { ThunkAction }
 * @see {@link Redux.AsyncActionCreator}
 * @see {@link module:paintingActions~TRIGGER TRIGGER}
 */
export const trigger = () => async (dispatch) => {
  const ts = Date.now();
  dispatch({
    type: TRIGGER,
    ts,
  });
};

/**
 * Action to unselect the current painting.
 * This is the reverse action for {@link module:paintingActions~receivePainting receivePainting}.
 *
 * @name unselectPainting
 * @method
 * @redux
 * @return { ThunkAction }
 * @see {@link Redux.AsyncActionCreator}
 * @see {@link module:paintingActions~UNSELECT_PAINTING UNSELECT_PAINTING}
 */
export const unselectPainting = () => async (dispacth) => {
  dispacth({
    type: UNSELECT_PAINTING,
  });
};

/**
 * Initializes the store with the data for the overview page.
 *
 * @name initializeState
 * @method
 * @return { ThunkAction }
 * @see {@link Redux.AsyncActionCreator}
 * @see {@link module:paintingActions~INITIAL_DATA_LOAD INITIAL_DATA_LOAD}
 */
export const initializeState = () => async (dispatch) => {
  const db = await database();
  const paintings = await db.paintings.toArray((arr) =>
    arr.map(({id, dataURL}) => ({id, dataURL})));
  dispatch({
    type: INITIAL_DATA_LOAD,
    paintings,
  });
};
