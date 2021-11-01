/* eslint-disable brace-style */
/* eslint-disable eqeqeq */
export default function clamp (element, options) {
  options = options || {}
  var win = window
  var opt = {
    clamp: options.clamp || 2,
    useNativeClamp: typeof (options.useNativeClamp) !== 'undefined' ? options.useNativeClamp : true,
    splitOnChars: options.splitOnChars || ['.', '-', '–', '—', ' '],
    animate: options.animate || false,
    truncationChar: options.truncationChar === void 0 ? '…' : options.truncationChar,
    truncationHTML: options.truncationHTML,
    originText: options.originText || element.innerHTML,
    tails: options.tails,
    deltaHeightClass: options.deltaHeightClass === void 0 ? [] : options.deltaHeightClass,
    transitClass: options.transitClass || ''
  }
  var sty = element.style
  var originalText = opt.originText
  var supportsNativeClamp = typeof (element.style.webkitLineClamp) !== 'undefined'
  var clampValue = opt.clamp
  var isCSSValue = clampValue.indexOf && (clampValue.indexOf('px') > -1 || clampValue.indexOf('em') > -1)
  var truncationHTMLContainer
  if (opt.truncationHTML) {
    truncationHTMLContainer = document.createElement('span')
    truncationHTMLContainer.innerHTML = opt.truncationHTML
  }
  function computeStyle (elem, prop) {
    if (!win.getComputedStyle) {
      win.getComputedStyle = function (el, pseudo) {
        this.el = el
        this.getPropertyValue = function (prop) {
          // eslint-disable-next-line no-useless-escape
          var re = /(\-([a-z]){1})/g
          if (prop == 'float') prop = 'styleFloat'
          if (re.test(prop)) {
            prop = prop.replace(re, function () {
              return arguments[2].toUpperCase()
            })
          }
          return el.currentStyle && el.currentStyle[prop] ? el.currentStyle[prop] : null
        }
        return this
      }
    }
    return win.getComputedStyle(elem, null).getPropertyValue(prop)
  }
  function getMaxLines (height) {
    var availHeight = height || element.clientHeight
    var lineHeight = getLineHeight(element)

    return Math.max(Math.floor(availHeight / lineHeight), 0)
  }
  function getMaxHeight (clmp) {
    var lineHeight = getLineHeight(element)
    return lineHeight * clmp
  }
  function getLineHeight (elem) {
    var lh = computeStyle(elem, 'line-height')
    if (lh == 'normal') {
      lh = parseInt(computeStyle(elem, 'font-size')) * 1.2
    }
    return parseInt(lh)
  }
  var splitOnChars = opt.splitOnChars.slice(0)
  var splitChar = splitOnChars[0]
  var chunks
  var lastChunk
  function getLastChild (elem) {
    if (elem.lastChild.children && elem.lastChild.children.length > 0) {
      return getLastChild(Array.prototype.slice.call(elem.children).pop())
    }
    else if (!elem.lastChild || !elem.lastChild.nodeValue || elem.lastChild.nodeValue == '' || elem.lastChild.nodeValue == opt.truncationChar) {
      elem.lastChild.parentNode.removeChild(elem.lastChild)
      return getLastChild(element)
    }
    else {
      return elem.lastChild
    }
  }
  function truncate (target, maxHeight) {
    if (!maxHeight) { return }
    function reset () {
      splitOnChars = opt.splitOnChars.slice(0)
      splitChar = splitOnChars[0]
      chunks = null
      lastChunk = null
    }
    var nodeValue = opt.truncationChar.length ? target.nodeValue.replace(opt.truncationChar, '') : target.nodeValue
    if (!chunks) {
      if (splitOnChars.length > 0) {
        splitChar = splitOnChars.shift()
      }
      else {
        splitChar = ''
      }
      chunks = nodeValue.split(splitChar)
    }
    if (chunks.length > 1) {
      lastChunk = chunks.pop()
      applyEllipsis(target, chunks.join(splitChar))
    }
    else {
      chunks = null
    }
    if (truncationHTMLContainer) {
      target.nodeValue = target.nodeValue.replace(opt.truncationChar, '')
      element.innerHTML = target.nodeValue + ' ' + truncationHTMLContainer.innerHTML + opt.truncationChar
    }
    if (chunks) {
      if (element.clientHeight <= maxHeight) {
        if (splitOnChars.length >= 0 && splitChar != '') {
          applyEllipsis(target, chunks.join(splitChar) + splitChar + lastChunk)
          chunks = null
        }
        else {
          return element.innerHTML
        }
      }
    } else {
      if (splitChar == '') {
        applyEllipsis(target, '')
        target = getLastChild(element)
        reset()
      }
    }
    if (opt.animate) {
      setTimeout(function () {
        truncate(target, maxHeight)
      }, opt.animate === true ? 10 : opt.animate)
    } else {
      return truncate(target, maxHeight)
    }
  }
  function applyEllipsis (elem, str) {
    elem.nodeValue = str + opt.truncationChar
  }
  function truncateNodeHeight () {
    const fg = document.createDocumentFragment()
    const em = document.createElement('div')
    opt.deltaHeightClass && em.setAttribute('class', opt.deltaHeightClass.join(' '))
    em.style.cssText = 'visibility: hidden;'
    fg.appendChild(em)
    document.body.append(fg)
    const h1 = parseFloat(computeStyle(em, 'height')) + parseFloat(computeStyle(em, 'margin-top')) + parseFloat(computeStyle(em, 'margin-bottom')) + parseFloat(computeStyle(em, 'padding-top')) + parseFloat(computeStyle(em, 'padding-bottom'))
    document.body.removeChild(em)
    return h1
  }
  function clamped (el) {
    const ir = el.innerHTML
    if (!ir) {
      return false
    }
    return ir.slice(-(opt.truncationChar.length)) === opt.truncationChar
  }
  if (clampValue == 'auto') {
    clampValue = getMaxLines()
  } else if (isCSSValue) {
    clampValue = getMaxLines(parseInt(clampValue))
  }
  var clampedText
  if (supportsNativeClamp && opt.useNativeClamp) {
    sty.overflow = 'hidden'
    sty.textOverflow = 'ellipsis'
    sty.webkitBoxOrient = 'vertical'
    sty.display = '-webkit-box'
    sty.webkitLineClamp = clampValue
    if (isCSSValue) {
      sty.height = opt.clamp + 'px'
    }
  } else {
    requestAnimationFrame(() => {
      var height = getMaxHeight(clampValue)
      if (height <= element.clientHeight) {
        clampedText = truncate(getLastChild(element), height)
      }
      if (opt.tails && clamped(element)) {
        element.appendChild(opt.tails)
      }
    }, 500)
  }
  return {
    original: originalText,
    clamped: clampedText
  }
}
