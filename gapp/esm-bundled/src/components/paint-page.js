import{html,repeat,PageViewElement,connect,store,paintingSelector,arrowBack,updateLocationURL,AnimatedStyles,ShadowStyles,isLandscape,Stroke}from"./my-app.js";import{trigger}from"../actions/painting.js";const htmlcolors={black:"#000000",silver:"#C0C0C0",gray:"#808080",grey:"#808080",white:"#FFFFFF",maroon:"#800000",red:"#FF0000",purple:"#800080",fuchsia:"#FF00FF",green:"#008000",lime:"#00FF00",olive:"#808000",yellow:"#FFFF00",navy:"#000080",blue:"#0000FF",teal:"#008080",aqua:"#00FFFF",darkblue:"#00008B",mediumblue:"#0000CD",darkgreen:"#006400",darkcyan:"#008B8B",deepskyblue:"#00BFFF",darkturquoise:"#00CED1",mediumspringgreen:"#00FA9A",springgreen:"#00FF7F",cyan:"#00FFFF",midnightblue:"#191970",dodgerblue:"#1E90FF",lightseagreen:"#20B2AA",forestgreen:"#228B22",seagreen:"#2E8B57",darkslategray:"#2F4F4F",darkslategrey:"#2F4F4F",limegreen:"#32CD32",mediumseagreen:"#3CB371",turquoise:"#40E0D0",royalblue:"#4169E1",steelblue:"#4682B4",darkslateblue:"#483D8B",mediumturquoise:"#48D1CC",indigo:"#4B0082",darkolivegreen:"#556B2F",cadetblue:"#5F9EA0",cornflowerblue:"#6495ED",rebeccapurple:"#663399",mediumaquamarine:"#66CDAA",dimgray:"#696969",dimgrey:"#696969",slateblue:"#6A5ACD",olivedrab:"#6B8E23",slategray:"#708090",slategrey:"#708090",lightslategray:"#778899",lightslategrey:"#778899",mediumslateblue:"#7B68EE",lawngreen:"#7CFC00",chartreuse:"#7FFF00",aquamarine:"#7FFFD4",skyblue:"#87CEEB",lightskyblue:"#87CEFA",blueviolet:"#8A2BE2",darkred:"#8B0000",darkmagenta:"#8B008B",saddlebrown:"#8B4513",darkseagreen:"#8FBC8F",lightgreen:"#90EE90",mediumpurple:"#9370DB",darkviolet:"#9400D3",palegreen:"#98FB98",darkorchid:"#9932CC",yellowgreen:"#9ACD32",sienna:"#A0522D",brown:"#A52A2A",darkgray:"#A9A9A9",darkgrey:"#A9A9A9",lightblue:"#ADD8E6",greenyellow:"#ADFF2F",paleturquoise:"#AFEEEE",lightsteelblue:"#B0C4DE",powderblue:"#B0E0E6",firebrick:"#B22222",darkgoldenrod:"#B8860B",mediumorchid:"#BA55D3",rosybrown:"#BC8F8F",darkkhaki:"#BDB76B",mediumvioletred:"#C71585",indianred:"#CD5C5C",peru:"#CD853F",chocolate:"#D2691E",tan:"#D2B48C",lightgray:"#D3D3D3",lightgrey:"#D3D3D3",thistle:"#D8BFD8",orchid:"#DA70D6",goldenrod:"#DAA520",palevioletred:"#DB7093",crimson:"#DC143C",gainsboro:"#DCDCDC",plum:"#DDA0DD",burlywood:"#DEB887",lightcyan:"#E0FFFF",lavender:"#E6E6FA",darksalmon:"#E9967A",violet:"#EE82EE",palegoldenrod:"#EEE8AA",lightcoral:"#F08080",khaki:"#F0E68C",aliceblue:"#F0F8FF",honeydew:"#F0FFF0",azure:"#F0FFFF",sandybrown:"#F4A460",wheat:"#F5DEB3",beige:"#F5F5DC",whitesmoke:"#F5F5F5",mintcream:"#F5FFFA",ghostwhite:"#F8F8FF",salmon:"#FA8072",antiquewhite:"#FAEBD7",linen:"#FAF0E6",lightgoldenrodyellow:"#FAFAD2",oldlace:"#FDF5E6",magenta:"#FF00FF",deeppink:"#FF1493",orangered:"#FF4500",tomato:"#FF6347",hotpink:"#FF69B4",coral:"#FF7F50",darkorange:"#FF8C00",lightsalmon:"#FFA07A",orange:"#FFA500",lightpink:"#FFB6C1",pink:"#FFC0CB",gold:"#FFD700",peachpuff:"#FFDAB9",navajowhite:"#FFDEAD",moccasin:"#FFE4B5",bisque:"#FFE4C4",mistyrose:"#FFE4E1",blanchedalmond:"#FFEBCD",papayawhip:"#FFEFD5",lavenderblush:"#FFF0F5",seashell:"#FFF5EE",cornsilk:"#FFF8DC",lemonchiffon:"#FFFACD",floralwhite:"#FFFAF0",snow:"#FFFAFA",lightyellow:"#FFFFE0",ivory:"#FFFFF0"},generate_htmlcolors_hsl=function(){let colors=["hsl(0, 0%, 0%)","hsl(0, 0%, 50%)","hsl(0, 0%, 100%)"],h=340;while(0<=h){colors.push("hsl("+h+", 100%, 50%)");h-=20}return colors},htmlcolors_hsl=generate_htmlcolors_hsl();var htmlcolors$1={htmlcolors:htmlcolors,htmlcolors_hsl:htmlcolors_hsl};function waitTillTrue(fn,...args){return new Promise(resolve=>{var intervalId=setInterval(()=>{let retVal=fn.apply(this,args);if(retVal){clearInterval(intervalId);resolve(retVal)}},50)})}var promises={waitTillTrue:waitTillTrue};function waitForId(root,id){return waitTillTrue((r,i)=>r.getElementById(i),root,id)}var elements={waitForId:waitForId};class PaintPage extends connect(store)(PageViewElement){_render({_painting,_color,_canvasWidth,_canvasHeight}){console.log("render: "+this._canvasWidth+":"+this._canvasHeight);return html`
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
          <div class="icon animated" on-click="${()=>this._goToOverview()}">
            ${arrowBack}
          </div>
          <div class="colors">
          ${repeat(htmlcolors_hsl,item=>html`
            <div class="colorchooser animated" on-click="${()=>this._setColor(item)}" selected?="${item===_color}">
              <div style="background-color: ${item};" class="shadow elevate"></div>
            </div>
          `)}
          </div>
        </div>
        <div id="paintingarea">
          <canvas id="canvas" class="shadow" width="${_canvasWidth}" height="${_canvasHeight}"
            onpointerdown="${e=>this._pointerDown(e)}"
            onpointermove="${e=>this._pointerMove(e)}"
            onpointerup="${e=>this._pointerUp(e)}"
            onpointercancel="${e=>this._pointerCancel(e)}"
          ></canvas>
        </div>
      </div>
    `}static get properties(){return{_painting:Object,_color:String,_canvasWidth:Number,_canvasHeight:Number}}_firstRendered(){super._firstRendered();waitForId(this.shadowRoot,"canvas").then(canvas=>{this._canvas=canvas;this._context=this._canvas.getContext("2d");this._setCanvasGeometry(this._canvas);window.addEventListener("orientationchange",e=>{console.log("orientaitonchange");this._setCanvasGeometry(this._canvas,e)})})}_didRender(props,changedProps,prevProps){if(changedProps._painting){waitForId(this.shadowRoot,"canvas").then(canvas=>{this._canvas=canvas;this._context=this._canvas.getContext("2d");this._context.clearRect(0,0,this._canvasWidth,this._canvasHeight);this._painting.draw(this._canvas);this._color="hsl(0, 0%, 0%)"})}super._didRender(props,changedProps,prevProps)}_stateChanged(state){this._painting=paintingSelector(state)}_shouldPropertyChange(property,value,old){if("_canvasWidth"===property||"_canvasHeight"===property){console.log(property+" "+old+" -> "+value);return!0}return super._shouldPropertyChange(property,value,old)}async _setCanvasGeometry(canvas,event){var _Mathmin=Math.min;console.log(event);let paintingarea=this.shadowRoot.getElementById("paintingarea");console.log("_setCanvasGeometry start "+this._canvasWidth+":"+this._canvasHeight);if(isLandscape()){await waitTillTrue(()=>isLandscape(paintingarea.clientWidth,paintingarea.clientHeight));console.log("landscape");let areaWidth=paintingarea.clientWidth,areaHeight=paintingarea.clientHeight,scale=_Mathmin(areaWidth/297,areaHeight/210);this._canvasHeight=210*scale;this._canvasWidth=297*scale}else{await waitTillTrue(()=>!isLandscape(paintingarea.clientWidth,paintingarea.clientHeight));console.log("portrait");let areaWidth=paintingarea.clientWidth,areaHeight=paintingarea.clientHeight,scale=_Mathmin(areaWidth/210,areaHeight/297);this._canvasHeight=297*scale;this._canvasWidth=210*scale}console.log("_setCanvasGeometry end "+this._canvasWidth+":"+this._canvasHeight)}_goToOverview(){this._context.clearRect(0,0,this._canvasWidth,this._canvasHeight);this._painting=void 0;store.dispatch(updateLocationURL("/"))}_setColor(color){this._color=color}_pointerDown(event){event.preventDefault();this._paint=!0;var point=this._extractPoint(event);this._currentStroke=new Stroke(this._color);this._currentStroke.addPoint(point);this._context.strokeStyle=this._color;this._context.lineWidth=4;this._context.beginPath();this._context.moveTo(point.x,point.y)}_pointerMove(event){if(this._paint){event.preventDefault();var point=this._extractPoint(event);this._currentStroke.addPoint(point);this._context.lineTo(point.x,point.y);this._context.stroke()}}_pointerUp(event){event.preventDefault();this._paint=!1;this._painting.addStroke(this._currentStroke);setTimeout(()=>{this._painting.dataURL=this._canvas.toDataURL("image/png");store.dispatch(trigger())})}_pointerCancel(event){this._pointerUp(event)}_extractPoint(event){return{x:event.pageX-this._canvas.offsetLeft,y:event.pageY-this._canvas.offsetTop}}}window.customElements.define("paint-page",PaintPage);export{htmlcolors$1 as $htmlcolors,elements as $elements,promises as $promises,htmlcolors,htmlcolors_hsl,waitForId,waitTillTrue};