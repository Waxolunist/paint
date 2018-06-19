import{html,repeat,PageViewElement,connect,store,AnimatedStyles,ShadowStyles,closeIcon,imageIcon,innerWidth,outerWidth}from"./my-app.js";import{addPainting,openPainting,removePainting}from"../actions/painting.js";class OverviewPage extends connect(store)(PageViewElement){_render({_overviewWidth,_paintings}){return html`
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
          background-color: #e3ecff;
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
          <div class="painting add shadow animated elevate" on-click="${()=>this._addPainting()}">
            <div class="add">${imageIcon}</div>
          </div>
          ${repeat(_paintings,item=>html`
            <div class="painting shadow animated elevate" on-click="${()=>this._openPainting(item.id)}">
              <div class="close shadow animated" on-click="${e=>this._removePainting(e,item.id)}">${closeIcon}</div>
              <img src="${item.dataURL}" />
            </div>
          `)}
        </div>
      </div>
    `}static get properties(){return{_overviewWidth:Number,_paintings:Array}}ready(){super.ready();window.addEventListener("resize",()=>this._calcWidth())}_firstRendered(){super._firstRendered();setTimeout(()=>this._calcWidth(),0)}_stateChanged(state){this._paintings=state.paint.paintings}_calcWidth(){let maxWidth=innerWidth(this.shadowRoot.getElementById("wrapper")),paintingWidth=outerWidth(this.shadowRoot.querySelector(".painting")),divsPerRow=Math.floor(maxWidth/paintingWidth);this._overviewWidth=paintingWidth*divsPerRow}_openPainting(paintingid){store.dispatch(openPainting(paintingid))}_addPainting(){store.dispatch(addPainting())}_removePainting(event,paintingid){event.stopPropagation();store.dispatch(removePainting(paintingid))}}window.customElements.define("overview-page",OverviewPage);