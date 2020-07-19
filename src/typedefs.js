/** @typedef {import("redux-thunk").ThunkAction} ThunkAction */

/**
 * Async Action creators are exactly that—functions that create actions. It's easy
 * to conflate the terms "action" and "action creator", so do your best to use
 * the proper term.
 *
 * @example
 * const addTodo = (text) => async (dispatch) => {
 *   await someAsyncAction();
 *   dispatch({
 *     type: ADD_TODO,
 *     text
 *   });
 * };
 * store.dispatch(addTodo('foo'));
 *
 * @memberOf Redux
 * @callback Redux.AsyncActionCreator
 * @param {*}
 * @return {ThunkAction} The generated Redux async action
 * @see {@link https://redux.js.org/basics/actions#action-creators}
 */

/**
 *
 * @method
 * @name Redux.Store#dispatch
 * @param {ThunkAction} action ThunkAction to dispatch
 * @returns {void}
 */
