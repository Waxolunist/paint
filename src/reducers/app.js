/**
 * Reducers for scope app.
 *
 * @redux
 * @reduxActionScope app
 * @module appReducers
 *
 */
import {
  UPDATE_PAGE,
} from '../actions/app.js';

/**
 * @typedef {Object} appState
 * @property {String} page the page to open
 */

/**
 * @typedef {Object} appAction
 * @property {String} page the page to open
 */

/**
 * Application reducer.
 *
 * @name app
 * @method
 * @redux
 * @reduxReducer
 * @param {appState} state
 * @param {appAction} action
 * @return {appState}
 */
const app = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return {
        ...state,
        page: action.page,
      };
    default:
      return state;
  }
};

export default app;
