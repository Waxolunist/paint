/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

export const UPDATE_PAGE = 'UPDATE_PAGE';

export const navigate = (location) => (dispatch) => {
  // Extract the page name from path.
  // Extract the page name from path.
  // Any other info you might want to extract from the path (like page type),
  // you can do here.
  const pathname = location.pathname;
  const parts = pathname.slice(1).split('/');
  const page = parts[0] || 'overview';
  // book id is in the path: /detail/{detailId}
  const detailId = parts[1];
  // query is extracted from the search string: /explore?q={query}

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page, detailId));
};

const loadPage = (page, detailId) => async (dispatch) => {
  switch(page) {
    case 'overview':
      await import('../components/overview-page.js');
      break;
    case 'paint':
      await import('../components/paint-page.js');
      let { receivePainting } = await import('./painting.js');
      dispatch(receivePainting(detailId));
      break;
    default:
      page = 'view404';
      import('../components/error-view404.js');
  }

  dispatch(updatePage(page));
}

const updatePage = (page) => {
  return {
    type: UPDATE_PAGE,
    page
  };
}


export const updateLocationURL = (url) => (dispatch, getState) => {
  window.history.pushState({}, '', url);
  dispatch(navigate(window.location));
}