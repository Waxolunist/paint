define(["./my-app.js","../actions/painting.js"],function(_myApp,_painting){"use strict";var _templateObject_d47d222070a711e8ad63dbb32815d43a=babelHelpers.taggedTemplateLiteral(["\n      ","\n      ","\n      <style>\n\n        :host {\n          --painting-width: 210;\n          --painting-height: 297;\n          --painting-scalefactor: 1.2;\n          --painting-margin: 10;\n          --overview-columns: 4;\n          --icon-size: 30;\n          display: block;\n          width: 100%;\n          background-color: #e3ecff;\n        }\n\n        #wrapper {\n          width: 100%;\n          overflow-y: scroll;\n          padding-top: 20px;\n          padding-bottom: 20px;\n          height: 100%;\n          box-sizing: border-box;\n        }\n\n        .overview {\n          display: flex;\n          flex-wrap: wrap;\n          margin: auto;\n        }\n\n        .painting {\n          width: calc(var(--painting-width) / var(--painting-scalefactor) * 1px);\n          height: calc(var(--painting-height) / var(--painting-scalefactor) * 1px);\n          margin: calc(var(--painting-margin) * 1px);\n          background-color: white;\n          position: relative;\n        }\n\n        .painting > img {\n          width: 100%;\n          height: 100%;\n        }\n\n        .painting > .close {\n          width: calc(var(--icon-size) * 1px);\n          height: calc(var(--icon-size) * 1px);\n          border-radius: calc(var(--icon-size) * 1px);\n          position: absolute;\n          top: calc(var(--icon-size) / 2 * -1px);\n          left: calc((var(--painting-width) / var(--painting-scalefactor) - var(--icon-size) / 2) * 1px);\n          background-color: white;\n          transition-property: transform;\n          transform: scale(1);\n          will-change: transform;\n        }\n\n        .painting > .close:hover {\n          transform: scale(1.2);\n        }\n\n        .painting > .close > svg {\n          width: calc(var(--icon-size) * 1px);\n          height: calc(var(--icon-size) * 1px);\n        }\n\n        .painting.add {\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          background-color: lightgray;\n        }\n\n        .painting > .add {\n          width: 95%;\n          height: 95%;\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          border: 10px dashed #ffffef;\n          box-sizing: border-box;\n          background-color: #lightgray;\n        }\n\n        .painting > .add > svg {\n          width: calc(var(--icon-size) * 4px);\n          height: calc(var(--icon-size) * 4px);\n          fill: #ffffef;\n        }\n\n        @media screen and (max-width: 400px) {\n          :host {\n            --painting-scalefactor: 1.5;\n            --icon-size: 25;\n          }\n        }\n      </style>\n      <div id=\"wrapper\">\n        <div class=\"overview\" id=\"overview\" style=\"width: ","px;\">\n          <div class=\"painting add shadow animated elevate\" on-click=\"","\">\n            <div class=\"add\">","</div>\n          </div>\n          ","\n        </div>\n      </div>\n    "]),_templateObject2_d47d222070a711e8ad63dbb32815d43a=babelHelpers.taggedTemplateLiteral(["\n            <div class=\"painting shadow animated elevate\" on-click=\"","\">\n              <div class=\"close shadow animated\" on-click=\"","\">","</div>\n              <img src=\"","\" />\n            </div>\n          "]),OverviewPage=function(_connect){babelHelpers.inherits(OverviewPage,_connect);function OverviewPage(){babelHelpers.classCallCheck(this,OverviewPage);return babelHelpers.possibleConstructorReturn(this,(OverviewPage.__proto__||Object.getPrototypeOf(OverviewPage)).apply(this,arguments))}babelHelpers.createClass(OverviewPage,[{key:"_render",value:function _render(_ref){var _this=this,_overviewWidth=_ref._overviewWidth,_paintings=_ref._paintings;return(0,_myApp.html)(_templateObject_d47d222070a711e8ad63dbb32815d43a,_myApp.AnimatedStyles,_myApp.ShadowStyles,_overviewWidth,function(){return _this._addPainting()},_myApp.imageIcon,(0,_myApp.repeat)(_paintings,function(item){return(0,_myApp.html)(_templateObject2_d47d222070a711e8ad63dbb32815d43a,function(){return _this._openPainting(item.id)},function(e){return _this._removePainting(e,item.id)},_myApp.closeIcon,item.dataURL)}))}},{key:"ready",value:function ready(){var _this2=this;babelHelpers.get(OverviewPage.prototype.__proto__||Object.getPrototypeOf(OverviewPage.prototype),"ready",this).call(this);window.addEventListener("resize",function(){return _this2._calcWidth()})}},{key:"_firstRendered",value:function _firstRendered(){var _this3=this;babelHelpers.get(OverviewPage.prototype.__proto__||Object.getPrototypeOf(OverviewPage.prototype),"_firstRendered",this).call(this);setTimeout(function(){return _this3._calcWidth()},0)}},{key:"_stateChanged",value:function _stateChanged(state){this._paintings=state.paint.paintings}},{key:"_calcWidth",value:function _calcWidth(){var maxWidth=(0,_myApp.innerWidth)(this.shadowRoot.getElementById("wrapper")),paintingWidth=(0,_myApp.outerWidth)(this.shadowRoot.querySelector(".painting")),divsPerRow=Math.floor(maxWidth/paintingWidth);this._overviewWidth=paintingWidth*divsPerRow}},{key:"_openPainting",value:function _openPainting(paintingid){_myApp.store.dispatch((0,_painting.openPainting)(paintingid))}},{key:"_addPainting",value:function _addPainting(){_myApp.store.dispatch((0,_painting.addPainting)())}},{key:"_removePainting",value:function _removePainting(event,paintingid){event.stopPropagation();_myApp.store.dispatch((0,_painting.removePainting)(paintingid))}}],[{key:"properties",get:function get(){return{_overviewWidth:Number,_paintings:Array}}}]);return OverviewPage}((0,_myApp.connect)(_myApp.store)(_myApp.PageViewElement));window.customElements.define("overview-page",OverviewPage)});