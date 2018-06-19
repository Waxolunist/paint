import { ADD_PAINTING, RECEIVE_PAINTING, REMOVE_PAINTING, TRIGGER } from '../actions/painting.js';

import { createSelector } from 'reselect';

const paint = (state = { paintings: [] }, action) => {
  switch (action.type) {
    case ADD_PAINTING:
      return {
        ...state,
        paintings: [...state.paintings, action.painting],
        painting: action.painting
      };
    case RECEIVE_PAINTING:
      return {
        ...state,
        painting: { id: action.paintingid }
      };
    case REMOVE_PAINTING:
      state.paintings.splice(state.paintings.findIndex(({ id }) => id == action.paintingid), 1);
      return {
        ...state,
        paintings: [...state.paintings]
      };
    case TRIGGER:
      return { ...state };
    default:
      return state;
  }
}

const paintingsSelector = state => state.paint && state.paint.paintings;
const paintingIdSelector = state => state.paint.painting ? state.paint.painting.id : state.paint.paintingid;

export const paintingSelector = createSelector(
  paintingsSelector,
  paintingIdSelector,
  (paintings, paintingid) => {
    return paintings ? paintings.find(({ id }) => id == paintingid) : {};
  }
);

export default paint;
