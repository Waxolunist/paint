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
    dispatch(updateLocationURL('paint/' + paintingid));
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