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
import {updateLocationURL} from './app.js';

import {Painting} from '../model/painting.js';
import database from '../utils/database';

export const ADD_PAINTING = 'ADD_PAINTING';
export const REMOVE_PAINTING = 'REMOVE_PAINTING';
export const SHARE_PAINTING = 'SHARE_PAINTING';
export const OPEN_PAINTING = 'OPEN_PAINTING';
export const RECEIVE_PAINTING = 'RECEIVE_PAINTING';
export const TRIGGER = 'TRIGGER';
export const INITIAL_DATA_LOAD = 'INITIAL_DATA_LOAD';
export const UNSELECT_PAINTING = 'UNSELECT_PAINTING';

export const addPainting = () => (dispatch) => {
  const painting = new Painting();
  dispatch({
    type: ADD_PAINTING,
    painting,
  });
  dispatch(openPainting(painting.id));
};

export const receivePainting = (paintingid) => async (dispatch) => {
  const db = await database();
  const painting = await db.paintings.get(parseInt(paintingid));
  dispatch({
    type: RECEIVE_PAINTING,
    paintingid,
    painting,
  });
};

export const openPainting = (paintingid) => (dispatch) => {
  dispatch(receivePainting(paintingid));
  dispatch(updateLocationURL('/paint/' + paintingid));
};

export const removePainting = (paintingid) => (dispatch) => {
  dispatch({
    type: REMOVE_PAINTING,
    paintingid,
  });
};

export const sharePainting = (paintingid) => (dispatch) => {
  dispatch({
    type: SHARE_PAINTING,
    paintingid,
  });
};

export const trigger = () => (dispatch) => {
  const ts = Date.now();
  dispatch({
    type: TRIGGER,
    ts,
  });
};

export const unselectPainting = () => (dispacth) => {
  dispacth({
    type: UNSELECT_PAINTING,
  });
};

export const initializeState = () => {
  return async (dispatch) => {
    const db = await database();
    const paintings = await db.paintings.toArray((arr) =>
      arr.map(({id, dataURL}) => ({id, dataURL})));
    dispatch({
      type: INITIAL_DATA_LOAD,
      paintings,
    });
  };
};
