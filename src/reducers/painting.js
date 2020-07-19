/** @typedef {import("../model/painting")} */
/**
 * Reducers for scope painting.
 *
 * @redux
 * @reduxActionScope painting
 * @module paintingReducers
 *
 */
import {
  ADD_PAINTING,
  RECEIVE_PAINTING,
  REMOVE_PAINTING,
  TRIGGER,
  INITIAL_DATA_LOAD} from '../actions/painting.js';

import {createSelector} from 'reselect';
import {SHARE_PAINTING, UNSELECT_PAINTING} from '../actions/painting';

/**
 * @typedef {Object} paintingState
 * @property {Painting[]} paintings the page to open
 * @property {Painting | undefined} painting current painting
 */

/**
 * @typedef {Object} paintingAction
 * @property {Painting | undefined} painting current painting
 * @property {number | string | undefined} paintingId id of the current painting
 */

/**
 * Paintings reducer.
 *
 * @name paint
 * @method
 * @redux
 * @reduxReducer
 * @param {paintingState} state
 * @param {paintingAction} action
 * @return {paintingState}
 */
const paint = (state = {paintings: []}, action) => {
  switch (action.type) {
    case ADD_PAINTING:
      return {
        ...state,
        paintings: [...state.paintings, action.painting],
        painting: action.painting,
      };
    case RECEIVE_PAINTING:
      if (action.painting) {
        removePainting(state.paintings, action.paintingId);
        state.paintings.push(action.painting);
        state.paintings.sort(({id: a}, {id: b}) => a - b);
      }
      return {
        ...state,
        painting: {id: action.paintingId},
      };
    case REMOVE_PAINTING:
      removePainting(state.paintings, action.paintingId);
      return {
        ...state,
        paintings: [...state.paintings],
      };
    case TRIGGER:
      return {...state};
    case SHARE_PAINTING:
      sharePainting(state, action.paintingId);
      return {...state};
    case INITIAL_DATA_LOAD:
      return {
        ...state,
        paintings: [...action.paintings],
      };
    case UNSELECT_PAINTING:
      return {
        ...state,
        paintings: state.paintings.map(({id, dataURL}) => ({id, dataURL})),
      };
    default:
      return state;
  }
};

const paintingsSelector = (state) => state.paint?.paintings;
const paintingIdSelector = (state) => state.paint.painting ? state.paint.painting.id : state.paint.paintingId;

export const paintingSelector = createSelector(
    paintingsSelector,
    paintingIdSelector,
    (paintings, paintingId) => {
      return paintings ? paintings.find(({id}) => id == paintingId) : {};
    },
);

const removePainting = (paintings, paintingId) =>
  paintings.splice(paintings.findIndex(({id}) => id == paintingId), 1);

const sharePainting = (state, paintingId) => {
  const painting = state.paintings.find((p) => p.id === paintingId);
  if (painting) {
    // const file = urltoFile(painting.dataURL, `paint-${paintingId}.png`, 'image/png');
    if (navigator.share) {
      navigator.share({
        title: 'Paint for Kids',
        text: 'Schau mal, Mama!',
        url: painting.dataURL,
      })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
    }
  }
};

export default paint;
