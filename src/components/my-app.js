import { LitElement, html } from '@polymer/lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import {
  updateLocationURL
} from '../actions/app.js';

class MyApp extends connect(store)(LitElement) {
  _render({appTitle, _page, _drawerOpened, _snackbarOpened, _offline}) {
    // Anything that's related to rendering should be done in here.
    return html`
    <style>

      :host {
        display: block;
        height: 100%;
        width: 100%;
      }

      .main-content > .page:not([active]) {
        display: none;
      }

      .main-content {
        display: flex;
        justify-content: center;
        min-height: 100vh;
        height: 100%;
      }
    </style>

    <!-- Main content -->
    <main class="main-content">
      <overview-page class="page" active?="${_page === 'overview'}"></overview-page>
      <paint-page class="page" active?="${_page === 'paint'}"></paint-page>
      <error-view404 class="page" active?="${_page === 'view404'}"></error-view404>
    </main>
    `;
  }

  static get properties() {
    return {
      appTitle: String,
      _page: String
    }
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/2.0/docs/devguide/gesture-events#use-passive-gesture-listeners
    setPassiveTouchGestures(true);
    window.screen.orientation.lock('portrait');
  }

  _firstRendered() {
    installRouter((location) => store.dispatch(updateLocationURL(window.location.pathname)));
  }

  _didRender(properties, changeList) {
    if ('_page' in changeList) {
      const pageTitle = properties.appTitle + ' - ' + changeList._page;
      updateMetadata({
          title: pageTitle,
          description: pageTitle
          // This object also takes an image property, that points to an img src.
      });
    }
  }

  _stateChanged(state) {
    this._page = state.app.page;
  }
}

window.customElements.define('my-app', MyApp);
