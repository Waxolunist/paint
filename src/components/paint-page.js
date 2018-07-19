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

import { paintingSelector } from '../reducers/painting.js';
import { trigger } from '../actions/painting.js';

import { arrowBack } from './my-icons.js';
import { updateLocationURL } from '../actions/app.js';

import { AnimatedStyles, ShadowStyles } from './shared-styles.js';

import { htmlcolors_hsl } from '../model/htmlcolors.js';
import { waitForId } from '../utils/elements.js';
import { isLandscape } from '../utils/geometry.js';
import { waitTillTrue } from '../utils/promises.js';
import { Stroke } from '../model/painting.js';

import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import * as Gestures from '@polymer/polymer/lib/utils/gestures.js';

class PaintPage extends connect(store)(GestureEventListeners(PageViewElement)) {
  _render({ _painting, _color, _canvasWidth, _canvasHeight }) {
    console.log('render: ' + this._canvasWidth + ':' + this._canvasHeight)
    return html`
      ${AnimatedStyles}
      ${ShadowStyles}
      <style>
        :host {
          display: block;
          width: 100%;
          min-height: 100%;
        }

        .icon {
          padding: 5px;
        }

        .icon.animated {
          transform: scale(1);
          will-change: transform;
          transition-property: transform;
        }
        
        .icon.animated:hover {
          transform: scale(1.2);
        }

        .colorchooser {
          width: 30px;
          height: 30px;
          margin: 5px;
        }

        .colorchooser:last-child {
          padding-bottom: 10px
        }

        .colorchooser > div {
          width: 100%;
          height: 100%;
          border-radius: 100%;
          border: 1px solid #afafaf;
          box-sizing: border-box;
        }

        .colorchooser[selected] > div {
          border-radius: 0;
        }

        .colorchooser.animated > div {
          transform: scale(1);
          will-change: transform, border-radius;
          transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1), border-radius 0.75s, box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .colorchooser.animated:hover > div {
          transform: scale(1.1);
        }
        
        .paint {
          display: flex;
          width: 100%;
          height: 100%;
          background-color: #afafaf;
        }

        .toolbar {
          min-width: 40px;
          max-width: 40px;
          width: 40px;
          overflow: hidden;
          background-color: white;
        }

        .toolbar > .colors {
          height: calc(100% - 50px);
          margin-right: calc((100% + 15px) * -1);
          padding-right: 40px;
          overflow-y: scroll;
        }

        #paintingarea {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 1vmax;
        }

        #canvas {
          background-color: white;
          touch-action: none;
        }
      </style>
      <div class="paint">
        <div class="toolbar">
          <div class="icon animated" on-click="${e => this._goToOverview()}">
            ${arrowBack}
          </div>
          <div class="colors">
          ${repeat(htmlcolors_hsl, (item, index) => 
          html`
            <div class="colorchooser animated" on-click="${e => this._setColor(item)}" selected?="${item === _color}">
              <div style="background-color: ${item};" class="shadow elevate"></div>
            </div>
          `)}
          </div>
        </div>
        <div id="paintingarea">
          <canvas id="canvas" class="shadow" width="${_canvasWidth}" height="${_canvasHeight}"></canvas>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      _painting: Object,
      _color: String,
      _canvasWidth: Number,
      _canvasHeight: Number
    }
  }

  _firstRendered() {
    super._firstRendered();
    waitForId(this.shadowRoot, 'canvas').then(canvas => {
      this._canvas = canvas;
      this._context = this._canvas.getContext('2d');
      this._setCanvasGeometry(this._canvas);
      this._setupPointerEvents(this._canvas);
      window.addEventListener('orientationchange', e => {
        console.log('orientaitonchange');
        this._setCanvasGeometry(this._canvas, e);
      });
    });
  }

  _didRender(props, changedProps, prevProps) {
    if(changedProps._painting) {
      waitForId(this.shadowRoot, 'canvas').then(canvas => {
        this._canvas = canvas;
        this._context = this._canvas.getContext("2d");
        this._context.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
        this._painting.draw(this._canvas);
        this._color = 'hsl(0, 0%, 0%)';
      });
    }
    super._didRender(props, changedProps, prevProps);
  }
  
  _stateChanged(state) {
    this._painting = paintingSelector(state);
  }

  _shouldPropertyChange(property, value, old) {
    if(property === '_canvasWidth' || property === '_canvasHeight') {
      console.log(property + ' ' + old + ' -> ' + value);
      return true;
    }
    
    return super._shouldPropertyChange(property, value, old);
  }

  async _setCanvasGeometry(canvas, event) {
    console.log(event);
    let paintingarea = this.shadowRoot.getElementById('paintingarea');

    await waitTillTrue(() => paintingarea.clientWidth && paintingarea.clientHeight);
    console.log('_setCanvasGeometry start ' + this._canvasWidth + ':' + this._canvasHeight);
    if(isLandscape(paintingarea.clientWidth, paintingarea.clientHeight)) {
      console.log('landscape');
      let areaWidth = paintingarea.clientWidth;
      let areaHeight = paintingarea.clientHeight;
      let scale = Math.min(areaWidth/297, areaHeight/210);
      this._canvasHeight = 210 * scale;
      this._canvasWidth = 297 * scale;
    } else {
      console.log('portrait');
      let areaWidth = paintingarea.clientWidth;
      let areaHeight = paintingarea.clientHeight;
      let scale = Math.min(areaWidth/210, areaHeight/297);
      this._canvasHeight = 297 * scale;
      this._canvasWidth = 210 * scale;
    }
    console.log('_setCanvasGeometry end ' + this._canvasWidth + ':' + this._canvasHeight);

  }

  _goToOverview() {
    this._context.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
    this._painting = undefined;
    store.dispatch(updateLocationURL('/'));
  }

  _setColor(color) {
    this._color = color;
  }

  _setupPointerEvents(canvas) {
      Gestures.addListener(this._canvas, 'track', e => this._handleTrack(e));
  }

  _handleTrack(event) {
    switch(event.detail.state) {
      case 'start':
        this._pointerDown(event);
        break;
      case 'track':
        this._pointerMove(event);
        break;
      case 'end':
        this._pointerUp(event);
        break;
    }
  }

  _pointerDown(event) {
    event.preventDefault();
    this._paint = true;

    var point = this._extractPoint(event);

    this._currentStroke = new Stroke(this._color);
    this._currentStroke.addPoint(point);

    this._context.strokeStyle = this._color;
    this._context.lineWidth = 4;
    this._context.beginPath();
    this._context.moveTo(point.x, point.y);
  }

  _pointerMove(event) {
    if(this._paint) {
      event.preventDefault();

      var point = this._extractPoint(event);
      this._currentStroke.addPoint(point);

      this._context.lineTo(point.x, point.y);
      this._context.stroke();
    }
  }

  _pointerUp(event) {
    event.preventDefault();
    this._paint = false;
    this._painting.addStroke(this._currentStroke);
    setTimeout(() => {
      this._painting.dataURL = this._canvas.toDataURL("image/png");
      store.dispatch(trigger());
    });
  }

  _extractPoint(event) {
    return {
      x: event.detail.x - this._canvas.offsetLeft,
      y: event.detail.y - this._canvas.offsetTop
    };
  }
}

window.customElements.define('paint-page', PaintPage);
