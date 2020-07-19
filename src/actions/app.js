/**
 * Actions for scope app.
 *
 * @redux
 * @reduxActionScope app
 * @module appActions
 */

/**
 * @constant UPDATE_PAGE
 * @type {Redux.ActionType}
 */
export const UPDATE_PAGE = 'UPDATE_PAGE';

/**
 * Navigate to the location.
 *
 * @name navigate
 * @method
 * @redux
 * @param {Object} location location object
 * @param {string} [location.pathname=/overview] pathname to go to
 * @return { ThunkAction }
 * @see {@link Redux.AsyncActionCreator}
 * @see {@link module:appActions~loadPage loadPage}
 */
export const navigate = ({pathname = '/overview'}) => async (dispatch) => {
  const parts = pathname.slice(1).split('/');
  const page = parts[0] || 'overview';
  const detailId = parts[1];
  dispatch(loadPage(page, detailId));
};

/**
 * Load page.
 *
 * @name loadPage
 * @method
 * @redux
 * @param {string} page location object
 * @param {string=} detailId detail paramater
 * @return { ThunkAction }
 * @see {@link Redux.AsyncActionCreator}
 */
const loadPage = (page, detailId) => async (dispatch) => {
  switch (page) {
    case 'overview':
      // TODO move to component after litelement update and have clearer lifecycle events
      document.body.classList.remove('no-overflow');
      await import('../components/overview-page.js');
      break;
    case 'paint':
      // TODO move to component after litelement update and have clearer lifecycle events
      document.body.classList.add('no-overflow');
      await import('../components/paint-page.js');
      const {receivePainting} = await import('./painting.js');
      dispatch(receivePainting(detailId));
      break;
    default:
      page = 'view404';
      import('../components/error-view404.js');
  }

  dispatch(updatePage(page));
};

/**
 * Update page.
 *
 * @name updatePage
 * @method
 * @redux
 * @param {string} page page object to update
 * @return { ThunkAction }
 * @see {@link Redux.AsyncActionCreator}
 */
const updatePage = (page) => async (dispatch) => dispatch({
  type: UPDATE_PAGE,
  page,
});

/**
 * Update page.
 *
 * @name updateLocationURL
 * @method
 * @redux
 * @param {string} url set window location url
 * @return { ThunkAction }
 * @see {@link Redux.AsyncActionCreator}
 */
export const updateLocationURL = (url) => async (dispatch) => {
  window.history.pushState({}, '', url);
  dispatch(navigate(window.location));
};
