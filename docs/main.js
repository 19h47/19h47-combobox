!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Combobox=t():e.Combobox=t()}(window,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=11)}([function(e,t){e.exports=function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}},function(e,t){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},function(e,t,n){window,e.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t),n.d(t,"BACKSPACE",(function(){return r})),n.d(t,"TAB",(function(){return i})),n.d(t,"ENTER",(function(){return o})),n.d(t,"SHIFT",(function(){return s})),n.d(t,"ESCAPE",(function(){return u})),n.d(t,"SPACE",(function(){return c})),n.d(t,"PAGE_UP",(function(){return l})),n.d(t,"PAGE_DOWN",(function(){return a})),n.d(t,"END",(function(){return f})),n.d(t,"HOME",(function(){return d})),n.d(t,"ARROW_LEFT",(function(){return h})),n.d(t,"ARROW_UP",(function(){return p})),n.d(t,"ARROW_RIGHT",(function(){return v})),n.d(t,"ARROW_DOWN",(function(){return y})),n.d(t,"DELETE",(function(){return b}));var r=8,i=9,o=13,s=16,u=27,c=32,l=33,a=34,f=35,d=36,h=37,p=38,v=39,y=40,b=46}])},function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},function(e,t){function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}e.exports=function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}},function(e,t){function n(t){return e.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},n(t)}e.exports=n},function(e,t,n){var r=n(9);e.exports=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&r(e,t)}},function(e,t,n){var r=n(10),i=n(0);e.exports=function(e,t){return!t||"object"!==r(t)&&"function"!=typeof t?i(e):t}},function(e,t,n){"use strict";var r,i="object"==typeof Reflect?Reflect:null,o=i&&"function"==typeof i.apply?i.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};r=i&&"function"==typeof i.ownKeys?i.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var s=Number.isNaN||function(e){return e!=e};function u(){u.init.call(this)}e.exports=u,e.exports.once=function(e,t){return new Promise((function(n,r){function i(){void 0!==o&&e.removeListener("error",o),n([].slice.call(arguments))}var o;"error"!==t&&(o=function(n){e.removeListener(t,i),r(n)},e.once("error",o)),e.once(t,i)}))},u.EventEmitter=u,u.prototype._events=void 0,u.prototype._eventsCount=0,u.prototype._maxListeners=void 0;var c=10;function l(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function a(e){return void 0===e._maxListeners?u.defaultMaxListeners:e._maxListeners}function f(e,t,n,r){var i,o,s,u;if(l(n),void 0===(o=e._events)?(o=e._events=Object.create(null),e._eventsCount=0):(void 0!==o.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),o=e._events),s=o[t]),void 0===s)s=o[t]=n,++e._eventsCount;else if("function"==typeof s?s=o[t]=r?[n,s]:[s,n]:r?s.unshift(n):s.push(n),(i=a(e))>0&&s.length>i&&!s.warned){s.warned=!0;var c=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");c.name="MaxListenersExceededWarning",c.emitter=e,c.type=t,c.count=s.length,u=c,console&&console.warn&&console.warn(u)}return e}function d(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function h(e,t,n){var r={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},i=d.bind(r);return i.listener=n,r.wrapFn=i,i}function p(e,t,n){var r=e._events;if(void 0===r)return[];var i=r[t];return void 0===i?[]:"function"==typeof i?n?[i.listener||i]:[i]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(i):y(i,i.length)}function v(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function y(e,t){for(var n=new Array(t),r=0;r<t;++r)n[r]=e[r];return n}Object.defineProperty(u,"defaultMaxListeners",{enumerable:!0,get:function(){return c},set:function(e){if("number"!=typeof e||e<0||s(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");c=e}}),u.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},u.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||s(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},u.prototype.getMaxListeners=function(){return a(this)},u.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var r="error"===e,i=this._events;if(void 0!==i)r=r&&void 0===i.error;else if(!r)return!1;if(r){var s;if(t.length>0&&(s=t[0]),s instanceof Error)throw s;var u=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw u.context=s,u}var c=i[e];if(void 0===c)return!1;if("function"==typeof c)o(c,this,t);else{var l=c.length,a=y(c,l);for(n=0;n<l;++n)o(a[n],this,t)}return!0},u.prototype.addListener=function(e,t){return f(this,e,t,!1)},u.prototype.on=u.prototype.addListener,u.prototype.prependListener=function(e,t){return f(this,e,t,!0)},u.prototype.once=function(e,t){return l(t),this.on(e,h(this,e,t)),this},u.prototype.prependOnceListener=function(e,t){return l(t),this.prependListener(e,h(this,e,t)),this},u.prototype.removeListener=function(e,t){var n,r,i,o,s;if(l(t),void 0===(r=this._events))return this;if(void 0===(n=r[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete r[e],r.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(i=-1,o=n.length-1;o>=0;o--)if(n[o]===t||n[o].listener===t){s=n[o].listener,i=o;break}if(i<0)return this;0===i?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,i),1===n.length&&(r[e]=n[0]),void 0!==r.removeListener&&this.emit("removeListener",e,s||t)}return this},u.prototype.off=u.prototype.removeListener,u.prototype.removeAllListeners=function(e){var t,n,r;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var i,o=Object.keys(n);for(r=0;r<o.length;++r)"removeListener"!==(i=o[r])&&this.removeAllListeners(i);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(r=t.length-1;r>=0;r--)this.removeListener(e,t[r]);return this},u.prototype.listeners=function(e){return p(this,e,!0)},u.prototype.rawListeners=function(e){return p(this,e,!1)},u.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):v.call(e,t)},u.prototype.listenerCount=v,u.prototype.eventNames=function(){return this._eventsCount>0?r(this._events):[]}},function(e,t){function n(t,r){return e.exports=n=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},n(t,r)}e.exports=n},function(e,t){function n(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=n=function(e){return typeof e}:e.exports=n=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(t)}e.exports=n},function(e,t,n){"use strict";n.r(t);var r=n(1),i=n.n(r),o=n(3),s=n.n(o),u=n(4),c=n.n(u),l=n(0),a=n.n(l),f=n(6),d=n.n(f),h=n(7),p=n.n(h),v=n(5),y=n.n(v),b=n(8),m=n(2),x=function(){function e(t,n,r){s()(this,e),this.id="".concat(r,"-result-").concat(t),this.class="list-group-item list-group-item-action ".concat(r,"-result"),this["aria-posinset"]=t+1,this.role="option",t===n&&(this["aria-selected"]="true")}return c()(e,[{key:"toString",value:function(){var e=this;return Object.keys(this).reduce((function(t,n){return"".concat(t," ").concat(n,'="').concat(e[n],'"')}),"")}}]),e}(),g=function(e){return"function"==typeof(null==e?void 0:e.then)};function L(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=y()(e);if(t){var i=y()(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return p()(this,n)}}var _=function(e){d()(n,e);var t=L(n);function n(e,r,i){var o,u=i.search,c=i.autoselect,l=void 0!==c&&c,f=i.getResultValue,d=void 0===f?function(e){return e}:f;return s()(this,n),(o=t.call(this)).$input=e,o.$listbox=r,o.selectedIndex=-1,o.results=[],o.value="",o.search=g(u)?u:function(e){return Promise.resolve(u(e))},o.getResultValue=d,o.autoselect=l,o.handleKeydown=o.handleKeydown.bind(a()(o)),o.handleInput=o.handleInput.bind(a()(o)),o.handleClick=o.handleClick.bind(a()(o)),o.handleFocus=o.handleFocus.bind(a()(o)),o.handleBlur=o.handleBlur.bind(a()(o)),o.handleMousedown=o.handleMousedown.bind(a()(o)),o.handleDocumentClick=o.handleDocumentClick.bind(a()(o)),o.select=o.select.bind(a()(o)),o}return c()(n,[{key:"init",value:function(){this.update(),this.initEvents()}},{key:"initEvents",value:function(){document.body.addEventListener("click",this.handleDocumentClick),this.$input.addEventListener("keydown",this.handleKeydown),this.$input.addEventListener("input",this.handleInput),this.$input.addEventListener("focus",this.handleFocus),this.$input.addEventListener("blur",this.handleBlur),this.$listbox.addEventListener("mousedown",this.handleMousedown),this.$listbox.addEventListener("click",this.handleClick)}},{key:"handleDocumentClick",value:function(e){var t=e.target;this.$input.contains(t)||this.$listbox.contains(t)||this.hideListbox()}},{key:"handleMousedown",value:function(e){e.preventDefault()}},{key:"handleKeydown",value:function(e){var t,n=this,r=e.keyCode,o=(t={},i()(t,m.ENTER,(function(){n.select(),n.emit("Combobox.onsubmit",{selectedResult:n.results[n.selectedIndex]})})),i()(t,m.ARROW_DOWN,(function(){n.selectedIndex=n.selectedIndex+1>n.results.length-1?0:n.selectedIndex+1,e.preventDefault(),n.handleUpdate(n.results,n.selectedIndex)})),i()(t,m.ARROW_UP,(function(){n.selectedIndex=0>n.selectedIndex-1?n.results.length-1:n.selectedIndex-1,e.preventDefault(),n.handleUpdate(n.results,n.selectedIndex)})),i()(t,m.ESCAPE,(function(){n.hideListbox(),n.setValue()})),i()(t,m.TAB,this.select),i()(t,"default",(function(){return!1})),t);return(o[r]||o.default)()}},{key:"handleInput",value:function(e){var t=e.target.value;this.updateListbox(t),this.value=t}},{key:"handleClick",value:function(e){var t=e.target;console.info("🚩 Combobox.handleClick");var n=t.closest("[aria-posinset]");n&&(this.selectedIndex=parseInt(n.getAttribute("aria-posinset")-1,10),this.select(),this.emit("Combobox.onsubmit",{selectedResult:this.results[this.selectedIndex]}))}},{key:"handleFocus",value:function(e){var t=e.target.value;this.updateListbox(t),this.value=t}},{key:"handleBlur",value:function(){this.hideListbox()}},{key:"handleUpdate",value:function(e,t){var n=this;this.$listbox.innerHTML="",e.forEach((function(e,r){var i=new x(r,t,"Combobox"),o=n.renderResult(e,i);n.$listbox.insertAdjacentHTML("beforeend",o)})),this.$input.setAttribute("aria-activedescendant",-1<t?"".concat("Combobox","-result-").concat(t):""),this.emit("Combobox.onupdate",{results:e,selectedIndex:t})}},{key:"handleLoading",value:function(){this.loading=!0,this.update()}},{key:"handleLoaded",value:function(){this.loading=!1,this.update()}},{key:"setValue",value:function(e){this.$input.value=e}},{key:"select",value:function(){var e=this.results[this.selectedIndex];e&&this.setValue(e),this.hideListbox()}},{key:"updateListbox",value:function(e){var t=this;this.emit("Combobox.onloading"),this.search(e).then((function(e){t.results=e,t.emit("Combobox.onloaded"),0!==t.results.length?(t.selectedIndex=t.autoselect?0:-1,t.handleUpdate(t.results,t.selectedIndex),t.showListbox()):t.hideListbox()}))}},{key:"showListbox",value:function(){this.$input.setAttribute("aria-expanded",!0),this.show()}},{key:"hideListbox",value:function(){var e=this.results[this.selectedIndex];this.autoselect&&e&&this.setValue(e),this.selectedIndex=-1,this.results=[],this.$input.setAttribute("aria-expanded",!1),this.$input.setAttribute("aria-activedescendant",""),this.handleUpdate(this.results,this.selectedIndex),this.hide()}},{key:"renderResult",value:function(e,t){return"<li ".concat(t,">").concat(this.getResultValue(e),"</li>")}},{key:"show",value:function(){this.expanded=!0,this.update()}},{key:"hide",value:function(){this.expanded=!1,this.update()}},{key:"update",value:function(){}}]),n}(b.EventEmitter);t.default=_}])}));