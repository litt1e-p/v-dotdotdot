/* eslint-disable  */
import clamp from '../vendor/clamp'
import '../style/style.css'

function isNumberic (v, u = false) {
  // eslint-disable-next-line no-useless-escape
  return regex(u ? /^\d+(\.|\.\d+)?$/g : /^\-?\d+(\.|\.\d+)?$/g, v)
}

function isEllipsis (v) {
  // eslint-disable-next-line no-useless-escape
  return regex(/\-webkit\-line\-clamp:\s+\d+/g, v)
}

function isBoolean (v) {
  return ['true', 'false'].includes(String(v))
}

function isMoreType (v) {
  return ['text', 'icon'].includes(v)
}

function isString (v) {
  return Object.prototype.toString.call(v) === '[object String]'
}

function regex (r, v) {
  return r.test(v)
}

export default class Dotdotdot {
  constructor (el, opts = {}, globalOpts = {}) {
    this._$el = el
    this._$usrOpts = globalOpts
    this._init(opts)
    this._beforeMount()
    this._cla(el, this._opts._$className)
    this._$tpl = this._createElements()
    this._$tplx = this._$tpl.innerText
    this._mount()
  }

  destroy () {
    this._unmount()
  }

  update (el, opts, node) {
    if (!el || !el.children || el.children.length !== 1 || !node || !node.children || node.children.length !== 1) {
      return
    }
    this._init(opts)
    this._replaceMount(this._createElements(el.children[0], node.children[0].text, true))
  }

  _beforeMount () {
    let vd = ''
    if (!this._$el) {
      vd = 'element must exists which mounted in Dotdotdot'
    } else if (this._$el.childElementCount > 0) {
      vd = 'element\'s child node can not exist when use v-dotdotdot'
    }
    if (vd) {
      throw new Error(vd)
    }
    return true
  }

  _mount () {
    if (!this._$tpl || !this._$el) {
      return
    }
    this._$el.insertAdjacentElement('afterbegin', this._$tpl)
  }

  _unmount () {
    this._unbind(this._$el.getElementsByClassName(this._opts._$defaultClassName)[0])
    if (this._$tpl && this._$tpl.parentNode) {
      this._$tpl.parentNode.removeChild(this._$tpl)
    }
  }

  _unbind (el) {
    if (el.binded) {
      el.removeEventListener('click', this._eventClosure)
    }
  }

  _replaceMount (newTpl) {
    if (!this._$tpl || !this._$el) {
      return
    }
    this._$el.replaceChild(newTpl, this._$tpl)
    this._cla(this._$el, this._opts._$className)
    this._$tpl = newTpl
    this._$tplx = this._$tpl.innerText
  }

  _createElements (pnode, innerText, rebuild = false) {
    const inner = innerText || this._$el.innerText
    let _$p = pnode
    if (!pnode) {
      _$p = document.createElement('div')
      this._$el.innerText = null
    }
    this._cla(_$p, this._opts._$defaultClassName)
    if (!this._opts._$moreable) {
      this._cla(_$p, this._opts._$defaultThroughClassName)
    }
    _$p.innerText = inner
    this._opts._$line > 0 && this._eventBind(_$p, rebuild)
    return _$p
  }

  _useStyle (el) {
    const isa = isEllipsis(el.style.cssText)
    el.style.cssText = `overflow: ${isa ? 'unset' : 'hidden'};text-overflow: ${isa ? 'unset' : 'ellipsis'};-webkit-line-clamp: ${isa ? 'unset' : this._opts._$line};-webkit-box-orient: ${isa ? 'unset' : 'vertical'};display: ${isa ? 'unset' : '-webkit-box'};`
  }

  _useClamp (el) {
    const isa = el.getElementsByClassName(this._opts._$defaultMoreClassName).length
    if (isa) {
      return this._replaceMount(this._createElements(el, this._$tplx))
    }
    const em = document.createElement('em')
    em.setAttribute('class', this._opts._$defaultMoreClassName)
    em.innerHTML = this._opts._$moreType === 'text' ? this._opts._$moreText : ''
    const conf = { clamp: isa ? 0 : this._opts._$line, useNativeClamp: false, animate: false }
    return clamp.apply(this, [el, Object.assign(conf, { originText: this._$tplx, deltaHeightClass: [this._opts._$className, this._opts._$defaultClassName], transitClass: this._opts._$transitClassName, tails: this._opts._$moreable ? em : void 0 })])
  }

  _toggle (el, bi = false) {
    if (!bi) {
      this._useClamp.apply(this, arguments)
    } else {
      this._useStyle.apply(this, arguments)
    }
  }

  _eventClosure (e, el) {
    e.stopPropagation()
    el = el || e.target
    if (el.clampOnce) return
    this._toggle(el, this._opts._$useBuiltIns)
  }

