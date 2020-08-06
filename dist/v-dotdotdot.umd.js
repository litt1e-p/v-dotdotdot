!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self)["v-dotdotdot"]={})}(this,(function(t){"use strict";function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function i(t){return function(t){if(Array.isArray(t))return o(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return o(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}function a(t,e){e=e||{};var n,i=window,o={clamp:e.clamp||2,useNativeClamp:void 0===e.useNativeClamp||e.useNativeClamp,splitOnChars:e.splitOnChars||[".","-","–","—"," "],animate:e.animate||!1,truncationChar:void 0===e.truncationChar?"…":e.truncationChar,truncationHTML:e.truncationHTML,originText:e.originText||t.innerHTML,deltaHeightClass:void 0!==e.deltaHeightClass?e.deltaHeightClass:""},a=t.style,r=o.originText,l=void 0!==t.style.webkitLineClamp,s=o.clamp,u=s.indexOf&&(s.indexOf("px")>-1||s.indexOf("em")>-1);function d(t,e){return i.getComputedStyle||(i.getComputedStyle=function(t,e){return this.el=t,this.getPropertyValue=function(e){var n=/(\-([a-z]){1})/g;return"float"==e&&(e="styleFloat"),n.test(e)&&(e=e.replace(n,(function(){return arguments[2].toUpperCase()}))),t.currentStyle&&t.currentStyle[e]?t.currentStyle[e]:null},this}),i.getComputedStyle(t,null).getPropertyValue(e)}function c(e){var n=e||t.clientHeight,i=h(t);return Math.max(Math.floor(n/i),0)}function h(t){var e=d(t,"line-height");return"normal"==e&&(e=1.2*parseInt(d(t,"font-size"))),parseInt(e)}o.truncationHTML&&((n=document.createElement("span")).innerHTML=o.truncationHTML);var p,m,v,f=o.splitOnChars.slice(0),_=f[0];function y(e){return e.lastChild.children&&e.lastChild.children.length>0?y(Array.prototype.slice.call(e.children).pop()):e.lastChild&&e.lastChild.nodeValue&&""!=e.lastChild.nodeValue&&e.lastChild.nodeValue!=o.truncationChar?e.lastChild:(e.lastChild.parentNode.removeChild(e.lastChild),y(t))}function g(t,e){t.nodeValue=e+o.truncationChar}return"auto"==s?s=c():u&&(s=c(parseInt(s))),l&&o.useNativeClamp?(a.overflow="hidden",a.textOverflow="ellipsis",a.webkitBoxOrient="vertical",a.display="-webkit-box",a.webkitLineClamp=s,u&&(a.height=o.clamp+"px")):requestAnimationFrame((function(){var e=0;o.deltaHeightClass&&(e=function(){var t=document.createDocumentFragment(),e=document.createElement("em");e.setAttribute("class",o.deltaHeightClass.join(" ")),e.style.cssText="visibility: hidden;",t.appendChild(e),document.body.append(t);var n=parseFloat(d(e,"height"))+parseFloat(d(e,"margin-top"))+parseFloat(d(e,"margin-bottom"))+parseFloat(d(e,"padding-top"))+parseFloat(d(e,"padding-bottom"))+parseFloat(window.getComputedStyle(e,":before").height);return document.body.removeChild(e),n}());var i,a=(i=s,h(t)*i+e);a<=t.clientHeight&&(v=function e(i,a){if(a){var r=o.truncationChar.length?i.nodeValue.replace(o.truncationChar,""):i.nodeValue;if(p||(_=f.length>0?f.shift():"",p=r.split(_)),p.length>1?(m=p.pop(),g(i,p.join(_))):p=null,n&&(i.nodeValue=i.nodeValue.replace(o.truncationChar,""),t.innerHTML=i.nodeValue+" "+n.innerHTML+o.truncationChar),p){if(t.clientHeight<=a){if(!(f.length>=0&&""!=_))return t.innerHTML;g(i,p.join(_)+_+m),p=null}}else""==_&&(g(i,""),i=y(t),f=o.splitOnChars.slice(0),_=f[0],p=null,m=null);if(!o.animate)return e(i,a);setTimeout((function(){e(i,a)}),!0===o.animate?10:o.animate)}}(y(t),a))}),20),{original:r,clamped:v}}function r(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return d(e?/^\d+(\.|\.\d+)?$/g:/^\-?\d+(\.|\.\d+)?$/g,t)}function l(t){return["true","false"].includes(String(t))}function s(t){return["text","icon"].includes(t)}function u(t){return"[object String]"===Object.prototype.toString.call(t)}function d(t,e){return t.test(e)}var c=function(){function t(n){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};e(this,t),this._$el=n,this._$usrOpts=o,this._init(i),this._beforeMount(),this._$tpl=this._createElements(),this._$tplx=this._$tpl.innerText,this._mount()}var o,c,h;return o=t,h=[{key:"filterOpts",value:function(t,e){var n=void 0,i=void 0,o=void 0,a=void 0,d=void 0,c=void 0;return t&&t.hasOwnProperty("moreType")?d=s(t.moreType)?t.moreType:void 0:void 0===d&&e&&e.hasOwnProperty("moreType")&&(d=s(e.moreType)?e.moreType:void 0),t&&t.hasOwnProperty("moreText")?i=u(t.moreText)?t.moreText:i:void 0===i&&e&&e.hasOwnProperty("moreText")&&(i=u(e.moreText)?e.moreText:i),t&&t.hasOwnProperty("useBuiltIns")?a=l(t.useBuiltIns)?t.useBuiltIns:void 0:void 0===a&&e&&e.hasOwnProperty("useBuiltIns")&&(a=l(e.useBuiltIns)?e.useBuiltIns:void 0),t&&t.hasOwnProperty("className")?o=u(t.className)?t.className:void 0:void 0===o&&e&&e.hasOwnProperty("className")&&(o=u(e.className)?e.className:void 0),t&&t.hasOwnProperty("line")?n=r(t.line)?t.line:void 0:void 0===n&&e&&e.hasOwnProperty("line")&&(n=r(e.line)?e.line:void 0),t&&t.hasOwnProperty("disableAutoDot")?c=l(t.disableAutoDot)?t.disableAutoDot:void 0:void 0===c&&e&&e.hasOwnProperty("disableAutoDot")&&(c=l(e.disableAutoDot)?e.disableAutoDot:void 0),{_$line:n=+(+(n=void 0===n||n<0?0:n)).toFixed(0),_$className:void 0!==o?o:"",_$defaultClassName:"dotdotdot__vm",_$defaultMoreClassName:"text"===(d=void 0!==d?d:"text")?"dotdotdot-text-more":"dotdotdot-icon-more",_$useBuiltIns:void 0!==a&&a,_$moreType:d,_$moreText:void 0!==i?i:"show more",_$autoDot:void 0===c||!c}}}],(c=[{key:"destroy",value:function(){this._unmount()}},{key:"update",value:function(t,e,n){t&&t.children&&1===t.children.length&&n&&n.children&&1===n.children.length&&(this._init(e),this._replaceMount(this._createElements(t.children[0],n.children[0].text,!0)))}},{key:"_beforeMount",value:function(){var t="";if(this._$el?this._$el.childElementCount>0&&(t="element's child node can not exist when use v-dotdotdot"):t="element must exists which mounted in Dotdotdot",t)throw new Error(t);return!0}},{key:"_mount",value:function(){this._$tpl&&this._$el&&this._$el.insertAdjacentElement("afterbegin",this._$tpl)}},{key:"_unmount",value:function(){this._unbind(this._$el.getElementsByClassName(this._opts._$defaultClassName)[0]),this._$tpl&&this._$tpl.parentNode&&this._$tpl.parentNode.removeChild(this._$tpl)}},{key:"_unbind",value:function(t){t.binded&&t.removeEventListener("click",this._eventClosure)}},{key:"_replaceMount",value:function(t){this._$tpl&&this._$el&&(this._$el.replaceChild(t,this._$tpl),this._$tpl=t,this._$tplx=this._$tpl.innerText)}},{key:"_createElements",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=e||this._$el.innerText,o=t;return t||(o=document.createElement("div"),this._$el.innerText=null),this._cla(o,this._opts._$className),this._cla(o,this._opts._$defaultClassName),o.innerText=i,this._opts._$line>0&&this._eventBind(o,n),o}},{key:"_useStyle",value:function(t){var e=d(/\-webkit\-line\-clamp:\s+\d+/g,t.style.cssText);t.style.cssText="overflow: ".concat(e?"unset":"hidden",";text-overflow: ").concat(e?"unset":"ellipsis",";-webkit-line-clamp: ").concat(e?"unset":this._opts._$line,";-webkit-box-orient: ").concat(e?"unset":"vertical",";display: ").concat(e?"unset":"-webkit-box",";")}},{key:"_useClamp",value:function(t){var e=t.getElementsByClassName(this._opts._$defaultMoreClassName).length;if(e)return this._replaceMount(this._createElements(t,this._$tplx));var n={clamp:e?0:this._opts._$line,truncationChar:"",truncationHTML:'...<em class="'.concat(this._opts._$defaultMoreClassName,'">').concat("text"===this._opts._$moreType?this._opts._$moreText:"","</em>"),useNativeClamp:!1,animate:!1};return a.apply(this,[t,Object.assign(n,{originText:this._$tplx,deltaHeightClass:"text"===this._opts._$moreType?"":[this._opts._$defaultMoreClassName,this._opts._$className]})])}},{key:"_toggle",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e?this._useStyle.apply(this,arguments):this._useClamp.apply(this,arguments)}},{key:"_eventClosure",value:function(t,e){t.stopPropagation(),this._toggle(e||t.target,this._opts._$useBuiltIns)}},{key:"_eventBind",value:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(t&&(!t.binded||n)&&(this._unbind(t),this._eventClosure=this._eventClosure.bind(this),t.addEventListener("click",this._eventClosure),t.binded=!0,this._opts._$autoDot)){var o=Array.prototype.slice.call(arguments);Array.prototype.pop.apply(o),requestAnimationFrame((function(){return e._toggle.apply(e,[].concat(i(o),[e._opts._$useBuiltIns]))}),0)}}},{key:"_cla",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if("string"==typeof e&&t&&this._isElement(t)&&t.classList)if(n){var i=t.classList.value.replace(this.options.class,e);this._setAttr(t,"class",i)}else t.classList.add(e)}},{key:"_isElement",value:function(t){return t instanceof window.Element}},{key:"_init",value:function(e){this._opts=t.filterOpts(e,this._$usrOpts)}}])&&n(o.prototype,c),h&&n(o,h),t}();c.install=function(t,e){t.directive("dotdotdot",{bind:function(t,n,i){t.dotdotdot?t.dotdotdot.update(t,n.value):t.dotdotdot=new c(t,n.value,e)},update:function(t,e,n){t.dotdotdot&&t.dotdotdot.update(t,e.value,n)},unbind:function(t){t.dotdotdot.destroy()}})},t.Dotdotdot=c,t.default=c,Object.defineProperty(t,"__esModule",{value:!0})}));
