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
export const UPDATE_PAGE = 'UPDATE_PAGE';

export const navigate = (location) => (dispatch) => {
  const pathname = location.pathname;
  const parts = pathname.slice(1).split('/');
  const page = parts[0] || 'overview';
  const detailId = parts[1];
  dispatch(loadPage(page, detailId));
};

const loadPage = (page, detailId) => async (dispatch) => {
  switch (page) {
    case 'overview':
      await import('../components/overview-page.js');
      break;
    case 'paint':
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

const updatePage = (page) => {
  return {
    type: UPDATE_PAGE,
    page,
  };
};


export const updateLocationURL = (url) => (dispatch, getState) => {
  window.history.pushState({}, '', url);
  dispatch(navigate(window.location));
};
