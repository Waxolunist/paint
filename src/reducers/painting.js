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
import {ADD_PAINTING, RECEIVE_PAINTING, REMOVE_PAINTING, TRIGGER, INITIAL_DATA_LOAD} from '../actions/painting.js';

import {createSelector} from 'reselect';
import {SHARE_PAINTING, UNSELECT_PAINTING} from '../actions/painting';
import {urltoFile} from '../utils/files';

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
        removePainting(state.paintings, action.paintingid);
        state.paintings.push(action.painting);
        state.paintings.sort(({id: a}, {id: b}) => a - b);
      }
      return {
        ...state,
        painting: {id: action.paintingid},
      };
    case REMOVE_PAINTING:
      removePainting(state.paintings, action.paintingid);
      return {
        ...state,
        paintings: [...state.paintings],
      };
    case TRIGGER:
      return {...state};
    case SHARE_PAINTING:
      sharePainting(state, action.paintingid);
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

const paintingsSelector = (state) => state.paint && state.paint.paintings;
const paintingIdSelector = (state) => state.paint.painting ? state.paint.painting.id : state.paint.paintingid;

export const paintingSelector = createSelector(
    paintingsSelector,
    paintingIdSelector,
    (paintings, paintingid) => {
      return paintings ? paintings.find(({id}) => id == paintingid) : {};
    },
);

const removePainting = (paintings, paintingid) => paintings.splice(paintings.findIndex(({id}) => id == paintingid), 1);

const sharePainting = (state, paintingid) => {
  const painting = state.paintings.find((p) => p.id === paintingid);
  if (painting) {
    // const file = urltoFile(painting.dataURL, `paint-${paintingid}.png`, 'image/png');
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
