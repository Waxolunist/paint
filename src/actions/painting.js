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
import { updateLocationURL } from './app.js';

import { Painting } from "../model/painting.js";

export const ADD_PAINTING = 'ADD_PAINTING';
export const REMOVE_PAINTING = 'REMOVE_PAINTING';
export const OPEN_PAINTING = 'OPEN_PAINTING';
export const RECEIVE_PAINTING = 'RECEIVE_PAINTING';
export const TRIGGER = 'TRIGGER';

export const addPainting = () => (dispatch) => {
    let painting = new Painting();
    dispatch({
      type: ADD_PAINTING,
      painting
    });
    dispatch(openPainting(painting.id));
  };
  
  export const receivePainting = (paintingid) => (dispatch) => {
    dispatch({
      type: RECEIVE_PAINTING,
      paintingid
    });
  };
  
  export const openPainting = (paintingid) => (dispatch) => {
    dispatch(receivePainting(paintingid));
    dispatch(updateLocationURL('/paint/' + paintingid));
  };

  export const removePainting = (paintingid) => (dispatch) => {
    dispatch({
      type: REMOVE_PAINTING,
      paintingid
    });
  };

  export const trigger = () => (dispatch) => {
    let ts = Date.now();
    dispatch({
      type: TRIGGER,
      ts
    });
  };