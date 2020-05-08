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
import { ADD_PAINTING, RECEIVE_PAINTING, REMOVE_PAINTING, TRIGGER, INITIAL_DATA_LOAD } from '../actions/painting.js';

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
    case INITIAL_DATA_LOAD:
      return {
        ...state,
        paintings: [...action.paintings]
      };
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
