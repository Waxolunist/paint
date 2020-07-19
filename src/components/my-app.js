import {html, LitElement} from '@polymer/lit-element';
import {setPassiveTouchGestures} from '@polymer/polymer/lib/utils/settings.js';
import {connect} from 'pwa-helpers/connect-mixin.js';
import {installRouter} from 'pwa-helpers/router.js';
import {updateMetadata} from 'pwa-helpers/metadata.js';

import store from '../store.js';

import {updateLocationURL} from '../actions/app.js';
import {initializeState} from '../actions/painting';

class MyApp extends connect(store)(LitElement) {
  _render({_page}) {
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
      _page: String,
    };
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/2.0/docs/devguide/gesture-events#use-passive-gesture-listeners
    setPassiveTouchGestures(true);
    import('../libs/o9n').then(() => {
      window.o9n.orientation.lock('portrait').catch((err) => {
        console.log('Ignore this error: ' + err.message);
      });
    });
  }

  _firstRendered() {
    store.dispatch(initializeState());
    installRouter((location) =>
      store.dispatch(updateLocationURL(window.location.pathname)));
  }

  _didRender({appTitle}, {_page}) {
    if (_page) {
      const pageTitle = [appTitle, _page].filter((el) => el).join(' - ');
      updateMetadata({
        title: pageTitle,
        description: pageTitle,
      });
    }
  }

  _stateChanged({app}) {
    this._page = app.page;
  }
}

window.customElements.define('my-app', MyApp);
