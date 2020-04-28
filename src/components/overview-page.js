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
import { html } from '@polymer/lit-element';
import { repeat } from 'lit-html/lib/repeat';
import { PageViewElement } from './page-view-element.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
import { addPainting, openPainting, removePainting } from '../actions/painting';

import { AnimatedStyles, ShadowStyles } from './shared-styles.js';
import { closeIcon, imageIcon } from './my-icons.js';

import { innerWidth, outerWidth } from '../utils/geometry.js';

class OverviewPage extends connect(store)(PageViewElement) {
  _render({ _overviewWidth, _paintings }) {
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

        .painting > .close {
          width: calc(var(--icon-size) * 1px);
          height: calc(var(--icon-size) * 1px);
          border-radius: calc(var(--icon-size) * 1px);
          position: absolute;
          top: calc(var(--icon-size) / 2 * -1px);
          left: calc((var(--painting-width) / var(--painting-scalefactor) - var(--icon-size) / 2) * 1px);
          background-color: white;
          transition-property: transform;
          transform: scale(1);
          will-change: transform;
        }

        .painting > .close:hover {
          transform: scale(1.2);
        }

        .painting > .close > svg {
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
          <div class="painting add shadow animated elevate" on-click="${e => this._addPainting()}">
            <div class="add">${imageIcon}</div>
          </div>
          ${repeat(_paintings, (item, index) => html`
            <div class="painting shadow animated elevate" on-click="${e => this._openPainting(item.id)}">
              <div class="close shadow animated" on-click="${e => this._removePainting(e, item.id)}">${closeIcon}</div>
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
      _paintings: Array
    };
  }

  ready() {
    super.ready();
    window.addEventListener('resize', e => this._calcWidth());
  }

  _firstRendered() {
    super._firstRendered();
    setTimeout(() => this._calcWidth(), 0);
  }

  _stateChanged(state) {
    this._paintings = state.paint.paintings;
  }

  _calcWidth() {
    let maxWidth = innerWidth(this.shadowRoot.getElementById('wrapper'));
    let paintingWidth = outerWidth(this.shadowRoot.querySelector('.painting'));
    let divsPerRow = Math.floor(maxWidth / paintingWidth);
    this._overviewWidth = paintingWidth * divsPerRow;
  }

  _openPainting(paintingid) {
    store.dispatch(openPainting(paintingid));
  }

  _addPainting() {
    store.dispatch(addPainting());
  }

  _removePainting(event, paintingid) {
    event.stopPropagation();
    store.dispatch(removePainting(paintingid));
  }
 }

window.customElements.define('overview-page', OverviewPage);