  _eventBind (el, force = false) {
    if (!el || (el.binded && !force)) {
      return
    }
    if (this._opts._$moreable) {
      el.clampOnce = false
    }
    this._unbind(el)
    this._eventClosure = this._eventClosure.bind(this)
    el.addEventListener('click', this._eventClosure)
    el.binded = true
    if (this._opts._$autoDot) {
      el.classList.add(this._opts._$transitClassName)
      const args = [...arguments]
      Array.prototype.pop.apply(args)
      requestAnimationFrame(() => {
        this._toggle.apply(this, [...args, this._opts._$useBuiltIns])
        requestAnimationFrame(() => el.classList.remove(this._opts._$transitClassName), 500)
        if (!this._opts._$moreable) el.clampOnce = true
      }, 20)
    }
  }

  _cla (el, val, replace = false) {
    if (typeof val !== 'string' || !el || !this._isElement(el) || !el.classList) {
      return
    }
    if (replace) {
      const classList = el.classList.value.replace(this.options.class, val)
      this._setAttr(el, 'class', classList)
    } else {
      el.classList.add(val)
    }
  }

  _isElement (e) {
    return e instanceof window.Element
  }

  _init (opts) {
    this._opts = Dotdotdot.filterOpts(opts, this._$usrOpts)
  }

  static filterOpts (opts, globalOpts) {
    const dc = 'dotdotdot__vm'
    const dct = 'dotdotdot__ev--thr'
    const mrc = 'dotdotdot-icon-more'
    const mrt = 'dotdotdot-text-more'
    const hdc = 'dotdotdot__hide'
    let nm = void 0
    let me = void 0
    let cl = void 0
    let ub = void 0
    let mt = void 0
    let ad = void 0
    let ma = void 0
    if (opts && opts.hasOwnProperty('moreType')) {
      mt = isMoreType(opts.moreType) ? opts.moreType : void 0
    } else if (mt === void 0 && globalOpts && globalOpts.hasOwnProperty('moreType')) {
      mt = isMoreType(globalOpts.moreType) ? globalOpts.moreType : void 0
    }
    if (opts && opts.hasOwnProperty('moreText')) {
      me = isString(opts.moreText) ? opts.moreText : me
    } else if (me === void 0 && globalOpts && globalOpts.hasOwnProperty('moreText')) {
      me = isString(globalOpts.moreText) ? globalOpts.moreText : me
    }
    if (opts && opts.hasOwnProperty('useBuiltIns')) {
      ub = isBoolean(opts.useBuiltIns) ? opts.useBuiltIns : void 0
    } else if (ub === void 0 && globalOpts && globalOpts.hasOwnProperty('useBuiltIns')) {
      ub = isBoolean(globalOpts.useBuiltIns) ? globalOpts.useBuiltIns : void 0
    }
    if (opts && opts.hasOwnProperty('className')) {
      cl = isString(opts.className) ? opts.className : void 0
    } else if (cl === void 0 && globalOpts && globalOpts.hasOwnProperty('className')) {
      cl = isString(globalOpts.className) ? globalOpts.className : void 0
    }
    if (opts && opts.hasOwnProperty('line')) {
      nm = isNumberic(opts.line) ? opts.line : void 0
    } else if (nm === void 0 && globalOpts && globalOpts.hasOwnProperty('line')) {
      nm = isNumberic(globalOpts.line) ? globalOpts.line : void 0
    }
    if (opts && opts.hasOwnProperty('disableAutoDot')) {
      ad  = isBoolean(opts.disableAutoDot) ? opts.disableAutoDot : void 0
    } else if (ad === void 0 && globalOpts && globalOpts.hasOwnProperty('disableAutoDot')) {
      ad = isBoolean(globalOpts.disableAutoDot) ? globalOpts.disableAutoDot : void 0
    }
    if (opts && opts.hasOwnProperty('moreable')) {
      ma  = isBoolean(opts.moreable) ? opts.moreable : void 0
    } else if (ma === void 0 && globalOpts && globalOpts.hasOwnProperty('moreable')) {
      ma = isBoolean(globalOpts.moreable) ? globalOpts.moreable : void 0
    }
    nm = nm === void 0 || nm < 0 ? 0 : nm
    nm = +(+nm).toFixed(0)
    mt = mt !== void 0 ? mt : 'text'
    return { _$line: nm, _$className: cl !== void 0 ? cl : '', _$defaultClassName: dc, _$defaultThroughClassName: dct, _$defaultMoreClassName: mt === 'text' ? mrt : mrc, _$transitClassName: hdc, _$useBuiltIns: ub !== void 0 ? ub : false, _$moreType: mt, _$moreText: me !== void 0 ? me : 'show more', _$moreable: ma === void 0 ? true : ma, _$autoDot: ad === void 0 ? true : !ad }
  }
}
