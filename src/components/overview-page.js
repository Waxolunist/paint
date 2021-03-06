import {html} from '@polymer/lit-element';
import {repeat} from 'lit-html/lib/repeat';
import {PageViewElement} from './page-view-element.js';

import {connect} from 'pwa-helpers/connect-mixin.js';
import store from '../store.js';
import {addPainting, openPainting, removePainting, sharePainting} from '../actions/painting';

import {AnimatedStyles, ShadowStyles} from './shared-styles.js';
import {closeIcon, imageIcon} from './my-icons.js';

import {innerWidth, outerWidth} from '../utils/geometry.js';
import {shareIcon} from './my-icons';
import {urltoFile} from '../utils/files';

class OverviewPage extends connect(store)(PageViewElement) {
  _render({_overviewWidth, _paintings}) {
    return html`
      ${AnimatedStyles}
      ${ShadowStyles}
      <style>

        :host {
          --painting-width: 210;
          --painting-height: 297;
          --painting-scalefactor: 1.2;
          --painting-margin: 10;
          --overview-columns: 4;
          --icon-size: 30;
          display: block;
          width: 100%;
          background-color: #91b5ff;
        }

        #wrapper {
          width: 100%;
          overflow-y: scroll;
          padding-top: 20px;
          padding-bottom: 20px;
          height: 100%;
          box-sizing: border-box;
        }

        .overview {
          display: flex;
          flex-wrap: wrap;
          margin: auto;
        }

        .painting {
          width: calc(var(--painting-width) / var(--painting-scalefactor) * 1px);
          height: calc(var(--painting-height) / var(--painting-scalefactor) * 1px);
          margin: calc(var(--painting-margin) * 1px);
          background-color: white;
          position: relative;
        }

        .painting > img {
          width: 100%;
          height: 100%;
        }

        .painting > .icon {
          width: calc(var(--icon-size) * 1px);
          height: calc(var(--icon-size) * 1px);
          border-radius: calc(var(--icon-size) * 1px);
          position: absolute;
          left: calc((var(--painting-width) / var(--painting-scalefactor) - var(--icon-size) / 2) * 1px);
          background-color: white;
          transition-property: transform;
          transform: scale(1);
          will-change: transform;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }

        .painting > .icon.close {
            top: calc(var(--icon-size) / 2 * -1px);
        }
        
        .painting > .icon.share {
            top: calc((var(--icon-size) / 2 * 1px) + 10px);
        }
        
        .painting > .icon.share > svg {
          width: calc(var(--icon-size) * 1px - 5px);
          height: calc(var(--icon-size) * 1px - 5px);
        }
        
        .painting > .icon:hover {
          transform: scale(1.2);
        }

        .painting > .icon > svg {
          width: calc(var(--icon-size) * 1px);
          height: calc(var(--icon-size) * 1px);
        }

        .painting.add {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: lightgray;
        }

        .painting > .add {
          width: 95%;
          height: 95%;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 10px dashed #ffffef;
          box-sizing: border-box;
          background-color: #lightgray;
        }

        .painting > .add > svg {
          width: calc(var(--icon-size) * 4px);
          height: calc(var(--icon-size) * 4px);
          fill: #ffffef;
        }

        @media screen and (max-width: 400px) {
          :host {
            --painting-scalefactor: 1.5;
            --icon-size: 25;
          }
        }
      </style>
      <div id="wrapper">
        <div class="overview" id="overview" style="width: ${_overviewWidth}px;">
          <div class="painting add shadow animated elevate" on-click="${(e) => this._addPainting()}">
            <div class="add">${imageIcon}</div>
          </div>
          ${repeat(_paintings, (item, index) => html`
            <div class="painting shadow animated elevate" on-click="${(e) => this._openPainting(item.id)}">
              <div class="icon close shadow animated" on-click="${(e) => this._removePainting(e, item.id)}">${closeIcon}</div>
              ${navigator.share ?
                  html`<div class="icon share shadow animated" on-click="${(e) => this._sharePainting(e, item.id)}">${shareIcon}</div>` :
                  html``}
              <img src="${item.dataURL}" />
            </div>
          `)}
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      _overviewWidth: Number,
      _paintings: Array,
    };
  }

  ready() {
    super.ready();
    window.addEventListener('resize', (e) => this._calcWidth());
  }

  _firstRendered() {
    super._firstRendered();
    setTimeout(() => this._calcWidth(), 0);
  }

  _stateChanged(state) {
    this._paintings = state.paint.paintings;
  }

  _calcWidth() {
    const maxWidth = innerWidth(this.shadowRoot.getElementById('wrapper'));
    const paintingWidth = outerWidth(this.shadowRoot.querySelector('.painting'));
    const divsPerRow = Math.floor(maxWidth / paintingWidth);
    this._overviewWidth = paintingWidth * divsPerRow;
  }

  async _openPainting(paintingId) {
    store.dispatch(await openPainting(paintingId));
  }

  _addPainting() {
    store.dispatch(addPainting());
  }

  _removePainting(event, paintingId) {
    event.stopPropagation();
    store.dispatch(removePainting(paintingId));
  }

  async _sharePainting(event, paintingId) {
    event.stopPropagation();
    const painting = store.getState().paint.paintings.find((p) => p.id === paintingId);
    if (painting) {
      const file = await urltoFile(painting.dataURL, `paint-${paintingId}.png`, 'image/png');
      if (navigator.canShare) {
        try {
          await navigator.share({
            title: 'Paint for Kids',
            text: 'Schau mal, Mami!',
            files: [file],
          });
          console.log('Successful share');
        } catch (err) {
          console.log('Error sharing', err);
        }
      }
    }
  }
}

window.customElements.define('overview-page', OverviewPage);
