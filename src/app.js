/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
'use strict';
var t;

function ba(a) {
  var b = 0;
  return function () {
    return b < a.length ? {
      done: !1,
      value: a[b++]
    } : {
      done: !0
    }
  }
}
var da = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
  if (a == Array.prototype || a == Object.prototype) return a;
  a[b] = c.value;
  return a
};

function ea(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
  for (var b = 0; b < a.length; ++b) {
    var c = a[b];
    if (c && c.Math == Math) return c
  }
  throw Error("Cannot find global object");
}
var fa = ea(this);

function u(a, b) {
  if (b) a: {
    var c = fa;a = a.split(".");
    for (var d = 0; d < a.length - 1; d++) {
      var e = a[d];
      if (!(e in c)) break a;
      c = c[e]
    }
    a = a[a.length - 1];d = c[a];b = b(d);b != d && null != b && da(c, a, {
      configurable: !0,
      writable: !0,
      value: b
    })
  }
}
u("Symbol", function (a) {
  function b(f) {
    if (this instanceof b) throw new TypeError("Symbol is not a constructor");
    return new c(d + (f || "") + "_" + e++, f)
  }

  function c(f, g) {
    this.g = f;
    da(this, "description", {
      configurable: !0,
      writable: !0,
      value: g
    })
  }
  if (a) return a;
  c.prototype.toString = function () {
    return this.g
  };
  var d = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_",
    e = 0;
  return b
});
u("Symbol.iterator", function (a) {
  if (a) return a;
  a = Symbol("Symbol.iterator");
  for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
    var d = fa[b[c]];
    "function" === typeof d && "function" != typeof d.prototype[a] && da(d.prototype, a, {
      configurable: !0,
      writable: !0,
      value: function () {
        return ha(ba(this))
      }
    })
  }
  return a
});

function ha(a) {
  a = {
    next: a
  };
  a[Symbol.iterator] = function () {
    return this
  };
  return a
}

function v(a) {
  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return b ? b.call(a) : {
    next: ba(a)
  }
}

function ia(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b)
}
var ja = "function" == typeof Object.assign ? Object.assign : function (a, b) {
  for (var c = 1; c < arguments.length; c++) {
    var d = arguments[c];
    if (d)
      for (var e in d) ia(d, e) && (a[e] = d[e])
  }
  return a
};
u("Object.assign", function (a) {
  return a || ja
});
var ka = "function" == typeof Object.create ? Object.create : function (a) {
    function b() {}
    b.prototype = a;
    return new b
  },
  la;
if ("function" == typeof Object.setPrototypeOf) la = Object.setPrototypeOf;
else {
  var ma;
  a: {
    var na = {
        a: !0
      },
      oa = {};
    try {
      oa.__proto__ = na;
      ma = oa.a;
      break a
    } catch (a) {}
    ma = !1
  }
  la = ma ? function (a, b) {
    a.__proto__ = b;
    if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
    return a
  } : null
}
var qa = la;

function ra(a, b) {
  a.prototype = ka(b.prototype);
  a.prototype.constructor = a;
  if (qa) qa(a, b);
  else
    for (var c in b)
      if ("prototype" != c)
        if (Object.defineProperties) {
          var d = Object.getOwnPropertyDescriptor(b, c);
          d && Object.defineProperty(a, c, d)
        } else a[c] = b[c];
  a.va = b.prototype
}

function sa() {
  this.F = !1;
  this.v = null;
  this.j = void 0;
  this.g = 1;
  this.u = this.D = 0;
  this.H = this.s = null
}

function ta(a) {
  if (a.F) throw new TypeError("Generator is already running");
  a.F = !0
}
sa.prototype.I = function (a) {
  this.j = a
};

function ua(a, b) {
  a.s = {
    La: b,
    Na: !0
  };
  a.g = a.D || a.u
}
sa.prototype.return = function (a) {
  this.s = {
    return: a
  };
  this.g = this.u
};

function x(a, b, c) {
  a.g = c;
  return {
    value: b
  }
}
sa.prototype.J = function (a) {
  this.g = a
};

function va(a, b, c) {
  a.D = b;
  void 0 != c && (a.u = c)
}

function wa(a) {
  a.D = 0;
  a.u = 2
}

function xa(a, b) {
  a.g = b;
  a.D = 0
}

function ya(a) {
  a.D = 0;
  var b = a.s.La;
  a.s = null;
  return b
}

function za(a, b) {
  a.H = [a.s];
  a.D = b || 0;
  a.u = 0
}

function Ba(a, b) {
  var c = a.H.splice(0)[0];
  (c = a.s = a.s || c) ? c.Na ? a.g = a.D || a.u : void 0 != c.J && a.u < c.J ? (a.g = c.J, a.s = null) : a.g = a.u: a.g = b
}

function Ca(a) {
  this.g = new sa;
  this.j = a
}

function Da(a, b) {
  ta(a.g);
  var c = a.g.v;
  if (c) return Fa(a, "return" in c ? c["return"] : function (d) {
    return {
      value: d,
      done: !0
    }
  }, b, a.g.return);
  a.g.return(b);
  return Ga(a)
}

function Fa(a, b, c, d) {
  try {
    var e = b.call(a.g.v, c);
    if (!(e instanceof Object)) throw new TypeError("Iterator result " + e + " is not an object");
    if (!e.done) return a.g.F = !1, e;
    var f = e.value
  } catch (g) {
    return a.g.v = null, ua(a.g, g), Ga(a)
  }
  a.g.v = null;
  d.call(a.g, f);
  return Ga(a)
}

function Ga(a) {
  for (; a.g.g;) try {
    var b = a.j(a.g);
    if (b) return a.g.F = !1, {
      value: b.value,
      done: !1
    }
  } catch (c) {
    a.g.j = void 0, ua(a.g, c)
  }
  a.g.F = !1;
  if (a.g.s) {
    b = a.g.s;
    a.g.s = null;
    if (b.Na) throw b.La;
    return {
      value: b.return,
      done: !0
    }
  }
  return {
    value: void 0,
    done: !0
  }
}

function Ha(a) {
  this.next = function (b) {
    ta(a.g);
    a.g.v ? b = Fa(a, a.g.v.next, b, a.g.I) : (a.g.I(b), b = Ga(a));
    return b
  };
  this.throw = function (b) {
    ta(a.g);
    a.g.v ? b = Fa(a, a.g.v["throw"], b, a.g.I) : (ua(a.g, b), b = Ga(a));
    return b
  };
  this.return = function (b) {
    return Da(a, b)
  };
  this[Symbol.iterator] = function () {
    return this
  }
}

function Ia(a) {
  function b(d) {
    return a.next(d)
  }

  function c(d) {
    return a.throw(d)
  }
  return new Promise(function (d, e) {
    function f(g) {
      g.done ? d(g.value) : Promise.resolve(g.value).then(b, c).then(f, e)
    }
    f(a.next())
  })
}

function z(a) {
  return Ia(new Ha(new Ca(a)))
}
u("Promise", function (a) {
  function b(g) {
    this.g = 0;
    this.s = void 0;
    this.j = [];
    this.F = !1;
    var h = this.u();
    try {
      g(h.resolve, h.reject)
    } catch (k) {
      h.reject(k)
    }
  }

  function c() {
    this.g = null
  }

  function d(g) {
    return g instanceof b ? g : new b(function (h) {
      h(g)
    })
  }
  if (a) return a;
  c.prototype.j = function (g) {
    if (null == this.g) {
      this.g = [];
      var h = this;
      this.s(function () {
        h.v()
      })
    }
    this.g.push(g)
  };
  var e = fa.setTimeout;
  c.prototype.s = function (g) {
    e(g, 0)
  };
  c.prototype.v = function () {
    for (; this.g && this.g.length;) {
      var g = this.g;
      this.g = [];
      for (var h = 0; h < g.length; ++h) {
        var k =
          g[h];
        g[h] = null;
        try {
          k()
        } catch (l) {
          this.u(l)
        }
      }
    }
    this.g = null
  };
  c.prototype.u = function (g) {
    this.s(function () {
      throw g;
    })
  };
  b.prototype.u = function () {
    function g(l) {
      return function (n) {
        k || (k = !0, l.call(h, n))
      }
    }
    var h = this,
      k = !1;
    return {
      resolve: g(this.N),
      reject: g(this.v)
    }
  };
  b.prototype.N = function (g) {
    if (g === this) this.v(new TypeError("A Promise cannot resolve to itself"));
    else if (g instanceof b) this.R(g);
    else {
      a: switch (typeof g) {
        case "object":
          var h = null != g;
          break a;
        case "function":
          h = !0;
          break a;
        default:
          h = !1
      }
      h ? this.M(g) : this.D(g)
    }
  };
  b.prototype.M = function (g) {
    var h = void 0;
    try {
      h = g.then
    } catch (k) {
      this.v(k);
      return
    }
    "function" == typeof h ? this.S(h, g) : this.D(g)
  };
  b.prototype.v = function (g) {
    this.I(2, g)
  };
  b.prototype.D = function (g) {
    this.I(1, g)
  };
  b.prototype.I = function (g, h) {
    if (0 != this.g) throw Error("Cannot settle(" + g + ", " + h + "): Promise already settled in state" + this.g);
    this.g = g;
    this.s = h;
    2 === this.g && this.O();
    this.H()
  };
  b.prototype.O = function () {
    var g = this;
    e(function () {
      if (g.K()) {
        var h = fa.console;
        "undefined" !== typeof h && h.error(g.s)
      }
    }, 1)
  };
  b.prototype.K =
    function () {
      if (this.F) return !1;
      var g = fa.CustomEvent,
        h = fa.Event,
        k = fa.dispatchEvent;
      if ("undefined" === typeof k) return !0;
      "function" === typeof g ? g = new g("unhandledrejection", {
        cancelable: !0
      }) : "function" === typeof h ? g = new h("unhandledrejection", {
        cancelable: !0
      }) : (g = fa.document.createEvent("CustomEvent"), g.initCustomEvent("unhandledrejection", !1, !0, g));
      g.promise = this;
      g.reason = this.s;
      return k(g)
    };
  b.prototype.H = function () {
    if (null != this.j) {
      for (var g = 0; g < this.j.length; ++g) f.j(this.j[g]);
      this.j = null
    }
  };
  var f = new c;
  b.prototype.R = function (g) {
    var h = this.u();
    g.ia(h.resolve, h.reject)
  };
  b.prototype.S = function (g, h) {
    var k = this.u();
    try {
      g.call(h, k.resolve, k.reject)
    } catch (l) {
      k.reject(l)
    }
  };
  b.prototype.then = function (g, h) {
    function k(q, w) {
      return "function" == typeof q ? function (m) {
        try {
          l(q(m))
        } catch (r) {
          n(r)
        }
      } : w
    }
    var l, n, p = new b(function (q, w) {
      l = q;
      n = w
    });
    this.ia(k(g, l), k(h, n));
    return p
  };
  b.prototype.catch = function (g) {
    return this.then(void 0, g)
  };
  b.prototype.ia = function (g, h) {
    function k() {
      switch (l.g) {
        case 1:
          g(l.s);
          break;
        case 2:
          h(l.s);
          break;
        default:
          throw Error("Unexpected state: " + l.g);
      }
    }
    var l = this;
    null == this.j ? f.j(k) : this.j.push(k);
    this.F = !0
  };
  b.resolve = d;
  b.reject = function (g) {
    return new b(function (h, k) {
      k(g)
    })
  };
  b.race = function (g) {
    return new b(function (h, k) {
      for (var l = v(g), n = l.next(); !n.done; n = l.next()) d(n.value).ia(h, k)
    })
  };
  b.all = function (g) {
    var h = v(g),
      k = h.next();
    return k.done ? d([]) : new b(function (l, n) {
      function p(m) {
        return function (r) {
          q[m] = r;
          w--;
          0 == w && l(q)
        }
      }
      var q = [],
        w = 0;
      do q.push(void 0), w++, d(k.value).ia(p(q.length - 1), n), k = h.next();
      while (!k.done)
    })
  };
  return b
});
u("Array.prototype.find", function (a) {
  return a ? a : function (b, c) {
    a: {
      var d = this;d instanceof String && (d = String(d));
      for (var e = d.length, f = 0; f < e; f++) {
        var g = d[f];
        if (b.call(c, g, f, d)) {
          b = g;
          break a
        }
      }
      b = void 0
    }
    return b
  }
});
u("WeakMap", function (a) {
  function b(k) {
    this.g = (h += Math.random() + 1).toString();
    if (k) {
      k = v(k);
      for (var l; !(l = k.next()).done;) l = l.value, this.set(l[0], l[1])
    }
  }

  function c() {}

  function d(k) {
    var l = typeof k;
    return "object" === l && null !== k || "function" === l
  }

  function e(k) {
    if (!ia(k, g)) {
      var l = new c;
      da(k, g, {
        value: l
      })
    }
  }

  function f(k) {
    var l = Object[k];
    l && (Object[k] = function (n) {
      if (n instanceof c) return n;
      Object.isExtensible(n) && e(n);
      return l(n)
    })
  }
  if (function () {
      if (!a || !Object.seal) return !1;
      try {
        var k = Object.seal({}),
          l = Object.seal({}),
          n = new a([
            [k, 2],
            [l, 3]
          ]);
        if (2 != n.get(k) || 3 != n.get(l)) return !1;
        n.delete(k);
        n.set(l, 4);
        return !n.has(k) && 4 == n.get(l)
      } catch (p) {
        return !1
      }
    }()) return a;
  var g = "$jscomp_hidden_" + Math.random();
  f("freeze");
  f("preventExtensions");
  f("seal");
  var h = 0;
  b.prototype.set = function (k, l) {
    if (!d(k)) throw Error("Invalid WeakMap key");
    e(k);
    if (!ia(k, g)) throw Error("WeakMap key fail: " + k);
    k[g][this.g] = l;
    return this
  };
  b.prototype.get = function (k) {
    return d(k) && ia(k, g) ? k[g][this.g] : void 0
  };
  b.prototype.has = function (k) {
    return d(k) && ia(k,
      g) && ia(k[g], this.g)
  };
  b.prototype.delete = function (k) {
    return d(k) && ia(k, g) && ia(k[g], this.g) ? delete k[g][this.g] : !1
  };
  return b
});
u("Map", function (a) {
  function b() {
    var h = {};
    return h.T = h.next = h.head = h
  }

  function c(h, k) {
    var l = h.g;
    return ha(function () {
      if (l) {
        for (; l.head != h.g;) l = l.T;
        for (; l.next != l.head;) return l = l.next, {
          done: !1,
          value: k(l)
        };
        l = null
      }
      return {
        done: !0,
        value: void 0
      }
    })
  }

  function d(h, k) {
    var l = k && typeof k;
    "object" == l || "function" == l ? f.has(k) ? l = f.get(k) : (l = "" + ++g, f.set(k, l)) : l = "p_" + k;
    var n = h.j[l];
    if (n && ia(h.j, l))
      for (h = 0; h < n.length; h++) {
        var p = n[h];
        if (k !== k && p.key !== p.key || k === p.key) return {
          id: l,
          list: n,
          index: h,
          L: p
        }
      }
    return {
      id: l,
      list: n,
      index: -1,
      L: void 0
    }
  }

  function e(h) {
    this.j = {};
    this.g = b();
    this.size = 0;
    if (h) {
      h = v(h);
      for (var k; !(k = h.next()).done;) k = k.value, this.set(k[0], k[1])
    }
  }
  if (function () {
      if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
      try {
        var h = Object.seal({
            x: 4
          }),
          k = new a(v([
            [h, "s"]
          ]));
        if ("s" != k.get(h) || 1 != k.size || k.get({
            x: 4
          }) || k.set({
            x: 4
          }, "t") != k || 2 != k.size) return !1;
        var l = k.entries(),
          n = l.next();
        if (n.done || n.value[0] != h || "s" != n.value[1]) return !1;
        n = l.next();
        return n.done || 4 != n.value[0].x ||
          "t" != n.value[1] || !l.next().done ? !1 : !0
      } catch (p) {
        return !1
      }
    }()) return a;
  var f = new WeakMap;
  e.prototype.set = function (h, k) {
    h = 0 === h ? 0 : h;
    var l = d(this, h);
    l.list || (l.list = this.j[l.id] = []);
    l.L ? l.L.value = k : (l.L = {
      next: this.g,
      T: this.g.T,
      head: this.g,
      key: h,
      value: k
    }, l.list.push(l.L), this.g.T.next = l.L, this.g.T = l.L, this.size++);
    return this
  };
  e.prototype.delete = function (h) {
    h = d(this, h);
    return h.L && h.list ? (h.list.splice(h.index, 1), h.list.length || delete this.j[h.id], h.L.T.next = h.L.next, h.L.next.T = h.L.T, h.L.head = null, this.size--,
      !0) : !1
  };
  e.prototype.clear = function () {
    this.j = {};
    this.g = this.g.T = b();
    this.size = 0
  };
  e.prototype.has = function (h) {
    return !!d(this, h).L
  };
  e.prototype.get = function (h) {
    return (h = d(this, h).L) && h.value
  };
  e.prototype.entries = function () {
    return c(this, function (h) {
      return [h.key, h.value]
    })
  };
  e.prototype.keys = function () {
    return c(this, function (h) {
      return h.key
    })
  };
  e.prototype.values = function () {
    return c(this, function (h) {
      return h.value
    })
  };
  e.prototype.forEach = function (h, k) {
    for (var l = this.entries(), n; !(n = l.next()).done;) n = n.value,
      h.call(k, n[1], n[0], this)
  };
  e.prototype[Symbol.iterator] = e.prototype.entries;
  var g = 0;
  return e
});

function Ja(a, b) {
  a instanceof String && (a += "");
  var c = 0,
    d = !1,
    e = {
      next: function () {
        if (!d && c < a.length) {
          var f = c++;
          return {
            value: b(f, a[f]),
            done: !1
          }
        }
        d = !0;
        return {
          done: !0,
          value: void 0
        }
      }
    };
  e[Symbol.iterator] = function () {
    return e
  };
  return e
}
u("Array.from", function (a) {
  return a ? a : function (b, c, d) {
    c = null != c ? c : function (h) {
      return h
    };
    var e = [],
      f = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
    if ("function" == typeof f) {
      b = f.call(b);
      for (var g = 0; !(f = b.next()).done;) e.push(c.call(d, f.value, g++))
    } else
      for (f = b.length, g = 0; g < f; g++) e.push(c.call(d, b[g], g));
    return e
  }
});
u("Array.prototype.keys", function (a) {
  return a ? a : function () {
    return Ja(this, function (b) {
      return b
    })
  }
});

function Ka(a, b, c) {
  if (null == a) throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
  if (b instanceof RegExp) throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
  return a + ""
}
u("String.prototype.startsWith", function (a) {
  return a ? a : function (b, c) {
    var d = Ka(this, b, "startsWith"),
      e = d.length,
      f = b.length;
    c = Math.max(0, Math.min(c | 0, d.length));
    for (var g = 0; g < f && c < e;)
      if (d[c++] != b[g++]) return !1;
    return g >= f
  }
});
u("String.prototype.repeat", function (a) {
  return a ? a : function (b) {
    var c = Ka(this, null, "repeat");
    if (0 > b || 1342177279 < b) throw new RangeError("Invalid count value");
    b |= 0;
    for (var d = ""; b;)
      if (b & 1 && (d += c), b >>>= 1) c += c;
    return d
  }
});
u("String.prototype.padStart", function (a) {
  return a ? a : function (b, c) {
    var d = Ka(this, null, "padStart");
    b -= d.length;
    c = void 0 !== c ? String(c) : " ";
    return (0 < b && c ? c.repeat(Math.ceil(b / c.length)).substring(0, b) : "") + d
  }
});
u("Object.is", function (a) {
  return a ? a : function (b, c) {
    return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c
  }
});
u("Array.prototype.includes", function (a) {
  return a ? a : function (b, c) {
    var d = this;
    d instanceof String && (d = String(d));
    var e = d.length;
    c = c || 0;
    for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
      var f = d[c];
      if (f === b || Object.is(f, b)) return !0
    }
    return !1
  }
});
u("String.prototype.includes", function (a) {
  return a ? a : function (b, c) {
    return -1 !== Ka(this, b, "includes").indexOf(b, c || 0)
  }
});
var La = La || {},
  A = this || self;

function Ma(a) {
  "object" != typeof a || a && Array.isArray(a)
}

function Na(a) {
  var b = typeof a;
  return "object" == b && null != a || "function" == b
}

function Oa(a, b, c) {
  return a.call.apply(a.bind, arguments)
}

function Pa(a, b, c) {
  if (!a) throw Error();
  if (2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function () {
      var e = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(e, d);
      return a.apply(b, e)
    }
  }
  return function () {
    return a.apply(b, arguments)
  }
}

function Qa(a, b, c) {
  Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? Qa = Oa : Qa = Pa;
  return Qa.apply(null, arguments)
}

function Ra(a, b) {
  function c() {}
  c.prototype = b.prototype;
  a.va = b.prototype;
  a.prototype = new c;
  a.prototype.constructor = a;
  a.Bb = function (d, e, f) {
    for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h - 2] = arguments[h];
    return b.prototype[e].apply(d, g)
  }
}

function Sa(a) {
  return a
};

function Ta(a, b) {
  if (Error.captureStackTrace) Error.captureStackTrace(this, Ta);
  else {
    var c = Error().stack;
    c && (this.stack = c)
  }
  a && (this.message = String(a));
  void 0 !== b && (this.cause = b)
}
Ra(Ta, Error);
Ta.prototype.name = "CustomError";

function Ua(a) {
  A.setTimeout(function () {
    throw a;
  }, 0)
};
var Va = /&/g,
  Wa = /</g,
  Xa = />/g,
  Ya = /"/g,
  Za = /'/g,
  $a = /\x00/g,
  ab = /[\x00&<>"']/;

function getUAString() {
  var a = A.navigator;
  return a && (a = a.userAgent) ? a : ""
}

function searchUAString(a) {
  return -1 != getUAString().indexOf(a)
};

function detectIfChrome() {
  return (searchUAString("Chrome") || searchUAString("CriOS")) && !searchUAString("Edge") || searchUAString("Silk")
}

function db() {
  var a = {};
  eb.forEach(function (b) {
    a[b[0]] = b[1]
  });
  return function (b) {
    return a[b.find(function (c) {
      return c in a
    })] || ""
  }
};
var fb = Array.prototype.indexOf ? function (a, b) {
  return Array.prototype.indexOf.call(a, b, void 0)
} : function (a, b) {
  if ("string" === typeof a) return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
  for (var c = 0; c < a.length; c++)
    if (c in a && a[c] === b) return c;
  return -1
};

function gb(a, b) {
  b = fb(a, b);
  var c;
  (c = 0 <= b) && Array.prototype.splice.call(a, b, 1);
  return c
}

function hb(a, b, c, d) {
  Array.prototype.splice.apply(a, ib(arguments, 1))
}

function ib(a, b, c) {
  return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c)
};
var isIELegacy = searchUAString("Trident") || searchUAString("MSIE");
!searchUAString("Android") || detectIfChrome();
detectIfChrome();
!searchUAString("Safari") || detectIfChrome();

function kb() {
  this.D = this.D;
  this.I = this.I
}
kb.prototype.D = !1;
kb.prototype.ca = function () {
  if (this.I)
    for (; this.I.length;) this.I.shift()()
};

function lb(a, b) {
  this.type = a;
  this.currentTarget = this.target = b;
  this.defaultPrevented = this.g = !1
}
lb.prototype.stopPropagation = function () {
  this.g = !0
};
lb.prototype.preventDefault = function () {
  this.defaultPrevented = !0
};
var mb = "closure_listenable_" + (1E6 * Math.random() | 0);
var nb = 0;

function ob(a, b, c, d, e) {
  this.listener = a;
  this.proxy = null;
  this.src = b;
  this.type = c;
  this.capture = !!d;
  this.ea = e;
  this.key = ++nb;
  this.ma = this.pa = !1
}

function pb(a) {
  a.ma = !0;
  a.listener = null;
  a.proxy = null;
  a.src = null;
  a.ea = null
};

function qb(a, b) {
  for (var c in a) b.call(void 0, a[c], c, a)
}
var rb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

function sb(a, b) {
  for (var c, d, e = 1; e < arguments.length; e++) {
    d = arguments[e];
    for (c in d) a[c] = d[c];
    for (var f = 0; f < rb.length; f++) c = rb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
  }
};

function tb(a) {
  this.src = a;
  this.g = {};
  this.j = 0
}
tb.prototype.add = function (a, b, c, d, e) {
  var f = a.toString();
  a = this.g[f];
  a || (a = this.g[f] = [], this.j++);
  var g = ub(a, b, d, e); - 1 < g ? (b = a[g], c || (b.pa = !1)) : (b = new ob(b, this.src, f, !!d, e), b.pa = c, a.push(b));
  return b
};

function vb(a, b) {
  var c = b.type;
  c in a.g && gb(a.g[c], b) && (pb(b), 0 == a.g[c].length && (delete a.g[c], a.j--))
}

function ub(a, b, c, d) {
  for (var e = 0; e < a.length; ++e) {
    var f = a[e];
    if (!f.ma && f.listener == b && f.capture == !!c && f.ea == d) return e
  }
  return -1
};
var wb = "closure_lm_" + (1E6 * Math.random() | 0),
  xb = {},
  yb = 0;

function zb(a, b, c, d, e) {
  if (Array.isArray(b))
    for (var f = 0; f < b.length; f++) zb(a, b[f], c, d, e);
  else(d = Na(d) ? !!d.capture : !!d, c = Ab(c), a && a[mb]) ? (a = a.s, b = String(b).toString(), b in a.g && (f = a.g[b], c = ub(f, c, d, e), -1 < c && (pb(f[c]), Array.prototype.splice.call(f, c, 1), 0 == f.length && (delete a.g[b], a.j--)))) : a && (a = Bb(a)) && (b = a.g[b.toString()], a = -1, b && (a = ub(b, c, d, e)), (c = -1 < a ? b[a] : null) && "number" !== typeof c && c && !c.ma && ((e = c.src) && e[mb] ? vb(e.s, c) : (d = c.type, b = c.proxy, e.removeEventListener ? e.removeEventListener(d, b, c.capture) :
    e.detachEvent ? e.detachEvent(d in xb ? xb[d] : xb[d] = "on" + d, b) : e.addListener && e.removeListener && e.removeListener(b), yb--, (d = Bb(e)) ? (vb(d, c), 0 == d.j && (d.src = null, e[wb] = null)) : pb(c))))
}

function Bb(a) {
  a = a[wb];
  return a instanceof tb ? a : null
}
var Cb = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);

function Ab(a) {
  if ("function" === typeof a) return a;
  a[Cb] || (a[Cb] = function (b) {
    return a.handleEvent(b)
  });
  return a[Cb]
};

function Db() {
  kb.call(this);
  this.s = new tb(this);
  this.fb = this;
  this.oa = null
}
Ra(Db, kb);
Db.prototype[mb] = !0;
Db.prototype.removeEventListener = function (a, b, c, d) {
  zb(this, a, b, c, d)
};

function C(a, b) {
  var c, d = a.oa;
  if (d)
    for (c = []; d; d = d.oa) c.push(d);
  a = a.fb;
  d = b.type || b;
  if ("string" === typeof b) b = new lb(b, a);
  else if (b instanceof lb) b.target = b.target || a;
  else {
    var e = b;
    b = new lb(d, a);
    sb(b, e)
  }
  e = !0;
  if (c)
    for (var f = c.length - 1; !b.g && 0 <= f; f--) {
      var g = b.currentTarget = c[f];
      e = Eb(g, d, !0, b) && e
    }
  b.g || (g = b.currentTarget = a, e = Eb(g, d, !0, b) && e, b.g || (e = Eb(g, d, !1, b) && e));
  if (c)
    for (f = 0; !b.g && f < c.length; f++) g = b.currentTarget = c[f], e = Eb(g, d, !1, b) && e;
  return e
}
Db.prototype.ca = function () {
  Db.va.ca.call(this);
  if (this.s) {
    var a = this.s,
      b = 0,
      c;
    for (c in a.g) {
      for (var d = a.g[c], e = 0; e < d.length; e++) ++b, pb(d[e]);
      delete a.g[c];
      a.j--
    }
  }
  this.oa = null
};

function Fb(a, b) {
  a.s.add("complete", b, !0, void 0, void 0)
}

function Eb(a, b, c, d) {
  b = a.s.g[String(b)];
  if (!b) return !0;
  b = b.concat();
  for (var e = !0, f = 0; f < b.length; ++f) {
    var g = b[f];
    if (g && !g.ma && g.capture == c) {
      var h = g.listener,
        k = g.ea || g.src;
      g.pa && vb(a.s, g);
      e = !1 !== h.call(k, d) && e
    }
  }
  return e && !d.defaultPrevented
};

function Gb() {}
Gb.prototype.g = null;

function Hb(a) {
  var b;
  (b = a.g) || (b = {}, Ib(a) && (b[0] = !0, b[1] = !0), b = a.g = b);
  return b
};
var Jb;

function Kb() {}
Ra(Kb, Gb);

function Lb(a) {
  return (a = Ib(a)) ? new ActiveXObject(a) : new XMLHttpRequest
}

function Ib(a) {
  if (!a.j && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
    for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
      var d = b[c];
      try {
        return new ActiveXObject(d), a.j = d
      } catch (e) {}
    }
    throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
  }
  return a.j
}
Jb = new Kb;

function Mb() {};
var Nb;

function Ob(a, b) {
  this.j = b === Pb ? a : ""
}
Ob.prototype.toString = function () {
  return this.j + ""
};
Ob.prototype.fa = !0;
Ob.prototype.g = function () {
  return this.j.toString()
};

function Qb(a) {
  if (a instanceof Ob && a.constructor === Ob) return a.j;
  Ma(a);
  return "type_error:TrustedResourceUrl"
}
var Pb = {};

function Rb(a, b) {
  this.j = b === Sb ? a : ""
}
Rb.prototype.toString = function () {
  return this.j.toString()
};
Rb.prototype.fa = !0;
Rb.prototype.g = function () {
  return this.j.toString()
};

function Tb(a) {
  if (a instanceof Rb && a.constructor === Rb) return a.j;
  Ma(a);
  return "type_error:SafeUrl"
}
var Sb = {};
var Ub = {};

function Vb(a, b) {
  this.j = b === Ub ? a : "";
  this.fa = !0
}
Vb.prototype.g = function () {
  return this.j
};
Vb.prototype.toString = function () {
  return this.j.toString()
};

function Wb(a) {
  if (a instanceof Vb && a.constructor === Vb) return a.j;
  Ma(a);
  return "type_error:SafeStyle"
};
var Xb = {};

function Yb(a, b) {
  this.j = b === Xb ? a : "";
  this.fa = !0
}
Yb.prototype.toString = function () {
  return this.j.toString()
};
Yb.prototype.g = function () {
  return this.j
};

function Zb(a) {
  if (a instanceof Yb && a.constructor === Yb) return a.j;
  Ma(a);
  return "type_error:SafeStyleSheet"
};
var $b = {};

function ac(a, b) {
  this.j = b === $b ? a : "";
  this.fa = !0
}
ac.prototype.g = function () {
  return this.j.toString()
};
ac.prototype.toString = function () {
  return this.j.toString()
};

function bc(a) {
  if (a instanceof ac && a.constructor === ac) return a.j;
  Ma(a);
  return "type_error:SafeHtml"
}

function cc(a) {
  a instanceof ac || (a = "object" == typeof a && a.fa ? a.g() : String(a), ab.test(a) && (-1 != a.indexOf("&") && (a = a.replace(Va, "&amp;")), -1 != a.indexOf("<") && (a = a.replace(Wa, "&lt;")), -1 != a.indexOf(">") && (a = a.replace(Xa, "&gt;")), -1 != a.indexOf('"') && (a = a.replace(Ya, "&quot;")), -1 != a.indexOf("'") && (a = a.replace(Za, "&#39;")), -1 != a.indexOf("\x00") && (a = a.replace($a, "&#0;"))), a = dc(a));
  return a
}

function dc(a) {
  if (void 0 === Nb) {
    var b = null;
    var c = A.trustedTypes;
    if (c && c.createPolicy) {
      try {
        b = c.createPolicy("goog#html", {
          createHTML: Sa,
          createScript: Sa,
          createScriptURL: Sa
        })
      } catch (d) {
        A.console && A.console.error(d.message)
      }
      Nb = b
    } else Nb = b
  }
  a = (b = Nb) ? b.createHTML(a) : a;
  return new ac(a, $b)
}
var ec = new ac(A.trustedTypes && A.trustedTypes.emptyHTML || "", $b);
var fc = function (a) {
  var b = !1,
    c;
  return function () {
    b || (c = a(), b = !0);
    return c
  }
}(function () {
  var a = document.createElement("div"),
    b = document.createElement("div");
  b.appendChild(document.createElement("div"));
  a.appendChild(b);
  b = a.firstChild.firstChild;
  a.innerHTML = bc(ec);
  return !b.parentElement
});

function gc(a, b) {
  if (fc())
    for (; a.lastChild;) a.removeChild(a.lastChild);
  a.innerHTML = bc(b)
};

function D(a) {
  return -1 != a.indexOf("&") ? "document" in A ? hc(a) : ic(a) : a
}

function hc(a) {
  var b = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"'
  };
  var c = A.document.createElement("div");
  return a.replace(jc, function (d, e) {
    var f = b[d];
    if (f) return f;
    "#" == e.charAt(0) && (e = Number("0" + e.slice(1)), isNaN(e) || (f = String.fromCharCode(e)));
    f || (f = dc(d + " "), gc(c, f), f = c.firstChild.nodeValue.slice(0, -1));
    return b[d] = f
  })
}

function ic(a) {
  return a.replace(/&([^;]+);/g, function (b, c) {
    switch (c) {
      case "amp":
        return "&";
      case "lt":
        return "<";
      case "gt":
        return ">";
      case "quot":
        return '"';
      default:
        return "#" != c.charAt(0) || (c = Number("0" + c.slice(1)), isNaN(c)) ? b : String.fromCharCode(c)
    }
  })
}
var jc = /&([^;\s<&]+);?/g,
  kc = String.prototype.repeat ? function (a, b) {
    return a.repeat(b)
  } : function (a, b) {
    return Array(b + 1).join(a)
  };

function lc(a, b) {
  this.u = a;
  this.s = b;
  this.j = 0;
  this.g = null
}
lc.prototype.get = function () {
  if (0 < this.j) {
    this.j--;
    var a = this.g;
    this.g = a.next;
    a.next = null
  } else a = this.u();
  return a
};

function mc(a, b) {
  a.s(b);
  100 > a.j && (a.j++, b.next = a.g, a.g = b)
};

function nc() {
  var a = document;
  var b = "IFRAME";
  "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
  return a.createElement(b)
};
var oc;

function pc() {
  var a = A.MessageChannel;
  "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !searchUAString("Presto") && (a = function () {
    var e = nc();
    e.style.display = "none";
    document.documentElement.appendChild(e);
    var f = e.contentWindow;
    e = f.document;
    e.open();
    e.close();
    var g = "callImmediate" + Math.random(),
      h = "file:" == f.location.protocol ? "*" : f.location.protocol + "//" + f.location.host;
    e = Qa(function (k) {
      if (("*" == h || k.origin == h) && k.data == g) this.port1.onmessage()
    }, this);
    f.addEventListener("message", e,
      !1);
    this.port1 = {};
    this.port2 = {
      postMessage: function () {
        f.postMessage(g, h)
      }
    }
  });
  if ("undefined" !== typeof a && !searchUAString("Trident") && !searchUAString("MSIE")) {
    var b = new a,
      c = {},
      d = c;
    b.port1.onmessage = function () {
      if (void 0 !== c.next) {
        c = c.next;
        var e = c.Da;
        c.Da = null;
        e()
      }
    };
    return function (e) {
      d.next = {
        Da: e
      };
      d = d.next;
      b.port2.postMessage(0)
    }
  }
  return function (e) {
    A.setTimeout(e, 0)
  }
};

function qc() {
  this.j = this.g = null
}
qc.prototype.add = function (a, b) {
  var c = rc.get();
  c.set(a, b);
  this.j ? this.j.next = c : this.g = c;
  this.j = c
};

function sc() {
  var a = tc,
    b = null;
  a.g && (b = a.g, a.g = a.g.next, a.g || (a.j = null), b.next = null);
  return b
}
var rc = new lc(function () {
  return new uc
}, function (a) {
  return a.reset()
});

function uc() {
  this.next = this.g = this.j = null
}
uc.prototype.set = function (a, b) {
  this.j = a;
  this.g = b;
  this.next = null
};
uc.prototype.reset = function () {
  this.next = this.g = this.j = null
};
var vc, wc = !1,
  tc = new qc;

function xc(a, b) {
  vc || yc();
  wc || (vc(), wc = !0);
  tc.add(a, b)
}

function yc() {
  if (A.Promise && A.Promise.resolve) {
    var a = A.Promise.resolve(void 0);
    vc = function () {
      a.then(zc)
    }
  } else vc = function () {
    var b = zc;
    "function" !== typeof A.setImmediate || A.Window && A.Window.prototype && !searchUAString("Edge") && A.Window.prototype.setImmediate == A.setImmediate ? (oc || (oc = pc()), oc(b)) : A.setImmediate(b)
  }
}

function zc() {
  for (var a; a = sc();) {
    try {
      a.j.call(a.g)
    } catch (b) {
      Ua(b)
    }
    mc(rc, a)
  }
  wc = !1
};

function Ac(a) {
  this.g = 0;
  this.F = void 0;
  this.u = this.j = this.s = null;
  this.v = this.D = !1;
  if (a != Mb) try {
    var b = this;
    a.call(void 0, function (c) {
      Bc(b, 2, c)
    }, function (c) {
      Bc(b, 3, c)
    })
  } catch (c) {
    Bc(this, 3, c)
  }
}

function Cc() {
  this.next = this.s = this.j = this.u = this.g = null;
  this.v = !1
}
Cc.prototype.reset = function () {
  this.s = this.j = this.u = this.g = null;
  this.v = !1
};
var Dc = new lc(function () {
  return new Cc
}, function (a) {
  a.reset()
});

function Ec(a, b, c) {
  var d = Dc.get();
  d.u = a;
  d.j = b;
  d.s = c;
  return d
}
Ac.prototype.then = function (a, b, c) {
  return Fc(this, "function" === typeof a ? a : null, "function" === typeof b ? b : null, c)
};
Ac.prototype.$goog_Thenable = !0;

function Gc(a, b) {
  return Fc(a, null, b)
}
Ac.prototype.cancel = function (a) {
  if (0 == this.g) {
    var b = new Hc(a);
    xc(function () {
      Ic(this, b)
    }, this)
  }
};

function Ic(a, b) {
  if (0 == a.g)
    if (a.s) {
      var c = a.s;
      if (c.j) {
        for (var d = 0, e = null, f = null, g = c.j; g && (g.v || (d++, g.g == a && (e = g), !(e && 1 < d))); g = g.next) e || (f = g);
        e && (0 == c.g && 1 == d ? Ic(c, b) : (f ? (d = f, d.next == c.u && (c.u = d), d.next = d.next.next) : Jc(c), Kc(c, e, 3, b)))
      }
      a.s = null
    } else Bc(a, 3, b)
}

function Lc(a, b) {
  a.j || 2 != a.g && 3 != a.g || Mc(a);
  a.u ? a.u.next = b : a.j = b;
  a.u = b
}

function Fc(a, b, c, d) {
  var e = Ec(null, null, null);
  e.g = new Ac(function (f, g) {
    e.u = b ? function (h) {
      try {
        var k = b.call(d, h);
        f(k)
      } catch (l) {
        g(l)
      }
    } : f;
    e.j = c ? function (h) {
      try {
        var k = c.call(d, h);
        void 0 === k && h instanceof Hc ? g(h) : f(k)
      } catch (l) {
        g(l)
      }
    } : g
  });
  e.g.s = a;
  Lc(a, e);
  return e.g
}
Ac.prototype.H = function (a) {
  this.g = 0;
  Bc(this, 2, a)
};
Ac.prototype.K = function (a) {
  this.g = 0;
  Bc(this, 3, a)
};

function Bc(a, b, c) {
  if (0 == a.g) {
    a === c && (b = 3, c = new TypeError("Promise cannot resolve to itself"));
    a.g = 1;
    a: {
      var d = c,
        e = a.H,
        f = a.K;
      if (d instanceof Ac) {
        Lc(d, Ec(e || Mb, f || null, a));
        var g = !0
      } else {
        if (d) try {
          var h = !!d.$goog_Thenable
        } catch (l) {
          h = !1
        } else h = !1;
        if (h) d.then(e, f, a), g = !0;
        else {
          if (Na(d)) try {
            var k = d.then;
            if ("function" === typeof k) {
              Nc(d, k, e, f, a);
              g = !0;
              break a
            }
          } catch (l) {
            f.call(a, l);
            g = !0;
            break a
          }
          g = !1
        }
      }
    }
    g || (a.F = c, a.g = b, a.s = null, Mc(a), 3 != b || c instanceof Hc || Oc(a, c))
  }
}

function Nc(a, b, c, d, e) {
  function f(k) {
    h || (h = !0, d.call(e, k))
  }

  function g(k) {
    h || (h = !0, c.call(e, k))
  }
  var h = !1;
  try {
    b.call(a, g, f)
  } catch (k) {
    f(k)
  }
}

function Mc(a) {
  a.D || (a.D = !0, xc(a.I, a))
}

function Jc(a) {
  var b = null;
  a.j && (b = a.j, a.j = b.next, b.next = null);
  a.j || (a.u = null);
  return b
}
Ac.prototype.I = function () {
  for (var a; a = Jc(this);) Kc(this, a, this.g, this.F);
  this.D = !1
};

function Kc(a, b, c, d) {
  if (3 == c && b.j && !b.v)
    for (; a && a.v; a = a.s) a.v = !1;
  if (b.g) b.g.s = null, Pc(b, c, d);
  else try {
    b.v ? b.u.call(b.s) : Pc(b, c, d)
  } catch (e) {
    Qc.call(null, e)
  }
  mc(Dc, b)
}

function Pc(a, b, c) {
  2 == b ? a.u.call(a.s, c) : a.j && a.j.call(a.s, c)
}

function Oc(a, b) {
  a.v = !0;
  xc(function () {
    a.v && Qc.call(null, b)
  })
}
var Qc = Ua;

function Hc(a) {
  Ta.call(this, a)
}
Ra(Hc, Ta);
Hc.prototype.name = "cancel";

function Rc(a, b, c) {
  if ("function" === typeof a) c && (a = Qa(a, c));
  else if (a && "function" == typeof a.handleEvent) a = Qa(a.handleEvent, a);
  else throw Error("Invalid listener argument");
  return 2147483647 < Number(b) ? -1 : A.setTimeout(a, b || 0)
}

function Sc() {
  var a = null;
  return Gc(new Ac(function (b, c) {
    a = Rc(function () {
      b(void 0)
    }, 1E4); - 1 == a && c(Error("Failed to schedule timer."))
  }), function (b) {
    A.clearTimeout(a);
    throw b;
  })
};
var Tc = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");

function Uc(a) {
  Db.call(this);
  this.headers = new Map;
  this.O = a || null;
  this.j = !1;
  this.N = this.g = null;
  this.v = this.Y = "";
  this.u = this.S = this.F = this.R = !1;
  this.M = 0;
  this.K = null;
  this.H = "";
  this.Z = this.ha = !1
}
Ra(Uc, Db);
var Vc = /^https?$/i,
  Wc = ["POST", "PUT"];

function NetworkXhrIo(a, newURI) {
  if (a.g) throw Error("[goog.net.XhrIo] Object is active with another request=" + a.Y + "; newUri=" + newURI);
  a.Y = newURI;
  a.v = "";
  a.R = !1;
  a.j = !0;
  a.g = a.O ? Lb(a.O) : Lb(Jb);
  a.N = a.O ? Hb(a.O) : Hb(Jb);
  a.g.onreadystatechange = Qa(a.Ra, a);
  try {
    a.S = !0, a.g.open("GET", String(newURI), !0), a.S = !1
  } catch (e) {
    Yc(a, e);
    return
  }
  newURI = new Map(a.headers);
  var c = Array.from(newURI.keys()).find(function (e) {
      return "content-type" == e.toLowerCase()
    }),
    d = A.FormData && !1;
  !(0 <= fb(Wc, "GET")) || c || d || newURI.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
  newURI = v(newURI);
  for (c = newURI.next(); !c.done; c = newURI.next()) d = v(c.value), c = d.next().value, d = d.next().value, a.g.setRequestHeader(c, d);
  a.H && (a.g.responseType = a.H);
  "withCredentials" in a.g && a.g.withCredentials !== a.ha && (a.g.withCredentials = a.ha);
  try {
    Zc(a), 0 < a.M && (a.Z = $c(a.g), a.Z ? (a.g.timeout = a.M, a.g.ontimeout = Qa(a.Za, a)) : a.K = Rc(a.Za, a.M, a)), a.F = !0, a.g.send(""), a.F = !1
  } catch (e) {
    Yc(a, e)
  }
}

function $c(a) {
  return isIELegacy && "number" === typeof a.timeout && void 0 !== a.ontimeout
}
t = Uc.prototype;
t.Za = function () {
  "undefined" != typeof La && this.g && (this.v = "Timed out after " + this.M + "ms, aborting", C(this, "timeout"), this.abort(8))
};

function Yc(a, b) {
  a.j = !1;
  a.g && (a.u = !0, a.g.abort(), a.u = !1);
  a.v = b;
  ad(a);
  bd(a)
}

function ad(a) {
  a.R || (a.R = !0, C(a, "complete"), C(a, "error"))
}
t.abort = function () {
  this.g && this.j && (this.j = !1, this.u = !0, this.g.abort(), this.u = !1, C(this, "complete"), C(this, "abort"), bd(this))
};
t.ca = function () {
  this.g && (this.j && (this.j = !1, this.u = !0, this.g.abort(), this.u = !1), bd(this, !0));
  Uc.va.ca.call(this)
};
t.Ra = function () {
  this.D || (this.S || this.F || this.u ? cd(this) : this.sb())
};
t.sb = function () {
  cd(this)
};

function cd(a) {
  if (a.j && "undefined" != typeof La && (!a.N[1] || 4 != dd(a) || 2 != ed(a)))
    if (a.F && 4 == dd(a)) Rc(a.Ra, 0, a);
    else if (C(a, "readystatechange"), 4 == dd(a)) {
    a.j = !1;
    try {
      if (fd(a)) C(a, "complete"), C(a, "success");
      else {
        try {
          var b = 2 < dd(a) ? a.g.statusText : ""
        } catch (c) {
          b = ""
        }
        a.v = b + " [" + ed(a) + "]";
        ad(a)
      }
    } finally {
      bd(a)
    }
  }
}

function bd(a, b) {
  if (a.g) {
    Zc(a);
    var c = a.g,
      d = a.N[0] ? function () {} : null;
    a.g = null;
    a.N = null;
    b || C(a, "ready");
    try {
      c.onreadystatechange = d
    } catch (e) {}
  }
}

function Zc(a) {
  a.g && a.Z && (a.g.ontimeout = null);
  a.K && (A.clearTimeout(a.K), a.K = null)
}
t.isActive = function () {
  return !!this.g
};

function fd(a) {
  var b = ed(a);
  a: switch (b) {
    case 200:
    case 201:
    case 202:
    case 204:
    case 206:
    case 304:
    case 1223:
      var c = !0;
      break a;
    default:
      c = !1
  }
  if (!c) {
    if (b = 0 === b) a = String(a.Y).match(Tc)[1] || null, !a && A.self && A.self.location && (a = A.self.location.protocol.slice(0, -1)), b = !Vc.test(a ? a.toLowerCase() : "");
    c = b
  }
  return c
}

function dd(a) {
  return a.g ? a.g.readyState : 0
}

function ed(a) {
  try {
    return 2 < dd(a) ? a.g.status : -1
  } catch (b) {
    return -1
  }
}

function gd(a) {
  try {
    if (!a.g) return null;
    if ("response" in a.g) return a.g.response;
    switch (a.H) {
      case "":
      case "text":
        return a.g.responseText;
      case "arraybuffer":
        if ("mozResponseArrayBuffer" in a.g) return a.g.mozResponseArrayBuffer
    }
    return null
  } catch (b) {
    return null
  }
};
var hd = new Map;

function getFirmwareURL(a) {
  var b;
  return z(function (c) {
    if (hd.has(a)) return c.return(hd.get(a));
    b = new Promise(function (d, e) {
      var f = new Uc;
      f.H = "arraybuffer";
      Fb(f, function () {
        fd(f) ? d(gd(f)) : e("string" === typeof f.v ? f.v : String(f.v))
      });
      NetworkXhrIo(f, "./data/" + a)
    });
    hd.set(a, b);
    return c.return(b)
  })
};
/*

 SPDX-License-Identifier: Apache-2.0
*/
var jd;
try {
  new URL("s://g"), jd = !0
} catch (a) {
  jd = !1
}
var kd = jd;

function ld(a) {
  if (a instanceof Rb) a = Tb(a);
  else {
    b: if (kd) {
      try {
        var b = new URL(a)
      } catch (c) {
        b = "https:";
        break b
      }
      b = b.protocol
    } else c: {
      b = document.createElement("a");
      try {
        b.href = a
      } catch (c) {
        b = void 0;
        break c
      }
      b = b.protocol;b = ":" === b || "" === b ? "https:" : b
    }
    a = "javascript:" !== b ? a : void 0
  }
  return a
};
var E = {},
  md = {},
  nd = {},
  od = {},
  pd = {};

function sanitizer() {
  throw Error("Do not instantiate directly");
}
sanitizer.prototype.j = null;
sanitizer.prototype.W = function () {
  return this.g
};
sanitizer.prototype.toString = function () {
  return this.g
};
sanitizer.prototype.na = function () {
  if (this.B !== E) throw Error("Sanitized content was not of kind HTML.");
  return dc(this.toString())
};

function rd(a) {
  if (a.B !== md) throw Error("Sanitized content was not of kind URI.");
  return new Rb(a.toString(), Sb)
}

function sd() {
  sanitizer.call(this)
}
Ra(sd, sanitizer);
sd.prototype.B = E;

function td() {
  sanitizer.call(this)
}
Ra(td, sanitizer);
td.prototype.B = md;
td.prototype.j = 1;
var ud = function (a) {
    function b(c) {
      this.g = c
    }
    b.prototype = a.prototype;
    return function (c, d) {
      c = new b(String(c));
      void 0 !== d && (c.j = d);
      return c
    }
  }(sd),
  vd = function (a) {
    function b(c) {
      this.g = c
    }
    b.prototype = a.prototype;
    return function (c) {
      return new b(String(c))
    }
  }(td);

function checkForNull(a) {
  if (null == a) throw Error("unexpected null value");
  return a
}

function wd(a) {
  return a instanceof sanitizer ? !!a.W() : !!a
}

function xd(a) {
  return a.replace(/<\//g, "<\\/").replace(/\]\]>/g, "]]\\>")
}

function H(a) {
  null != a && a.B === md || null != a && a.B === nd ? a = yd(a) : a instanceof Rb ? a = yd(Tb(a)) : a instanceof Rb ? a = yd(Tb(a)) : a instanceof Ob ? a = yd(Qb(a).toString()) : a instanceof Ob ? a = yd(Qb(a).toString()) : (a = String(a), a = zd.test(a) ? a.replace(Ad, Bd) : "about:invalid#zSoyz");
  return a
}

function Cd(a) {
  null != a && a.B === pd ? a = xd(a.W()) : null == a ? a = "" : a instanceof Vb ? a = xd(Wb(a)) : a instanceof Vb ? a = xd(Wb(a)) : a instanceof Yb ? a = xd(Zb(a)) : a instanceof Yb ? a = xd(Zb(a)) : (a = String(a), a = Dd.test(a) ? a : "zSoyz");
  return a
}
var Ed = {
  "\x00": "&#0;",
  "\t": "&#9;",
  "\n": "&#10;",
  "\v": "&#11;",
  "\f": "&#12;",
  "\r": "&#13;",
  " ": "&#32;",
  '"': "&quot;",
  "&": "&amp;",
  "'": "&#39;",
  "-": "&#45;",
  "/": "&#47;",
  "<": "&lt;",
  "=": "&#61;",
  ">": "&gt;",
  "`": "&#96;",
  "\u0085": "&#133;",
  "\u00a0": "&#160;",
  "\u2028": "&#8232;",
  "\u2029": "&#8233;"
};

function Fd(a) {
  return Ed[a]
}
var Gd = {
  "\x00": "%00",
  "\u0001": "%01",
  "\u0002": "%02",
  "\u0003": "%03",
  "\u0004": "%04",
  "\u0005": "%05",
  "\u0006": "%06",
  "\u0007": "%07",
  "\b": "%08",
  "\t": "%09",
  "\n": "%0A",
  "\v": "%0B",
  "\f": "%0C",
  "\r": "%0D",
  "\u000e": "%0E",
  "\u000f": "%0F",
  "\u0010": "%10",
  "\u0011": "%11",
  "\u0012": "%12",
  "\u0013": "%13",
  "\u0014": "%14",
  "\u0015": "%15",
  "\u0016": "%16",
  "\u0017": "%17",
  "\u0018": "%18",
  "\u0019": "%19",
  "\u001a": "%1A",
  "\u001b": "%1B",
  "\u001c": "%1C",
  "\u001d": "%1D",
  "\u001e": "%1E",
  "\u001f": "%1F",
  " ": "%20",
  '"': "%22",
  "'": "%27",
  "(": "%28",
  ")": "%29",
  "<": "%3C",
  ">": "%3E",
  "\\": "%5C",
  "{": "%7B",
  "}": "%7D",
  "\u007f": "%7F",
  "\u0085": "%C2%85",
  "\u00a0": "%C2%A0",
  "\u2028": "%E2%80%A8",
  "\u2029": "%E2%80%A9",
  "\uff01": "%EF%BC%81",
  "\uff03": "%EF%BC%83",
  "\uff04": "%EF%BC%84",
  "\uff06": "%EF%BC%86",
  "\uff07": "%EF%BC%87",
  "\uff08": "%EF%BC%88",
  "\uff09": "%EF%BC%89",
  "\uff0a": "%EF%BC%8A",
  "\uff0b": "%EF%BC%8B",
  "\uff0c": "%EF%BC%8C",
  "\uff0f": "%EF%BC%8F",
  "\uff1a": "%EF%BC%9A",
  "\uff1b": "%EF%BC%9B",
  "\uff1d": "%EF%BC%9D",
  "\uff1f": "%EF%BC%9F",
  "\uff20": "%EF%BC%A0",
  "\uff3b": "%EF%BC%BB",
  "\uff3d": "%EF%BC%BD"
};

function Bd(a) {
  return Gd[a]
}
var Hd = /[\x00\x22\x26\x27\x3c\x3e]/g,
  Id = /[\x00\x22\x27\x3c\x3e]/g,
  Ad = /[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g,
  Dd = /^(?!-*(?:expression|(?:moz-)?binding))(?:(?:[.#]?-?(?:[_a-z0-9-]+)(?:-[_a-z0-9-]+)*-?|(?:rgb|rgba|hsl|hsla|calc|max|min|cubic-bezier)\([-\u0020\t,+.!#%_0-9a-zA-Z]+\)|[-+]?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:e-?[0-9]+)?(?:[a-z]{1,4}|%)?|!important)(?:\s*[,\u0020]\s*|$))*$/i,
  zd = /^(?:(?:https?|mailto|ftp):|[^&:\/?#]*(?:[\/?#]|$))/i;

function yd(a) {
  return String(a).replace(Ad, Bd)
}
var Jd = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g,
  Kd = /</g;
var GOOGLE_STAFF = true;

function checkIfGoogleStaff() {
  return GOOGLE_STAFF
}
var Nd = void 0;

function Od() {
  void 0 === Nd && (Nd = !1);
  return Nd
};

function Pd() {
  return vd("https://policies.google.com/terms")
}

function Qd() {
  return vd("https://www.google.com/chrome/terms/")
}

function Rd() {
  var url = "https://support.google.com/stadia?p=controllerconnect";
  // var a = checkIfGoogleStaff() ? "http://go/gotham-ble-howto" : "https://support.google.com/stadia?p=controllerconnect";
  return vd(url)
}

function Sd() {
  var url = "https://support.google.com/stadia?p=controllerconnect#devicelist";
  // var a = checkIfGoogleStaff() ? "http://go/gotham-ble-howto#bookmark=id.hyltxa1q9n1w" : "https://support.google.com/stadia?p=controllerconnect#devicelist";
  return vd(url)
};
/*
 SPDX-License-Identifier: Apache-2.0 */
var Td = "key";
var Ud = Object.prototype.hasOwnProperty;

function Vd() {}
Vd.prototype = Object.create(null);

function Wd(a, b) {
  for (; a.length > b;) a.pop()
}

function Xd(a) {
  a = Array(a);
  Wd(a, 0);
  return a
};

function Yd(a, b, c) {
  a = a.style;
  if ("string" === typeof c) a.cssText = c;
  else {
    a.cssText = "";
    for (var d in c) Ud.call(c, d) && (b = c[d], 0 <= d.indexOf("-") ? a.setProperty(d, b) : a[d] = b)
  }
}

function Zd(a, b, c) {
  var d = typeof c;
  "object" === d || "function" === d ? a[b] = c : null == c ? a.removeAttribute(b) : (d = 0 === b.lastIndexOf("xml:", 0) ? "http://www.w3.org/XML/1998/namespace" : 0 === b.lastIndexOf("xlink:", 0) ? "http://www.w3.org/1999/xlink" : null) ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)
}

function $d() {
  var a = new Vd;
  a.__default = Zd;
  a.style = Yd;
  return a
}
var ae = $d();

function be(a, b, c, d) {
  (d[b] || d.__default)(a, b, c)
};

function ce() {
  this.g = [];
  this.j = []
};
var de = "undefined" !== typeof Node && Node.prototype.getRootNode || function () {
  for (var a = this, b = a; a;) b = a, a = a.parentNode;
  return b
};

function ee(a, b) {
  this.g = null;
  this.s = !1;
  this.j = a;
  this.key = b;
  this.text = void 0
}

function fe(a, b, c) {
  b = new ee(b, c);
  return a.__incrementalDOMData = b
}

function ge(a, b) {
  if (a.__incrementalDOMData) return a.__incrementalDOMData;
  var c = 1 === a.nodeType ? a.localName : a.nodeName,
    d = Td;
  d = 1 === a.nodeType && null != d ? a.getAttribute(d) : null;
  b = fe(a, c, 1 === a.nodeType ? d || b : null);
  if (1 === a.nodeType && (a = a.attributes, c = a.length)) {
    d = b.g || (b.g = Xd(c));
    for (var e = 0, f = 0; e < c; e += 1, f += 2) {
      var g = a[e],
        h = g.value;
      d[f] = g.name;
      d[f + 1] = h
    }
  }
  return b
};

function he(a, b, c, d, e) {
  return b == c && d == e
}
var ie = null,
  I = null,
  J = null,
  je = null,
  ke = [],
  le = he,
  me = [];

function ne(a) {
  for (var b = J, c = oe(); c !== a;) {
    var d = c.nextSibling;
    b.removeChild(c);
    ie.j.push(c);
    c = d
  }
}

function oe() {
  return I ? I.nextSibling : J.firstChild
}

function pe(a, b) {
  I = oe();
  var c;
  a: {
    if (c = I) {
      do {
        var d = c,
          e = a,
          f = b,
          g = ge(d, f);
        if (le(d, e, g.j, f, g.key)) break a
      } while (b && (c = c.nextSibling))
    }
    c = null
  }
  c || ("#text" === a ? (a = je.createTextNode(""), fe(a, "#text", null)) : (c = je, d = J, "function" === typeof a ? c = new a : c = (d = "svg" === a ? "http://www.w3.org/2000/svg" : "math" === a ? "http://www.w3.org/1998/Math/MathML" : null == d || "foreignObject" === ge(d).j ? null : d.namespaceURI) ? c.createElementNS(d, a) : c.createElement(a), fe(c, a, b), a = c), ie.g.push(a), c = a);
  a = c;
  if (a !== I) {
    if (0 <= ke.indexOf(a))
      for (b = J,
        c = a.nextSibling, d = I; null !== d && d !== a;) e = d.nextSibling, b.insertBefore(d, c), d = e;
    else J.insertBefore(a, I);
    I = a
  }
}

function qe(a, b) {
  pe(a, b);
  J = I;
  I = null;
  return J
}

function re() {
  ne(null);
  I = J;
  J = J.parentNode;
  return I
}

function se(a, b) {
  b = void 0 === b ? {} : b;
  var c = void 0 === b.matches ? he : b.matches;
  return function (d, e, f) {
    var g = ie,
      h = je,
      k = ke,
      l = me,
      n = I,
      p = J,
      q = le;
    je = d.ownerDocument;
    ie = new ce;
    le = c;
    me = [];
    I = null;
    var w = J = d.parentNode,
      m, r = de.call(d);
    if ((m = 11 === r.nodeType || 9 === r.nodeType ? r.activeElement : null) && d.contains(m)) {
      for (r = []; m !== w;) r.push(m), m = m.parentNode || (w ? m.host : null);
      w = r
    } else w = [];
    ke = w;
    try {
      return a(d, e, f)
    } finally {
      je = h, ie = g, le = q, me = l, I = n, J = p, ke = k
    }
  }
};
var K = [],
  te = 0;

function ue(a, b, c, d) {
  K.push(be);
  K.push(a);
  K.push(b);
  K.push(c);
  K.push(d)
};
var ve = new Vd;
var we = new Vd;

function xe(a) {
  a = void 0 === a ? ae : a;
  var b = J,
    c = ge(b),
    d = a;
  a = me;
  c = c.g || (c.g = Xd(a.length));
  for (var e = !c.length || !1, f = 0; f < a.length; f += 2) {
    var g = a[f];
    if (e) c[f] = g;
    else if (c[f] !== g) break;
    var h = a[f + 1];
    if (e || c[f + 1] !== h) c[f + 1] = h, ue(b, g, h, d)
  }
  if (f < a.length || f < c.length) {
    for (f = e = f; f < c.length; f += 2) ve[c[f]] = c[f + 1];
    for (f = e; f < a.length; f += 2) e = a[f], g = a[f + 1], ve[e] !== g && ue(b, e, g, d), c[f] = e, c[f + 1] = g, delete ve[e];
    Wd(c, a.length);
    for (var k in ve) ue(b, k, void 0, d), delete ve[k]
  }
  b = te;
  te = k = K.length;
  for (d = b; d < k; d += 5)(0, K[d])(K[d + 1], K[d +
    2], K[d + 3], K[d + 4]);
  te = b;
  Wd(K, b);
  Wd(a, 0)
}

function ye(a) {
  pe("#text", null);
  var b = I;
  var c = ge(b);
  if (c.text !== a) {
    c = c.text = a;
    for (var d = 1; d < arguments.length; d += 1) c = (0, arguments[d])(c);
    b.data !== c && (b.data = c)
  }
  return b
};
var ze = $d();

function Ae(a, b, c) {
  b = ld(b);
  return void 0 !== b ? a.open(b, c, void 0) : null
};
var Be = {
    matches: function (a, b, c, d, e) {
      return b === c && ("string" === typeof d && "string" === typeof e ? d.startsWith(e) || e.startsWith(d) : d == e)
    }
  },
  Ce = function (a) {
    return se(function (b, c, d) {
      J = I = b;
      I = null;
      c(d);
      ne(null);
      I = J;
      J = J.parentNode;
      return b
    }, a)
  }(Be),
  De = function (a) {
    return se(function (b, c, d) {
      var e = {
        nextSibling: b
      };
      I = e;
      c(d);
      J && ne(b.nextSibling);
      return e === I ? null : I
    }, a)
  }(Be);

function Ee() {
  this.X = []
}
t = Ee.prototype;
t.open = function (a, b) {
  return qe(a, this.ua(b))
};
t.m = function (a) {
  var b = this.ta();
  this.X[this.X.length - 1] = this.ua(a);
  return b
};
t.ua = function (a) {
  var b = this.ta();
  if (void 0 === a) a = b;
  else {
    var c = String(a);
    a = "" + c.length + (null == a ? "_" : "number" === typeof a ? "#" : ":") + c + b
  }
  return a
};
t.l = function (a) {
  this.X[this.X.length - 1] = a
};
t.ta = function () {
  return this.X[this.X.length - 1] || ""
};
t.close = function () {
  return re()
};
t.G = function () {
  var a = this.close();
  a && a.__soy_patch_handler && a.__soy_patch_handler()
};
t.text = function (a) {
  if (a) return ye(a)
};
t.o = function (a, b) {
  var c = me;
  c.push(a);
  c.push(b)
};
t.Ha = function () {
  return oe()
};
t.Fa = function () {
  return J
};
t.Xa = function () {
  I = oe()
};
t.h = function () {
  xe(ze)
};
t.i = function (a) {
  var b = ze;
  b = void 0 === b ? ae : b;
  var c = J;
  var d = ge(c);
  if (!d.s && (d.s = !0, a && a.length)) {
    var e = d.g;
    if (e && e.length) {
      for (e = 0; e < a.length; e += 2) we[a[e]] = e + 1;
      d = d.g || (d.g = Xd(0));
      for (var f = e = 0; f < d.length; f += 2) {
        var g = d[f],
          h = d[f + 1],
          k = we[g];
        k ? a[k] === h && delete we[g] : (d[e] = g, d[e + 1] = h, e += 2)
      }
      Wd(d, e);
      for (var l in we) be(c, l, a[we[l]], b), delete we[l]
    } else
      for (l = 0; l < a.length; l += 2) be(c, a[l], a[l + 1], b)
  }
};

function Fe() {
  this.g = !1
}
t = Fe.prototype;
t.m = function () {
  return ""
};
t.ua = function () {
  return ""
};
t.l = function () {};
t.ta = function () {
  return ""
};
t.open = function () {
  this.g = !0
};
t.close = function () {
  this.g = !0
};
t.G = function () {
  this.g = !0
};
t.text = function (a) {
  a && (this.g = !0)
};
t.o = function () {
  this.g = !0
};
t.Ha = function () {
  return null
};
t.h = function () {
  this.g = !0
};
t.i = function () {
  this.g = !0
};
t.key = function () {};
t.Fa = function () {};
t.Xa = function () {
  this.g = !0
};
const CURRENCIES = {
  AED: [2, "dh", "\u062f.\u0625."],
  ALL: [0, "Lek", "Lek"],
  AUD: [2, "$", "AU$"],
  BDT: [2, "\u09f3", "Tk"],
  BGN: [2, "lev", "lev"],
  BRL: [2, "R$", "R$"],
  CAD: [2, "$", "C$"],
  CDF: [2, "FrCD", "CDF"],
  CHF: [2, "CHF", "CHF"],
  CLP: [0, "$", "CL$"],
  CNY: [2, "\u00a5", "RMB\u00a5"],
  COP: [32, "$", "COL$"],
  CRC: [0, "\u20a1", "CR\u20a1"],
  CZK: [50, "K\u010d", "K\u010d"],
  DKK: [50, "kr.", "kr."],
  DOP: [2, "RD$", "RD$"],
  EGP: [2, "\u00a3", "LE"],
  ETB: [2, "Birr", "Birr"],
  EUR: [2, "\u20ac", "\u20ac"],
  GBP: [2, "\u00a3", "GB\u00a3"],
  HKD: [2, "$", "HK$"],
  HRK: [2, "kn", "kn"],
  HUF: [34,
    "Ft", "Ft"
  ],
  IDR: [0, "Rp", "Rp"],
  ILS: [34, "\u20aa", "IL\u20aa"],
  INR: [2, "\u20b9", "Rs"],
  IRR: [0, "Rial", "IRR"],
  ISK: [0, "kr", "kr"],
  JMD: [2, "$", "JA$"],
  JPY: [0, "\u00a5", "JP\u00a5"],
  KRW: [0, "\u20a9", "KR\u20a9"],
  LKR: [2, "Rs", "SLRs"],
  LTL: [2, "Lt", "Lt"],
  MNT: [0, "\u20ae", "MN\u20ae"],
  MVR: [2, "Rf", "MVR"],
  MXN: [2, "$", "Mex$"],
  MYR: [2, "RM", "RM"],
  NOK: [50, "kr", "NOkr"],
  PAB: [2, "B/.", "B/."],
  PEN: [2, "S/.", "S/."],
  PHP: [2, "\u20b1", "PHP"],
  PKR: [0, "Rs", "PKRs."],
  PLN: [50, "z\u0142", "z\u0142"],
  RON: [2, "RON", "RON"],
  RSD: [0, "din", "RSD"],
  RUB: [50, "\u20bd",
    "RUB"
  ],
  SAR: [2, "SAR", "SAR"],
  SEK: [50, "kr", "kr"],
  SGD: [2, "$", "S$"],
  THB: [2, "\u0e3f", "THB"],
  TRY: [2, "\u20ba", "TRY"],
  TWD: [2, "$", "NT$"],
  TZS: [0, "TSh", "TSh"],
  UAH: [2, "\u0433\u0440\u043d.", "UAH"],
  USD: [2, "$", "US$"],
  UYU: [2, "$", "$U"],
  VND: [48, "\u20ab", "VN\u20ab"],
  YER: [0, "Rial", "Rial"],
  ZAR: [2, "R", "ZAR"]
};
var He = {
    bb: ".",
    xa: ",",
    hb: "%",
    za: "0",
    jb: "+",
    ya: "-",
    cb: "E",
    ib: "\u2030",
    eb: "\u221e",
    gb: "NaN",
    ab: "#,##0.###",
    Ab: "#E0",
    zb: "#,##0%",
    yb: "\u00a4#,##0.00",
    wa: "USD"
  },
  L = He;
L = He;

function Ie() {
  this.F = 40;
  this.g = 1;
  this.j = 3;
  this.I = this.s = 0;
  this.S = !1;
  this.O = this.N = "";
  this.H = L.ya;
  this.K = "";
  this.u = 1;
  this.D = !1;
  this.v = [];
  this.M = this.R = !1;
  var a = L.ab,
    b = [0];
  this.N = Je(this, a, b);
  for (var c = b[0], d = -1, e = 0, f = 0, g = 0, h = -1, k = a.length, l = !0; b[0] < k && l; b[0]++) switch (a.charAt(b[0])) {
    case "#":
      0 < f ? g++ : e++;
      0 <= h && 0 > d && h++;
      break;
    case "0":
      if (0 < g) throw Error('Unexpected "0" in pattern "' + a + '"');
      f++;
      0 <= h && 0 > d && h++;
      break;
    case ",":
      0 < h && this.v.push(h);
      h = 0;
      break;
    case ".":
      if (0 <= d) throw Error('Multiple decimal separators in pattern "' +
        a + '"');
      d = e + f + g;
      break;
    case "E":
      if (this.M) throw Error('Multiple exponential symbols in pattern "' + a + '"');
      this.M = !0;
      this.I = 0;
      b[0] + 1 < k && "+" == a.charAt(b[0] + 1) && (b[0]++, this.S = !0);
      for (; b[0] + 1 < k && "0" == a.charAt(b[0] + 1);) b[0]++, this.I++;
      if (1 > e + f || 1 > this.I) throw Error('Malformed exponential pattern "' + a + '"');
      l = !1;
      break;
    default:
      b[0]--, l = !1
  }
  0 == f && 0 < e && 0 <= d && (f = d, 0 == f && f++, g = e - f, e = f - 1, f = 1);
  if (0 > d && 0 < g || 0 <= d && (d < e || d > e + f) || 0 == h) throw Error('Malformed pattern "' + a + '"');
  g = e + f + g;
  this.j = 0 <= d ? g - d : 0;
  0 <= d && (this.s = e +
    f - d, 0 > this.s && (this.s = 0));
  this.g = (0 <= d ? d : g) - e;
  this.M && (this.F = e + this.g, 0 == this.j && 0 == this.g && (this.g = 1));
  this.v.push(Math.max(0, h));
  this.R = 0 == d || d == g;
  c = b[0] - c;
  this.O = Je(this, a, b);
  b[0] < a.length && ";" == a.charAt(b[0]) ? (b[0]++, 1 != this.u && (this.D = !0), this.H = Je(this, a, b), b[0] += c, this.K = Je(this, a, b)) : (this.H += this.N, this.K += this.O)
}

function Ke(a, b, c, d) {
  if (a.s > a.j) throw Error("Min value must be less than max value");
  d || (d = []);
  var e = O(b, a.j);
  e = Math.round(e);
  isFinite(e) ? (b = Math.floor(O(e, -a.j)), e = Math.floor(e - O(b, a.j))) : e = 0;
  var f = b;
  var g = e;
  var h = 0 < a.s || 0 < g || !1;
  e = a.s;
  h && (e = a.s);
  var k = "";
  for (b = f; 1E20 < b;) k = "0" + k, b = Math.round(O(b, -1));
  k = b + k;
  var l = L.bb;
  b = L.za.charCodeAt(0);
  var n = k.length,
    p = 0;
  if (0 < f || 0 < c) {
    for (f = n; f < c; f++) d.push(String.fromCharCode(b));
    if (2 <= a.v.length)
      for (c = 1; c < a.v.length; c++) p += a.v[c];
    c = n - p;
    if (0 < c) {
      f = a.v;
      p = n = 0;
      for (var q,
          w = L.xa, m = k.length, r = 0; r < m; r++)
        if (d.push(String.fromCharCode(b + Number(k.charAt(r)))), 1 < m - r)
          if (q = f[p], r < c) {
            var F = c - r;
            (1 === q || 0 < q && 1 === F % q) && d.push(w)
          } else p < f.length && (r === c ? p += 1 : q === r - c - n + 1 && (d.push(w), n += q, p += 1))
    } else {
      c = k;
      k = a.v;
      f = L.xa;
      q = c.length;
      w = [];
      for (n = k.length - 1; 0 <= n && 0 < q; n--) {
        p = k[n];
        for (m = 0; m < p && 0 <= q - m - 1; m++) w.push(String.fromCharCode(b + Number(c.charAt(q - m - 1))));
        q -= p;
        0 < q && w.push(f)
      }
      d.push.apply(d, w.reverse())
    }
  } else h || d.push(String.fromCharCode(b));
  (a.R || h) && d.push(l);
  h = String(g);
  g = h.split("e+");
  if (2 == g.length) {
    if (h = parseFloat(g[0])) {
      l = h;
      if (isFinite(l)) {
        for (c = 0; 1 <= (l /= 10);) c++;
        l = c
      } else l = 0 < l ? l : 0;
      l = -l - 1;
      h = -1 > l ? h && isFinite(h) ? O(Math.round(O(h, -1)), 1) : h : h && isFinite(h) ? O(Math.round(O(h, l)), -l) : h
    }
    h = String(h);
    h = h.replace(".", "");
    h += kc("0", parseInt(g[1], 10) - h.length + 1)
  }
  a.j + 1 > h.length && (h = "1" + kc("0", a.j - h.length) + h);
  for (a = h.length;
    "0" == h.charAt(a - 1) && a > e + 1;) a--;
  for (e = 1; e < a; e++) d.push(String.fromCharCode(b + Number(h.charAt(e))))
}

function Le(a, b, c) {
  c.push(L.cb);
  0 > b ? (b = -b, c.push(L.ya)) : a.S && c.push(L.jb);
  b = "" + b;
  for (var d = L.za, e = b.length; e < a.I; e++) c.push(d);
  c.push(b)
}

function Je(a, b, c) {
  for (var d = "", e = !1, f = b.length; c[0] < f; c[0]++) {
    var g = b.charAt(c[0]);
    if ("'" == g) c[0] + 1 < f && "'" == b.charAt(c[0] + 1) ? (c[0]++, d += "'") : e = !e;
    else if (e) d += g;
    else switch (g) {
      case "#":
      case "0":
      case ",":
      case ".":
      case ";":
        return d;
      case "\u00a4":
        c[0] + 1 < f && "\u00a4" == b.charAt(c[0] + 1) ? (c[0]++, d += L.wa) : (g = L.wa, d += g in CURRENCIES ? CURRENCIES[g][1] : g);
        break;
      case "%":
        if (!a.D && 1 != a.u) throw Error("Too many percent/permill");
        if (a.D && 100 != a.u) throw Error("Inconsistent use of percent/permill characters");
        a.u = 100;
        a.D = !1;
        d += L.hb;
        break;
      case "\u2030":
        if (!a.D && 1 != a.u) throw Error("Too many percent/permill");
        if (a.D && 1E3 != a.u) throw Error("Inconsistent use of percent/permill characters");
        a.u = 1E3;
        a.D = !1;
        d += L.ib;
        break;
      default:
        d += g
    }
  }
  return d
}
var Me = {
  kb: 0,
  Pa: "",
  Qa: "",
  prefix: "",
  Ya: ""
};

function O(a, b) {
  if (!a || !isFinite(a) || 0 == b) return a;
  a = String(a).split("e");
  return parseFloat(a[0] + "e" + (parseInt(a[1] || 0, 10) + b))
};

function Ne(a) {
  var b = new Ie;
  if (b.s > b.j) throw Error("Min value must be less than max value");
  if (isNaN(a)) b = L.gb;
  else {
    var c = [];
    a = O(a, -Me.kb);
    var d = 0 > a || 0 == a && 0 > 1 / a;
    d ? Me.Pa ? c.push(Me.Pa) : (c.push(Me.prefix), c.push(b.H)) : (c.push(Me.prefix), c.push(b.N));
    if (isFinite(a))
      if (a = a * (d ? -1 : 1) * b.u, b.M) {
        var e = a;
        if (0 == e) Ke(b, e, b.g, c), Le(b, 0, c);
        else {
          var f = Math.floor(Math.log(e) / Math.log(10) + 2E-15);
          e = O(e, -f);
          var g = b.g;
          1 < b.F && b.F > b.g ? (g = f % b.F, 0 > g && (g = b.F + g), e = O(e, g), f -= g, g = 1) : 1 > b.g ? (f++, e = O(e, -1)) : (f -= b.g - 1, e = O(e, b.g -
            1));
          Ke(b, e, g, c);
          Le(b, f, c)
        }
      } else Ke(b, a, b.g, c);
    else c.push(L.eb);
    d ? Me.Qa ? c.push(Me.Qa) : (isFinite(a) && c.push(Me.Ya), c.push(b.K)) : (isFinite(a) && c.push(Me.Ya), c.push(b.O));
    b = c.join("")
  }
  return b
};
/*
 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var Oe = new Ee,
  Pe = new Ee;
ze.checked = function (a, b, c) {
  null == c ? (a.removeAttribute("checked"), a.checked = !1) : (a.setAttribute("checked", String(c)), a.checked = !(!1 === c || "false" === c))
};
ze.value = function (a, b, c) {
  null == c ? (a.removeAttribute("value"), a.value = "") : (a.setAttribute("value", String(c)), a.value = String(c))
};
Td = "ssk";

function P(a) {
  function b(c) {
    c = void 0 === c ? Oe : c;
    a(c)
  }
  b.Ma = function (c) {
    c = void 0 === c ? Oe : c;
    a(c)
  };
  b.toString = function (c) {
    c = void 0 === c ? Pe : c;
    return Qe(a, c)
  };
  b.W = b.toString;
  b.B = E;
  b.na = function () {
    return ud(b.W()).na()
  };
  b.Oa = !0;
  return b
}

function Qe(a, b) {
  b = void 0 === b ? Pe : b;
  var c = document.createElement("div");
  Ce(c, function () {
    a(b)
  });
  return c.innerHTML
}

function Re(a) {
  return function () {
    qe("div");
    a(Oe);
    xe();
    re()
  }
}

function Se(a) {
  var b = document.createElement("div");
  De(b, Re(a));
  a = [];
  for (var c = 0; c < b.attributes.length; c++)
    if ("" === b.attributes[c].value) a.push(b.attributes[c].name);
    else {
      var d = a,
        e = d.push,
        f = b.attributes[c].name + "='",
        g = b.attributes[c].value;
      null != g && g.B === E ? (g = g.W(), g = String(g).replace(Jd, "").replace(Kd, "&lt;"), g = String(g).replace(Id, Fd)) : g = String(g).replace(Hd, Fd);
      e.call(d, f + g + "'")
    } return a.sort().join(" ")
}

function Te(a) {
  return (a = a.B) && (a === E || a === od)
}

function R(a, b, c, d) {
  if (Te(b)) switch (b.B) {
    case E:
      b(a, c, d, void 0);
      break;
    case od:
      var e = Se(function () {
        b(Oe, c, d, void 0)
      });
      a.text(e);
      break;
    default:
      throw Error("Bad content kind");
  } else e = b(c, d, void 0), a.text(String(e))
}

function S(a, b) {
  if (b instanceof sd || b instanceof ac) {
    var c = b instanceof ac ? bc(b).toString() : String(b);
    if (/&|</.test(c)) {
      var d = document.createElement("html-blob");
      a: if (c = ud(c), Na(c)) {
        if (c.na && (c = c.na(), c instanceof ac)) break a;
        c = cc("zSoyz")
      } else c = cc(String(c));
      gc(d, c);
      d = Array.from(d.childNodes);
      d = v(d);
      for (c = d.next(); !c.done; c = d.next()) {
        c = c.value;
        var e = a.Ha(),
          f = a.Fa();
        c.__originalContent = b;
        f && (e ? e.__originalContent !== b && f.insertBefore(c, e) : f.appendChild(c));
        a.Xa()
      }
    } else a.text(c)
  } else void 0 !== b &&
    (b && b.Oa ? b.Ma(a) : a.text(String(b)))
}

function T(a) {
  if (!a) return !1;
  if (a.Oa) {
    var b = new Fe;
    a.Ma(b);
    return b.g
  }
  return a instanceof sanitizer ? !!a.W() : "object" !== typeof a ? !!String(a) : !0
};
var Ue = void 0;

function Ve(a, b) {
  var c = "";
  a = checkForNull(a).split(".", 2);
  c += H(a[0] + "_" + b + "." + a[1]);
  return vd(c)
}

function We(a) {
  var b = new Ee,
    c = a.vb,
    d = a.Ja,
    e = a.Wa,
    f = a.ga,
    g = a.Ka,
    h = a.locale,
    k = a.ra,
    l = a.Ua,
    n = a.sa,
    p = void 0 === c ? !1 : c;
  d = void 0 === d ? !1 : d;
  c = a.xb;
  var q = a.wb;
  a = a.ob;
  e = void 0 === e ? !1 : e;
  f = void 0 === f ? !1 : f;
  g = void 0 === g ? !1 : g;
  b.open("div", "UP9hZb");
  b.i(Xe || (Xe = ["id", "app-container"]));
  b.o("class", "AppContainer" + (g ? " panelBottomBarDocked" : ""));
  b.h();
  p && (b.open("div", "GJmiBd"), b.i(Ye || (Ye = ["class", "Scrim"])), b.h(), b.close());
  checkIfGoogleStaff() && (b.open("div", "rQUyAb"), b.i(Ze || (Ze = ["class", "WarningBanner"])), b.h(), b.text(""),
    b.close());
  if (k) {
    b.open("div", "kddDV");
    b.i($e || ($e = ["class", "WarningBanner"]));
    b.h();
    b.text("This page is currently configured to flash");
    switch (Na(k) ? k.toString() : k) {
      case "dev":
        b.text(" DVT devices with dev-signed firmware.");
        break;
      case "dvt":
        b.text(" DVT devices with stage-signed firmware.");
        break;
      default:
        b.text(" PVT devices with prod-signed firmware.")
    }
    b.text(" To enable automatic firmware selection, remove the device_type url parameter.");
    b.close()
  }
  if (k = !l && !Od()) g = b.m("UfInJc"), b.open("header",
    "jRXaod"), b.i(af || (af = ["class", "TopNav"])), b.h(), b.open("div", "NBYCd"), b.i(bf || (bf = ["class", "LogoArea"])), b.h(), b.open("img", "yk7Tqc"), b.i(cf || (cf = ["class", "TopNavLogo", "src", "assets/logo-dark.svg"])), b.o("alt", "Stadia"), b.h(), b.close(), b.open("div", "ZRMrHe"), b.i(df || (df = ["class", "Divider"])), b.h(), b.close(), b.open("div", "rQ5pWc"), b.i(ef || (ef = ["class", "ProductName"])), b.h(), b.text(D("Bluetooth\u00ae mode")), b.close(), b.close(), e && (p = b.m("yIFP1b"), ff(b), b.l(p)), b.G(), b.l(g);
  b.open("div", "Blfkpf");
  b.i(gf || (gf = ["id", "main-scroll-container"]));
  b.o("class", "PageContents " + (k ? " page-home" : ""));
  b.h();
  k && (b.open("div", "a8hO0d"), b.i(hf || (hf = ["class", "BTRing BTRing__Small"])), b.h(), b.close(), b.open("div", "Z51mtf"), b.i(jf || (jf = ["class", "BTRing BTRing__Medium"])), b.h(), b.close(), b.open("div", "xcV2b"), b.i(kf || (kf = ["class", "BTRing BTRing__Large"])), b.h(), b.close());
  b.open("main", "o1GZpe");
  b.i(lf || (lf = ["aria-live", "polite"]));
  b.h();
  Od() ? (l = b.m("oFFLke"), mf(b), b.l(l)) : l ? wd(c) && !q ? (c = b.m("Wn3c8c"), l(b, {
    locale: h,
    ga: f
  }, void 0), b.l(c)) : a ? q ? (l = b.m("SsHKhd"), nf(b), b.l(l)) : (l = b.m("TZl2df"), of (b), b.l(l)) : (l = b.m("QTNRqe"), pf(b), b.l(l)) : (l = b.m("qmdSJc"), qf(b), b.l(l));
  b.close();
  l = b.m("UkUCbf");
  b.open("footer", "AzCefc");
  b.i(rf || (rf = ["class", "Footer"]));
  b.h();
  b.open("div", "Ud4sec");
  b.i(sf || (sf = ["class", "FooterContent"]));
  b.h();
  b.open("div", "uFqgxe");
  b.i(tf || (tf = ["class", "FooterLeft"]));
  b.h();
  b.open("img", "TP4smb");
  b.i(uf || (uf = ["class", "FooterLogo", "src", "assets/logo-dark.svg"]));
  b.o("alt", "Stadia");
  b.h();
  b.close();
  b.open("div", "WshlE");
  b.i(vf || (vf = ["class", "FooterLinks"]));
  b.h();
  b.open("div", "IYF5Pc");
  b.i(wf || (wf = ["class", "FooterLink"]));
  b.h();
  b.open("a", "oeiPz");
  b.i(xf || (xf = ["target", "_blank"]));
  c = b.o;
  q = vd("https://policies.google.com/privacy");
  c.call(b, "href", H(q));
  b.h();
  b.text(D("Privacy"));
  b.close();
  b.close();
  b.open("div", "RneHN");
  b.i(yf || (yf = ["class", "FooterLink"]));
  b.h();
  b.open("a", "wzSlue");
  b.i(zf || (zf = ["target", "_blank"]));
  b.o("href", H(Pd()));
  b.h();
  b.text(D("Terms"));
  b.close();
  b.close();
  b.close();
  b.close();
  b.open("div", "D8fNIe");
  b.i(Af || (Af = ["class", "FooterLanguage"]));
  b.h();
  c = b.m("vzHlje");
  b.open("select", "Z5AGAb");
  b.i(Bf || (Bf = "id language-selector class LanguageSelect jsaction change:languageSelected".split(" ")));
  b.o("aria-label", "Select language");
  b.h();
  b.open("option", "oNJ9yf");
  changeLanguage(b, "ca", h);
  b.h();
  b.text("Catal\u00e0");
  b.close();
  b.open("option", "jkkPib");
  changeLanguage(b, "cs", h);
  b.h();
  b.text("\u010ce\u0161tina");
  b.close();
  b.open("option", "Q3EJNe");
  changeLanguage(b, "da", h);
  b.h();
  b.text("Dansk");
  b.close();
  b.open("option", "Honiff");
  changeLanguage(b, "nl", h);
  b.h();
  b.text("Nederlands");
  b.close();
  b.open("option", "ly9YNb");
  changeLanguage(b, "en-GB", h);
  b.h();
  b.text("English (United Kingdom)");
  b.close();
  b.open("option", "OU7j2b");
  changeLanguage(b, "en-US", h);
  b.h();
  b.text("English (United States)");
  b.close();
  b.open("option", "mzPAnf");
  changeLanguage(b, "fi", h);
  b.h();
  b.text("Suomi");
  b.close();
  b.open("option", "M22Unf");
  changeLanguage(b, "fr", h);
  b.h();
  b.text("Fran\u00e7ais");
  b.close();
  b.open("option", "LxNFab");
  changeLanguage(b, "fr-CA", h);
  b.h();
  b.text("Fran\u00e7ais (Canada)");
  b.close();
  b.open("option", "WJUupc");
  changeLanguage(b, "de",
    h);
  b.h();
  b.text("Deutsch");
  b.close();
  b.open("option", "kUyFye");
  changeLanguage(b, "hu", h);
  b.h();
  b.text("Magyar");
  b.close();
  b.open("option", "q9MJ7d");
  changeLanguage(b, "it", h);
  b.h();
  b.text("Italiano");
  b.close();
  b.open("option", "hbu1vd");
  changeLanguage(b, "no", h);
  b.h();
  b.text("Norsk");
  b.close();
  b.open("option", "c9pBbb");
  changeLanguage(b, "pl", h);
  b.h();
  b.text("Polski");
  b.close();
  b.open("option", "Zne7lc");
  changeLanguage(b, "pt-PT", h);
  b.h();
  b.text("Portugu\u00eas (Portugal)");
  b.close();
  b.open("option", "liMFJd");
  changeLanguage(b, "ro", h);
  b.h();
  b.text("Rom\u00e2n\u0103");
  b.close();
  b.open("option",
    "MOmFkd");
  changeLanguage(b, "sk", h);
  b.h();
  b.text("Sloven\u010dina");
  b.close();
  b.open("option", "fRHVVe");
  changeLanguage(b, "es", h);
  b.h();
  b.text("Espa\u00f1ol");
  b.close();
  b.open("option", "L4mgDb");
  changeLanguage(b, "es-419", h);
  b.h();
  b.text("Espa\u00f1ol (Latinoam\u00e9rica)");
  b.close();
  b.open("option", "XY1Nhf");
  changeLanguage(b, "sv", h);
  b.h();
  b.text("Svenska");
  b.close();
  b.open("option", "xC9HGd");
  changeLanguage(b, "tr", h);
  b.h();
  b.text("T\u00fcrk\u00e7e");
  b.close();
  b.G();
  b.l(c);
  b.close();
  b.close();
  b.G();
  b.l(l);
  b.close();
  n && (h = b.m("h8yHfc"), n(b, {
    qa: d
  }, void 0), b.l(h));
  b.G()
}
We.B = E;
var Xe, Ye, Ze, $e, gf, hf, jf, kf, lf, af, bf, cf, df, ef, rf, sf, tf, uf, vf, wf, xf, yf, zf, Af, Bf;

function changeLanguage(a, b, c) {
  var d = a.o;
  void 0 === Ue && (Ue = (new Map).set(checkForNull("ca"), "index_ca.html").set(checkForNull("cs"), "index_cs.html").set(checkForNull("da"), "index_da.html").set(checkForNull("nl"), "index_nl.html").set(checkForNull("en-GB"), "index_en_GB.html").set(checkForNull("en-US"), "index_en_US.html").set(checkForNull("fi"), "index_fi.html").set(checkForNull("fr"), "index_fr.html").set(checkForNull("fr-CA"), "index_fr_CA.html").set(checkForNull("de"), "index_de.html").set(checkForNull("hu"), "index_hu.html").set(checkForNull("it"), "index_it.html").set(checkForNull("no"), "index_no.html").set(checkForNull("pl"), "index_pl.html").set(checkForNull("pt-PT"), "index_pt_PT.html").set(checkForNull("ro"),
    "index_ro.html").set(checkForNull("sk"), "index_sk.html").set(checkForNull("es"), "index_es.html").set(checkForNull("es-419"), "index_es_419.html").set(checkForNull("sv"), "index_sv.html").set(checkForNull("tr"), "index_tr.html"));
  d.call(a, "value", "" + Ue.get(b));
  c == b && a.o("selected", "")
}

function qf(a) {
  a.open("div", "Bhvrjb");
  a.i(Cf || (Cf = ["class", "Grid MainContentContainer"]));
  a.h();
  a.open("div", "c45mdb");
  a.i(Df || (Df = ["class", "HeroContentContainer GridSpanFull"]));
  a.h();
  a.open("div", "DcB2Ic");
  a.i(Ef || (Ef = ["class", "HeroContent"]));
  a.h();
  a.open("img", "uP3uDd");
  a.i(Ff || (Ff = "class LogoMark width 48 height 32 type image/svg src assets/logo-mark.svg".split(" ")));
  a.o("alt", "Stadia");
  a.h();
  a.close();
  a.open("h1", "PdIASd");
  a.h();
  a.text(D("Play wirelessly with\u00a0Bluetooth"));
  a.close();
  a.open("p",
    "zt76Lc");
  a.i(Gf || (Gf = ["role", "doc-subtitle"]));
  a.h();
  var b = a.m("A7rC4e");
  R(a, stringBluetooth, null);
  a.l(b);
  a.close();
  a.open("div", "KNDsmb");
  a.i(If || (If = ["class", "ButtonAndMetatext"]));
  a.h();
  var c = a.m("KxbODe");
  ff(a, "main-call-to-action");
  a.l(c);
  a.open("div", "xHVu8c");
  a.i(Jf || (Jf = ["class", "Metatext"]));
  a.h();
  a.text(D("Switching to Bluetooth mode downloads a software update"));
  a.open("br", "RENzXc");
  a.h();
  a.close();
  a.text(D("System requirements: Chrome 108 or newer"));
  a.close();
  a.close();
  a.close();
  a.open("img", "ykhp7c");
  a.i(Kf || (Kf = "class;HeroImage GridSpanFull;srcset;assets/controller-1x.webp 1x, assets/controller-2x.webp 1.5x;type;image/webp;src;assets/controller-1x.webp".split(";")));
  a.o("alt", "A Stadia Controller with a hand-drawn rocket flying out of the top alongside pulsing Bluetooth radio waves.");
  a.h();
  a.close();
  a.close();
  a.open("div", "Mhamdd");
  a.i(Lf || (Lf = ["class", "KeyThingsArea GridSpan10Center GridSmSpanFull GridXsSpanFull"]));
  a.h();
  a.open("h2", "Y940Ec");
  a.i(Mf || (Mf = ["class", "KeyThingsTitle"]));
  a.h();
  a.text(D("Important things to know"));
  a.close();
  a.open("div", "PiNcUc");
  a.i(Nf || (Nf = ["class", "KeyThingsCardContainer"]));
  a.h();
  var d = P(function (m) {
      var r = m.m("mv233e");
      V(m, "Switch to Bluetooth mode", void 0, "text", !0, void 0, void 0, void 0, void 0, void 0, void 0, "click:selectBruce");
      m.l(r)
    }),
    e = a.m("Q6lWyb");
  Of(a, "toggle_on", "Switching is permanent", "Once you switch your controller to Bluetooth mode, you can\u2019t change it back to use Wi-Fi on Stadia. You can still play wired with USB in Bluetooth mode.",
    d);
  a.l(e);
  d = P(function (m) {
    var r = m.m("NxMG7");
    V(m, "Go to mode selection page", void 0, "text", !0, void 0, void 0, void 0, void 0, void 0, void 0, "click:selectAction");
    m.l(r)
  });
  var f = a.m("DiKXlc");
  Of(a, "calendar_today", "Available until December 31, 2023", "You can switch to Bluetooth mode, check the controller mode, and check for Bluetooth updates until Dec 31, 2023.", d);
  a.l(f);
  a.close();
  a.close();
  a.open("div", "zdBG3e");
  a.i(Pf || (Pf = ["class", "FaqArea GridSpan8Center GridSmSpanFull GridXsSpanFull"]));
  a.h();
  a.open("h2",
    "RzOZUe");
  a.i(Qf || (Qf = ["class", "FaqAreaTitle"]));
  a.h();
  a.text(D("Find the answers you need"));
  a.close();
  a.open("div", "oi6B9d");
  a.i(Rf || (Rf = ["class", "FaqItemList"]));
  a.h();
  d = P(function (m) {
    m.text(D("After switching your controller into Bluetooth mode, press and hold the \u201cY + Stadia\u201d buttons for 2 seconds to enter pairing mode. The status light will flash orange.\n\nThen, go to the device you want to play on and pair your controller in the settings. Once paired and connected, the status light on the controller will turn solid white.\n\nCongrats! You\u2019re ready to start playing. The next time you turn on the controller, it should automatically connect to the last paired device."));
    m.open("p", "LB1TMc");
    m.h();
    m.open("a", "H02OF");
    m.i(Sf || (Sf = "href # target _blank jsaction click:gettingStartedModal1".split(" ")));
    m.h();
    m.text(D("Learn how to use Bluetooth mode"));
    m.close();
    m.close()
  });
  var g = a.m("giFsq");
  Tf(a, "How do I pair my controller using Bluetooth?", d);
  a.l(g);
  d = P(function (m) {
    m.text(D("Not all Bluetooth devices are the same, so compatibility will vary. The Stadia Controller uses Bluetooth Low Energy connections, so some features, such as pass-through audio, aren\u2019t possible wirelessly.\n\nWe\u2019ve verified that the Stadia Controller works for gameplay with the list of supported devices. It hasn\u2019t been tested with all Bluetooth device types, so it might not work with others."));
    m.open("p", "JQKsSb");
    m.h();
    m.open("a", "YWN6je");
    m.i(Uf || (Uf = ["target", "_blank"]));
    m.o("href", H(Sd()));
    m.h();
    var r = m.m("r5Owcc");
    R(m, stringDevices, null);
    m.l(r);
    m.close();
    m.close()
  });
  var h = a.m("AhWz8b");
  Tf(a, "What devices are supported?", d);
  a.l(h);
  d = P(function (m) {
    m.text(D("When using the controller wirelessly in Bluetooth mode, the 3.5mm port and USB port won\u2019t be able to be used for headphones.\n\nWhen using the controller wired with USB, you\u2019ll be able to plug headphones into the controller\u2019s 3.5mm port."))
  });
  var k = a.m("pxfWOc");
  Tf(a, "Is audio supported in Bluetooth mode?", d);
  a.l(k);
  d = P(function (m) {
    m.text(D("Yes. By default, the Google Assistant and Capture buttons won\u2019t do anything in Bluetooth mode until remapped. You can remap the buttons using button mapping services."))
  });
  var l = a.m("JOu0Ne");
  Tf(a, "Can I remap the Assistant and Capture buttons?", d);
  a.l(l);
  d = P(function (m) {
    m.text(D("You can verify whether your controller is in Bluetooth mode by checking the controller mode. Doing this also checks for any updates to Bluetooth mode."));
    m.open("p", "ChKJXd");
    m.h();
    m.open("a", "ueIz9c");
    m.i(Wf || (Wf = ["href", "#", "jsaction", "click:checkMode"]));
    m.h();
    m.text(D("Check controller mode"));
    m.close();
    m.close()
  });
  var n = a.m("depSEb");
  Tf(a, "How do I verify my controller\u2019s mode?", d);
  a.l(n);
  d = P(function (m) {
    m.text(D("Make sure your controller is charged for at least 30 minutes, and that you\u2019re using a USB data cable that can transfer data. The cable that came with your controller will work."));
    m.open("p", "qfymOb");
    m.h();
    m.open("a", "pDanod");
    m.i(Xf || (Xf = ["target", "_blank"]));
    m.o("href", H(Rd()));
    m.h();
    var r = m.m("ftGduc");
    R(m, stringHelpCenter, null);
    m.l(r);
    m.close();
    m.close()
  });
  var p = a.m("MEMsTe");
  Tf(a, "I can\u2019t complete a step. What should I do?", d);
  a.l(p);
  d = P(function (m) {
    m.text(D("Make sure your controller is charged for at least 30 minutes. Unplug your controller and hold the Stadia button for 10 seconds \u2014 this should reset the device to be playable again.\n\nIf this still doesn\u2019t work, factory reset the controller by holding the Google Assistant and Capture buttons for 6 seconds \u2014 the controller should vibrate and the status light should flash."));
    m.open("p", "Jg5gkc");
    m.h();
    m.open("a", "dSUhhf");
    m.i(Zf || (Zf = ["target", "_blank"]));
    m.o("href", H(Rd()));
    m.h();
    var r = m.m("VWegud");
    R(m, stringHelpCenter, null);
    m.l(r);
    m.close();
    m.close()
  });
  var q = a.m("FclGQd");
  Tf(a, "My controller isn\u2019t working. What should I do?", d);
  a.l(q);
  d = P(function (m) {
    m.text(D("Unfortunately, customer support is not available for Bluetooth mode. If you have any questions, please go to the help center article."));
    m.open("p", "nuWLz");
    m.h();
    m.open("a", "Wd81E");
    m.i($f || ($f = ["target", "_blank"]));
    m.o("href", H(Rd()));
    m.h();
    var r = m.m("JJYS7d");
    R(m, stringHelpCenter, null);
    m.l(r);
    m.close();
    m.close()
  });
  var w = a.m("Co3rac");
  Tf(a, "Something else is wrong. Who do I contact?", d);
  a.l(w);
  a.close();
  a.close();
  a.open("div", "Z5aXRe");
  a.i(ag || (ag = ["class", "LegalArea GridSpan10Center GridSmSpanFull GridXsSpanFull"]));
  a.h();
  a.text(D("The Bluetooth\u00ae word mark and logos are registered trademarks owned by Bluetooth SIG, Inc. and any use of such marks by Google is under license. Other trademarks and trade names are those of their respective owners."));
  a.close();
  a.G()
}
var Cf, Df, Ef, Ff, Gf, If, Jf, Kf, Lf, Mf, Nf, Pf, Qf, Rf, Sf, Uf, Wf, Xf, Zf, $f, ag;

function ff(a, b) {
  V(a, "Flash your controller", void 0, void 0, !0, void 0, "arrow_right_alt", void 0, void 0, void 0, b, "click:selectAction")
}

function mf(a) {
  var b = P(function (e) {
      e.text(D("Something went wrong."));
      e.open("br", "JqU27d");
      e.h();
      e.close();
      e.text(D("Please try again later."))
    }),
    c = P(function (e) {
      e.open("div", "W5sF6c");
      e.i(bg || (bg = ["class", "ErrorContent"]));
      e.h();
      var f = e.m("Wf3be");
      V(e, "Help Center", void 0, "outlined", !0, void 0, "open_in_new", void 0, !0, void 0, void 0, "click:helpCenter");
      e.l(f);
      e.close()
    }),
    d = a.m("kTXOYb");
  cg(a, b, c, "hourglass_top", void 0, !1);
  a.l(d)
}
var bg;

function of (a) {
  var b = P(function (d) {
      d.open("div", "d0diIb");
      d.i(dg || (dg = ["class", "ErrorContent"]));
      d.h();
      var e = d.m("B0X5xf");
      V(d, "Download Chrome", void 0, "outlined", !0, void 0, void 0, void 0, !0, void 0, void 0, "click:downloadChrome");
      d.l(e);
      d.open("div", "nBJVnb");
      d.i(eg || (eg = ["class", "Legal"]));
      d.h();
      d.open("span", "zp5vUb");
      d.h();
      if (!fg["By downloading Chrome, you agree to the \u00010\u0001Google Terms of Service\u00011\u0001 and \u00012\u0001Chrome and ChromeOS Additional Terms of Service\u00011\u0001"]) {
        fg["By downloading Chrome, you agree to the \u00010\u0001Google Terms of Service\u00011\u0001 and \u00012\u0001Chrome and ChromeOS Additional Terms of Service\u00011\u0001"] = [];
        var f = /\x01\d+\x01/g,
          g = 0,
          h = 0;
        do {
          var k = f.exec("By downloading Chrome, you agree to the \u00010\u0001Google Terms of Service\u00011\u0001 and \u00012\u0001Chrome and ChromeOS Additional Terms of Service\u00011\u0001") || void 0;
          fg["By downloading Chrome, you agree to the \u00010\u0001Google Terms of Service\u00011\u0001 and \u00012\u0001Chrome and ChromeOS Additional Terms of Service\u00011\u0001"][h] = [D("By downloading Chrome, you agree to the \u00010\u0001Google Terms of Service\u00011\u0001 and \u00012\u0001Chrome and ChromeOS Additional Terms of Service\u00011\u0001".substring(g,
            k && k.index)), k && k[0]];
          h += 1;
          g = f.lastIndex
        } while (k)
      }
      f = v(fg["By downloading Chrome, you agree to the \u00010\u0001Google Terms of Service\u00011\u0001 and \u00012\u0001Chrome and ChromeOS Additional Terms of Service\u00011\u0001"]);
      for (g = f.next(); !g.done; g = f.next()) switch (g = g.value, g[0] && d.text(g[0]), g[1]) {
        case "\u00010\u0001":
          d.open("a", "Ai6TIe");
          d.i(gg || (gg = ["target", "_blank"]));
          d.o("href", H(Pd()));
          d.h();
          break;
        case "\u00011\u0001":
          d.close();
          break;
        case "\u00012\u0001":
          d.open("a", "tcRzsb"), d.i(hg || (hg = ["target", "_blank"])), d.o("href", H(Qd())), d.h()
      }
      d.close();
      d.close();
      d.close()
    }),
    c = a.m("g8IHq");
  cg(a, "Open this page in Chrome", b, void 0, stringChromeWarning());
  a.l(c)
}
var dg, eg, fg = {},
  gg, hg;

function pf(a) {
  var b = P(function (d) {
      d.open("div", "C84RQ");
      d.i(jg || (jg = ["class", "ErrorContent"]));
      d.h();
      d.open("span", "rEsn7e");
      d.h();
      if (!kg["Go to \u00010\u0001stadia.com/controller\u00011\u0001 on a desktop device that\u2019s running Chrome version 108 or later"]) {
        kg["Go to \u00010\u0001stadia.com/controller\u00011\u0001 on a desktop device that\u2019s running Chrome version 108 or later"] = [];
        var e = /\x01\d+\x01/g,
          f = 0,
          g = 0;
        do {
          var h = e.exec("Go to \u00010\u0001stadia.com/controller\u00011\u0001 on a desktop device that\u2019s running Chrome version 108 or later") ||
            void 0;
          kg["Go to \u00010\u0001stadia.com/controller\u00011\u0001 on a desktop device that\u2019s running Chrome version 108 or later"][g] = [D("Go to \u00010\u0001stadia.com/controller\u00011\u0001 on a desktop device that\u2019s running Chrome version 108 or later".substring(f, h && h.index)), h && h[0]];
          g += 1;
          f = e.lastIndex
        } while (h)
      }
      e = v(kg["Go to \u00010\u0001stadia.com/controller\u00011\u0001 on a desktop device that\u2019s running Chrome version 108 or later"]);
      for (f = e.next(); !f.done; f = e.next()) switch (f =
        f.value, f[0] && d.text(f[0]), f[1]) {
        case "\u00010\u0001":
          d.open("strong", "Sd1C0b");
          d.h();
          break;
        case "\u00011\u0001":
          d.close()
      }
      d.close();
      d.close()
    }),
    c = a.m("fKZXBe");
  cg(a, "Open this page in Chrome on a computer", b);
  a.l(c)
}
var jg, kg = {};

function nf(a) {
  var b = P(function (d) {
      d.open("div", "R0wysc");
      d.i(lg || (lg = ["class", "ErrorContent"]));
      d.h();
      var e = d.m("fXKlJd");
      V(d, "Update Chrome", void 0, "outlined", !0, void 0, void 0, void 0, !0, void 0, void 0, "click:updateChrome");
      d.l(e);
      d.open("div", "GjFdAb");
      d.i(mg || (mg = ["class", "Legal"]));
      d.h();
      d.open("span", "uhntdf");
      d.h();
      if (!ng["By updating Chrome, you agree to the \u00010\u0001Google Terms of Service\u00011\u0001 and \u00012\u0001Chrome and ChromeOS Additional Terms of Service\u00011\u0001"]) {
        ng["By updating Chrome, you agree to the \u00010\u0001Google Terms of Service\u00011\u0001 and \u00012\u0001Chrome and ChromeOS Additional Terms of Service\u00011\u0001"] = [];
        var f = /\x01\d+\x01/g,
          g = 0,
          h = 0;
        do {
          var k = f.exec("By updating Chrome, you agree to the \u00010\u0001Google Terms of Service\u00011\u0001 and \u00012\u0001Chrome and ChromeOS Additional Terms of Service\u00011\u0001") || void 0;
          ng["By updating Chrome, you agree to the \u00010\u0001Google Terms of Service\u00011\u0001 and \u00012\u0001Chrome and ChromeOS Additional Terms of Service\u00011\u0001"][h] = [D("By updating Chrome, you agree to the \u00010\u0001Google Terms of Service\u00011\u0001 and \u00012\u0001Chrome and ChromeOS Additional Terms of Service\u00011\u0001".substring(g,
            k && k.index)), k && k[0]];
          h += 1;
          g = f.lastIndex
        } while (k)
      }
      f = v(ng["By updating Chrome, you agree to the \u00010\u0001Google Terms of Service\u00011\u0001 and \u00012\u0001Chrome and ChromeOS Additional Terms of Service\u00011\u0001"]);
      for (g = f.next(); !g.done; g = f.next()) switch (g = g.value, g[0] && d.text(g[0]), g[1]) {
        case "\u00010\u0001":
          d.open("a", "hplOPd");
          d.i(og || (og = ["target", "_blank"]));
          d.o("href", H(Pd()));
          d.h();
          break;
        case "\u00011\u0001":
          d.close();
          break;
        case "\u00012\u0001":
          d.open("a", "CY0Gef"), d.i(pg || (pg = ["target", "_blank"])), d.o("href", H(Qd())), d.h()
      }
      d.close();
      d.close();
      d.close()
    }),
    c = a.m("HgKm3b");
  cg(a, "Update Chrome to the latest version", b, void 0, stringChromeWarning());
  a.l(c)
}
var lg, mg, ng = {},
  og, pg;

function cg(a, b, c, d, e, f) {
  d = void 0 === d ? "lightbulb" : d;
  if (void 0 === f || f) {
    a.open("div", "uTmWy");
    a.i(qg || (qg = ["class", "TopLeftContent"]));
    a.h();
    var g = a.m("ed6XBf");
    V(a, stringHome(), void 0, "stadiatext", !0, "left", "arrow_back", void 0, void 0, void 0, void 0, "click:returnHome");
    a.l(g);
    a.close()
  }
  a.open("div", "FITX6e");
  a.i(sg || (sg = ["class", "ErrorContentContainer"]));
  a.h();
  a.open("div", "hbtDc");
  a.i(tg || (tg = ["class", "PanelInstructions"]));
  a.h();
  a.open("div", "qVViGd");
  a.i(ug || (ug = ["class", "IconAndHeading"]));
  a.h();
  var h =
    a.m("xhDSLb");
  vg(a, d);
  a.l(h);
  a.open("h1", "c3uqBd");
  a.h();
  S(a, b);
  a.close();
  a.close();
  T(e) && (a.open("p", "AJcAJb"), a.i(wg || (wg = ["role", "doc-subtitle"])), a.h(), S(a, e), a.close());
  a.close();
  T(c) && S(a, c);
  a.close()
}
var qg, sg, tg, ug, wg;

function xg(a, b, c) {
  var d = P(function (g) {
      var h = g.m("qRlJQ");
      V(g, stringHome(), void 0, "stadiatext", !0, "left", "arrow_back", void 0, void 0, void 0, void 0, "click:returnHome");
      g.l(h)
    }),
    e = P(function (g) {
      g.open("h1", "tt680b");
      g.h();
      S(g, "What would you like to do with your Stadia Controller?");
      g.close();
      T(c) && (g.open("p", "Dps8Fc"), g.i(yg || (yg = ["role", "doc-subtitle"])), g.h(), S(g, c), g.close())
    }),
    f = a.m("yG5tBd");
  zg(a, void 0, d, e, b);
  a.l(f)
}
var yg;

function W(a, b, c, d, e, f, g, h, k, l, n, p, q) {
  var w = void 0 === e ? "flasher" : e,
    m = void 0 === f ? !1 : f,
    r = void 0 === h ? !0 : h,
    F = void 0 === k ? !0 : k,
    aa = void 0 === n ? "click:cancelAndExit" : n,
    M = q ? q : "Next step";
  e = P(function (y) {
    if ("flasher" == w) {
      var Aa = y.m("JCINN");
      y.open("div", "tlT9");
      y.i(Ag || (Ag = ["class", "Stepper", "role", "tablist"]));
      y.o("aria-label", "Stepper for updating your controller");
      y.h();
      var N = y.m("IVyFe");
      Bg(y, "Verify", 1, b, m);
      y.l(N);
      N = y.m("cF4Iib");
      Bg(y, "Unlock", 2, b, m);
      y.l(N);
      N = y.m("yzKx5d");
      Bg(y, "Download", 3, b, m);
      y.l(N);
      N = y.m("KY71tc");
      Bg(y, "Install", 4, b, m);
      y.l(N);
      y.G();
      y.l(Aa)
    }
    y.open("h1", "iVJnN");
    y.h();
    S(y, c);
    y.close();
    T(g) && (y.open("p", "qS5zje"), y.i(Cg || (Cg = ["role", "doc-subtitle"])), y.h(), S(y, g), y.close())
  });
  f = P(function (y) {
    if (r) {
      var Aa = y.m("R9LBmf");
      V(y, "Cancel and exit", void 0, "stadiatext", void 0, void 0, void 0, void 0, void 0, void 0, void 0, aa);
      y.l(Aa);
      if (F) {
        y.open("div", "SF4hO");
        y.i(Dg || (Dg = ["class", "RightButtons"]));
        y.h();
        T(l) && S(y, l);
        var N = y.m("faTsD");
        V(y, M, void 0, "secondary", !0, void 0, void 0, null != p, null !=
          p, void 0, void 0, p);
        y.l(N);
        y.close()
      }
    }
  });
  var Q = a.m("fu8Vnb");
  zg(a, "empty" == w ? "EmptyStepper" : "", void 0, e, d, f);
  a.l(Q)
}
var Cg, Dg;

function zg(a, b, c, d, e, f) {
  T(c) && (a.open("div", "AUbuae"), a.i(Eg || (Eg = ["class", "TopLeftContent"])), a.h(), S(a, c), a.close());
  a.open("div", "OMP0He");
  a.o("class", "Grid MainContentContainer " + (b ? b : ""));
  a.h();
  T(d) && (a.open("div", "yZez5"), a.i(Fg || (Fg = ["class", "PanelInstructions GridSpanFull"])), a.h(), S(a, d), a.close());
  T(e) && S(a, e);
  T(f) && (a.open("div", "jojrvc"), a.i(Gg || (Gg = ["class", "PanelBottomBarContainer GridSpanFull", "id", "panel-bottom-button-bar"])), a.h(), a.open("div", "PrR4E"), a.i(Hg || (Hg = ["class", "PanelBottomButtonBar GridSpanFull"])),
    a.h(), a.open("div", "OYh2Wb"), a.i(Ig || (Ig = ["class", "PanelBottomButtonBar__InnerContainer"])), a.h(), S(a, f), a.close(), a.close(), a.close());
  a.close()
}
var Eg, Fg, Gg, Hg, Ig;

function Jg(a, b, c, d, e, f, g, h, k, l, n) {
  f = void 0 === f ? "high" : f;
  g = void 0 === g ? "medium" : g;
  a.open("dialog", "tnU0xc");
  a.i(Kg || (Kg = "id active-dialog role dialog aria-labelledby active-dialog-title aria-describedby active-dialog-description".split(" ")));
  a.o("class", "Dialog " + g);
  a.h();
  a.open("div", "KUXsY");
  a.i(Lg || (Lg = ["class", "Content"]));
  a.h();
  a.open("div", "wMfIZ");
  a.i(Mg || (Mg = ["class", "HeadingDescriptionIcon"]));
  a.h();
  e && (a.open("div", "tbY8dd"), a.i(Ng || (Ng = ["aria-hidden", "true"])), a.o("class", "Icon " + f), a.h(),
    S(a, e), a.close());
  a.open("h2", "gqyllc");
  a.i(Og || (Og = ["id", "active-dialog-title"]));
  a.h();
  S(a, b);
  a.close();
  a.open("div", "IuCG3d");
  a.i(Pg || (Pg = ["id", "active-dialog-description", "class", "Description"]));
  a.h();
  S(a, c);
  a.close();
  a.close();
  h && (a.open("div", "Rzml3b"), a.i(Qg || (Qg = ["class", "Checkbox"])), a.h(), a.open("input", "XNNETd"), a.i(Rg || (Rg = "type checkbox id dialog-checkbox jsaction change:dialogCheckboxChange".split(" "))), Sg(a), a.h(), a.close(), a.open("label", "zFat8b"), a.i(Tg || (Tg = ["for", "dialog-checkbox"])),
    a.h(), S(a, h), a.close(), a.close());
  a.close();
  wd(n) && checkIfGoogleStaff() && (a.open("div", "zqjYof"), a.i(Ug || (Ug = ["class", "ErrorDetailsContainer"])), a.h(), a.open("div", "TJHiue"), a.i(Vg || (Vg = ["class", "DogfoodOnlyLabel"])), a.h(), a.text("Dogfood only:"), a.close(), a.open("code", "Ymtedf"), a.i(Wg || (Wg = ["class", "ErrorDetails"])), a.h(), S(a, n), a.close(), a.close());
  a.open("div", "vgpOfd");
  a.i(Xg || (Xg = ["class", "ButtonRow"]));
  a.h();
  if (l) {
    var p = a.m("aOxdCd");
    V(a, l.label, void 0, "text", null != l.icon, void 0, l.icon, void 0, void 0, void 0,
      void 0, l.action);
    a.l(p)
  }
  if (d) {
    var q = a.m("ei9BD");
    V(a, d.label, void 0, "secondary", void 0, void 0, void 0, wd(k) || !h, !h, void 0, void 0, d.action);
    a.l(q)
  }
  a.close();
  a.G()
}
var Kg, Lg, Mg, Ng, Og, Pg, Qg, Rg, Tg, Ug, Vg, Wg, Xg, Ag;

function Bg(a, b, c, d, e) {
  var f = d == c;
  d = (c = d > c || f && e) ? "Completed" : "Incomplete";
  a.open("div", "GiGjRb");
  a.i(Yg || (Yg = ["role", "tab", "aria-disabled", "true"]));
  a.o("class", "Step" + (f && c ? " activecompleted" : f ? " active" : c ? " completed" : ""));
  a.o("aria-selected", f ? "true" : "false");
  a.o("aria-label", b + ", " + d);
  a.h();
  a.open("div", "qKyMDc");
  a.i(Zg || (Zg = ["class", "StepLabel", "aria-hidden", "true"]));
  a.h();
  S(a, b);
  a.close();
  a.open("div", "OSYxPb");
  a.i($g || ($g = ["class", "StepTimeline", "aria-hidden", "true"]));
  a.h();
  a.open("div",
    "jFhiP");
  a.i(ah || (ah = ["class", "StepLeftTrack"]));
  a.h();
  a.close();
  a.open("div", "w1mTfb");
  a.i(bh || (bh = ["class", "StepDot"]));
  a.h();
  var g = a.m("yXK7Vc");
  vg(a, "check", "StepCheck");
  a.l(g);
  a.close();
  a.open("div", "mrENRc");
  a.i(ch || (ch = ["class", "StepRightTrack"]));
  a.h();
  a.close();
  a.close();
  a.G()
}
var Yg, Zg, $g, ah, bh, ch;

function dh(a, b, c, d, e, f, g) {
  a.open("div", "MWOm2c");
  a.o("class", "ActionCard");
  a.h();
  a.open("div", "t1NPrb");
  a.i(eh || (eh = ["class", "IconAndText"]));
  a.h();
  if (d) {
    a.open("div", "SV7hoe");
    a.i(fh || (fh = ["class", "Icon", "aria-hidden", "true"]));
    a.h();
    var h = a.m("hDiRK");
    gh(a, d, !0);
    a.l(h);
    a.close()
  }
  a.open("div", "g1vFC");
  a.i(hh || (hh = ["class", "Text"]));
  a.h();
  a.open("h2", "uvUv8");
  a.i(ih || (ih = ["class", "ActionText"]));
  a.h();
  S(a, b);
  a.close();
  a.open("div", "BOguZb");
  a.i(jh || (jh = ["class", "MetaText"]));
  a.h();
  S(a, c);
  a.close();
  a.close();
  a.close();
  if (T(g)) {
    a.open("div", "NqYd1c");
    a.i(kh || (kh = ["class", "Bottom"]));
    a.h();
    if (e) {
      a.open("div", "rpjvOd");
      a.i(lh || (lh = ["class", "TimeChip", "role", "img"]));
      a.o("aria-label", null != f ? f : e);
      a.h();
      var k = a.m("MtmUwb");
      vg(a, "schedule", "TimeChipIcon");
      a.l(k);
      a.open("span", "ikZL9e");
      a.i(mh || (mh = ["class", "TimeChipText", "aria-hidden", "true"]));
      a.h();
      S(a, e);
      a.close();
      a.close()
    }
    S(a, g);
    a.close()
  }
  a.G()
}
var eh, fh, hh, ih, jh, kh, lh, mh;

function nh(a, b, c, d, e, f, g) {
  f = void 0 === f ? "" : f;
  g = void 0 === g ? "" : g;
  a.open("div", "t1rK5e");
  a.o("class", "InstructionCard");
  a.h();
  a.open("div", "yZpuOd");
  a.i(oh || (oh = ["class", "IconAndInstruction"]));
  a.h();
  a.open("div", "Hkq2Ec");
  a.i(ph || (ph = ["class", "Icon"]));
  a.h();
  var h = a.m("tvvVzb");
  gh(a, b);
  a.l(h);
  a.close();
  a.open("h2", "a9azZd");
  a.i(qh || (qh = ["class", "InstructionText"]));
  a.o("aria-label", g);
  a.h();
  S(a, d);
  a.close();
  a.close();
  a.open("div", "kUfyBb");
  a.i(rh || (rh = ["class", "DiagramAndMeta"]));
  a.h();
  a.open("img",
    "go0dUc");
  a.i(sh || (sh = ["class", "Diagram"]));
  a.o("src", "assets/" + c);
  a.o("alt", f);
  a.h();
  a.close();
  a.open("div", "WhnSEd");
  a.i(th || (th = ["class", "MetaText"]));
  a.h();
  S(a, e);
  a.close();
  a.close();
  a.G()
}
var oh, ph, qh, rh, sh, th;

function Of(a, b, c, d, e) {
  a.open("div", "OjiUbd");
  a.o("class", "KeyThingCard");
  a.h();
  a.open("div", "pFalQc");
  a.i(uh || (uh = ["class", "IconAndText"]));
  a.h();
  a.open("div", "jEgczf");
  a.i(vh || (vh = ["class", "Icon", "aria-hidden", "true"]));
  a.h();
  var f = a.m("MIzvFc");
  gh(a, b, !0);
  a.l(f);
  a.close();
  a.open("div", "SO151b");
  a.i(wh || (wh = ["class", "Text"]));
  a.h();
  a.open("h3", "UFxwhd");
  a.i(xh || (xh = ["class", "Heading"]));
  a.h();
  S(a, c);
  a.close();
  a.open("div", "ozaSAe");
  a.i(yh || (yh = ["class", "Content"]));
  a.h();
  S(a, d);
  a.close();
  a.close();
  a.close();
  a.open("div", "Rn2fAf");
  a.i(zh || (zh = ["class", "Bottom"]));
  a.h();
  S(a, e);
  a.close();
  a.G()
}
var uh, vh, wh, xh, yh, zh;

function gh(a, b, c) {
  c = void 0 === c ? !1 : c;
  a.open("span", "gPpZX");
  a.o("class", "CardIcon" + (c ? " symbol" : ""));
  a.h();
  S(a, b);
  a.G()
}

function V(a, b, c, d, e, f, g, h, k, l, n, p) {
  c = void 0 === c ? "" : c;
  d = void 0 === d ? "brand" : d;
  e = void 0 === e ? !1 : e;
  f = void 0 === f ? "right" : f;
  g = void 0 === g ? "arrow_right_alt" : g;
  h = void 0 === h ? !0 : h;
  k = void 0 === k ? !1 : k;
  a.open("button", "IXluUb");
  a.o("class", "Button " + d + (e ? " " + ("left" == f ? "iconleft" : "icon") : "") + (l ? " " + l : ""));
  p && a.o("jsaction", p);
  h ? k && Sg(a) : (a.o("tabindex", "-1"), a.o("disabled", ""));
  n && a.o("id", n);
  a.o("aria-label", c);
  a.h();
  a.open("span", "x4b05b");
  a.i(Ah || (Ah = ["class", "ButtonText"]));
  a.h();
  S(a, b);
  e && (a.open("span", "Im3JKb"),
    a.i(Bh || (Bh = ["class", "ButtonIcon", "aria-hidden", "true"])), a.h(), S(a, g), a.close());
  a.close();
  a.G()
}
var Ah, Bh, Ch;

function Sg(a) {
  a.o("data-initial-focus", "")
}

function Dh(a) {
  a.open("span", "IAxUNb");
  a.i(Eh || (Eh = ["class", "ControllerButton option", "role", "img"]));
  a.o("aria-label", "the Menu button");
  a.h();
  a.text("more_horiz");
  a.G()
}
var Eh, Fh, Gh, Hh;

function Ih(a, b, c, d) {
  c = void 0 === c ? "" : c;
  var e = void 0 === e ? 0 : e;
  var f = void 0 === f ? 100 : f;
  null != d ? (a.open("progress", "W2Xbmd"), a.i(Jh || (Jh = ["class", "ProgressBar"])), a.o("id", b), a.o("min", "" + e), a.o("max", "" + f), a.o("value", "" + d), a.o("aria-label", c), a.h()) : (a.open("div", "b01gJd"), a.i(Kh || (Kh = ["class", "ProgressCircle"])), a.h(), a.open("div", "eUKuv"), a.i(Lh || (Lh = ["class", "ProgressCircleInnerContainer"])), a.h(), a.open("progress", "K7Pbcb"), a.o("id", b), a.o("aria-label", c), a.h(), a.close(), a.close());
  a.close()
}
var Jh, Kh, Lh;

function Tf(a, b, c) {
  a.open("details", "Nblq2d");
  a.i(Mh || (Mh = ["class", "FaqItem"]));
  a.h();
  a.open("summary", "wwQEfe");
  a.i(Nh || (Nh = ["class", "FaqQuestionHeader"]));
  a.o("aria-label", b);
  a.h();
  a.open("div", "FzqLU");
  a.i(Oh || (Oh = ["class", "FaqQuestion", "aria-hidden", "true"]));
  a.h();
  S(a, b);
  a.close();
  a.open("div", "GnYahe");
  a.i(Ph || (Ph = ["class", "FaqChevron more", "aria-hidden", "true"]));
  a.h();
  a.text("expand_more");
  a.close();
  a.open("div", "aUYP3b");
  a.i(Qh || (Qh = ["class", "FaqChevron less", "aria-hidden", "true"]));
  a.h();
  a.text("expand_less");
  a.close();
  a.close();
  a.open("div", "lcMBNe");
  a.i(Rh || (Rh = ["class", "FaqAnswer"]));
  a.h();
  S(a, c);
  a.close();
  a.G()
}
var Mh, Nh, Oh, Ph, Qh, Rh;

function Sh(a, b) {
  b = b || {};
  b = b.Ba;
  b = void 0 === b ? 1 : b;
  a.open("dialog", "cmIWSd");
  a.i(Th || (Th = "id;active-dialog;class;Dialog Modal__GettingStarted;role;dialog;aria-labelledby;active-dialog-title".split(";")));
  a.h();
  a.open("header", "fII1wc");
  a.i(Uh || (Uh = ["class", "ModalHeader"]));
  a.h();
  var c = a.m("zQ2Z9d");
  vg(a, "lightbulb");
  a.l(c);
  a.open("h2", "wMP9Me");
  a.i(Vh || (Vh = ["id", "active-dialog-title"]));
  a.h();
  a.text(D("Getting started with Bluetooth"));
  a.close();
  c = a.m("dAD0sb");
  a.open("button", "Y9SEPd");
  a.o("class",
    "IconButton");
  a.o("jsaction", "click:closeDialog");
  a.o("aria-label", "close");
  a.h();
  a.open("span", "f3x3Ge");
  a.i(Ch || (Ch = ["class", "Icon", "aria-hidden", "true"]));
  a.h();
  S(a, "close");
  a.close();
  a.G();
  a.l(c);
  a.close();
  a.open("div", "nwLFVc");
  a.i(Wh || (Wh = "id active-dialog-content class ModalContent aria-live polite".split(" ")));
  a.h();
  a.open("section", "AzTgAe");
  a.i(Xh || (Xh = ["class", "ModalContent__Panel"]));
  a.h();
  1 == b ? (a.open("h3", "jSua3b"), a.h(), a.text(D("How to pair with Bluetooth")), a.close(), a.open("p",
    "uArixd"), a.h(), a.text(D("Hold the \u201cY + Stadia\u201d buttons for 2 seconds until the status light flashes orange. It\u2019s now in pairing mode and visible to other devices.")), a.close(), c = a.m("tpp9Fc"), Yh(a, "Pairing_mode.svg", "A Stadia Controller with the Y button and the Stadia button being held down. The Stadia button is the circular center button on the front face of the controller between the analog sticks. The Y button is the top of the 4 circular buttons in a diamond formation on the right side of the front face of the controller. An arrow indicates that after pressing these buttons, the Stadia button will flash orange. The controller will also rumble to indicate it entered pairing mode.",
    1.5708333333333333), a.l(c)) : (a.open("h3", "dEpN8d"), a.h(), a.text(D("What the status lights mean")), a.close(), a.open("div", "VjSKWd"), a.i(Zh || (Zh = ["class", "LEDStatusList"])), a.h(), a.open("dl", "pYsqqf"), a.i($h || ($h = ["class", "LEDStatus LEDStatus__FlashingOrange"])), a.h(), a.open("dt", "X5pELc"), a.i(ai || (ai = ["class", "LEDStatus__State"])), a.h(), a.text(D("Flashing orange")), a.close(), a.open("dd", "ns4iPc"), a.i(bi || (bi = ["class", "LEDStatus__Description"])), a.h(), a.text(D("Pairing mode, visible to other devices")),
    a.close(), a.close(), a.open("dl", "SVdPid"), a.i(ci || (ci = ["class", "LEDStatus LEDStatus__FlashingWhite"])), a.h(), a.open("dt", "Ujaczd"), a.i(di || (di = ["class", "LEDStatus__State"])), a.h(), a.text(D("Flashing white")), a.close(), a.open("dd", "ctKwV"), a.i(ei || (ei = ["class", "LEDStatus__Description"])), a.h(), a.text(D("Connecting to last paired device")), a.close(), a.close(), a.open("dl", "Yzj2Yb"), a.i(fi || (fi = ["class", "LEDStatus LEDStatus__SolidWhite"])), a.h(), a.open("dt", "PCRife"), a.i(gi || (gi = ["class", "LEDStatus__State"])),
    a.h(), a.text(D("Solid white")), a.close(), a.open("dd", "LqSPic"), a.i(hi || (hi = ["class", "LEDStatus__Description"])), a.h(), a.text(D("Connected to a device")), a.close(), a.close(), a.close());
  a.close();
  a.close();
  a.open("footer", "IRx0Ad");
  a.i(ii || (ii = ["class", "ModalFooter"]));
  a.h();
  a.open("div", "z7XNo");
  a.i(ji || (ji = ["class", "ModalFooter__LeftControls"]));
  a.h();
  c = a.m("EBCqQb");
  V(a, "Help Center", void 0, "text", !0, void 0, "open_in_new", void 0, void 0, void 0, void 0, "click:helpCenter");
  a.l(c);
  a.close();
  c = "Page " +
    Ne(b) + " of " + Ne(2);
  a.open("div", "l6g55c");
  a.i(ki || (ki = ["class", "ModalFooter__StepContainer"]));
  a.o("aria-label", c);
  a.h();
  a.open("div", "edgbdf");
  a.o("class", "ModalStep" + (1 == b ? " active" : ""));
  a.h();
  a.close();
  a.open("div", "nTZTJ");
  a.o("class", "ModalStep" + (2 == b ? " active" : ""));
  a.h();
  a.close();
  a.close();
  a.open("div", "YHgkwc");
  a.i(li || (li = ["class", "ModalFooter__RightControls"]));
  a.h();
  1 == b ? (b = a.m("YzY0te"), V(a, "Next", void 0, "secondary", void 0, void 0, void 0, void 0, !0, "NextButton", void 0, "click:gettingStartedModal2"),
    a.l(b)) : (b = a.m("cozlJf"), V(a, "Back", void 0, "stadiasecondary", void 0, void 0, void 0, void 0, !0, "BackButton", void 0, "click:gettingStartedModal1"), a.l(b));
  a.close();
  a.close();
  a.G()
}
Sh.B = E;
var Th, Uh, Vh, Wh, Xh, Zh, $h, ai, bi, ci, di, ei, fi, gi, hi, ii, ji, ki, li;

function Yh(a, b, c, d) {
  a.open("img", "hoTVge");
  a.i(mi || (mi = ["class", "StandaloneDiagram"]));
  a.o("src", "assets/" + b);
  a.o("alt", c ? c : "");
  d && a.o("style", "aspect-ratio: " + Cd(d) + ";");
  a.h();
  a.G()
}
var mi;

function vg(a, b, c) {
  c = void 0 === c ? "Icon" : c;
  a.open("div", "OlWeC");
  a.i(ni || (ni = ["aria-hidden", "true"]));
  a.o("class", c);
  a.h();
  S(a, b);
  a.G()
}
var ni;

function stringChromeWarning() {
  return "You need to use Chrome version 108 or later to switch your Stadia Controller to Bluetooth mode"
}

function stringHelpCenter() {
  return "Go to Bluetooth mode Help Center"
}

function stringDevices() {
  return "List of supported devices"
}

function stringHome() {
  return "Return to home"
}

function stringBluetooth() {
  return "Switch your Stadia Controller to Bluetooth mode to keep gaming wirelessly on your favorite devices and services after Stadia shuts\u00a0down"
};

function oi(a, b) {
  pi(a, b.qa)
}

function pi(a, b) {
  Jg(a, "Accept the Terms of Service", P(function (c) {
      c.open("p", "k3jM9b");
      c.h();
      c.text(D("Your download and use of the Bluetooth update for the Stadia Controller is subject to the Google Terms of Service. Please read and accept these terms to continue."));
      c.close();
      c.open("p", "EDC2Fc");
      c.h();
      c.open("a", "jq3Z0d");
      c.i(qi || (qi = ["target", "_blank"]));
      c.o("href", H(Pd()));
      c.h();
      c.text(D("Read Google Terms of Service"));
      c.close();
      c.close()
    }), {
      label: "Start",
      action: "click:agreeToTerms"
    }, "error",
    "low", void 0, "I accept the Google Terms of Service", b, {
      label: "Cancel",
      action: "click:closeDialog"
    })
}
oi.B = E;
var qi;

function ri(a, b) {
  si(a, b.qa, b.tb)
}

function si(a, b, c) {
  var d = ti();
  Jg(a, "Cancel and exit?", P(function (e) {
    c ? (e.open("p", "FflBx"), e.h(), e.open("strong", "l2Lkdb"), e.h(), e.text(D("Important: Unplug and reset your controller to use it again.")), e.close(), e.close(), e.open("p", "p9JOnf"), e.h(), e.text(D("Your controller is unlocked, so it can\u2019t be used. To lock and reset it back to normal, unplug the controller and hold the Stadia button for 10 seconds.")), e.close()) : e.text(D("You\u2019ll lose any progress and need to start over."))
  }), {
    label: "Cancel and exit",
    action: "returnHome"
  }, "error", c ? "high" : "low", void 0, c ? d : null, b, {
    label: "Never mind",
    action: "closeDialog"
  })
}
ri.B = E;

function ui(a, b) {
  vi(a, b.nb, b.V)
}

function vi(a, b, c) {
  Jg(a, "Close other tabs using the controller", P(function (d) {
    d.open("p", "AQzJdc");
    d.h();
    d.text(D("Couldn\u2019t connect to your controller because it\u2019s currently being used by another tab or program."));
    d.close();
    b && (d.open("p", "yi5sid"), d.h(), d.text(D("If you connected the controller to Android apps on ChromeOS, unplug it now to disconnect it.")), d.close());
    d.open("p", "h96Lle");
    d.h();
    d.text(D("Close any tabs or programs using the controller, then try again."));
    d.close()
  }), {
    label: "Got it",
    action: "closeDialog"
  }, "tab", "low", void 0, void 0, void 0, void 0, c)
}
ui.B = E;

function wi(a, b) {
  xi(a, b.action)
}

function xi(a, b) {
  Jg(a, "Plug in your controller", P(function (c) {
    c.text(D("Sorry \u2014 the current process was interrupted because your controller was unplugged. Plug in the controller, then restart this step."))
  }), {
    label: "Restart step",
    action: b
  }, "usb_off")
}
wi.B = E;

function yi(a) {
  Jg(a, "Your controller isn\u2019t unlocked", P(function (b) {
    b.text(D("Your controller needs to be unlocked to download the update. Return to the Unlock step and try again."))
  }), {
    label: "Return to Unlock step",
    action: "enterSdpMode"
  }, "lock")
}
yi.B = E;

function zi(a, b, c) {
  Ai(c, a, b.qa, b.V)
}

function Ai(a, b, c, d) {
  Jg(b, Bi(), P(function (e) {
    e.open("p", "YsMOUe");
    e.h();
    e.text(D("Sorry \u2014 the update was interrupted and your controller needs to be reset."));
    e.close();
    e.open("p", "MsvVYb");
    e.h();
    var f = e.m("AupbBc");
    R(e, Ci, null, a);
    e.l(f);
    e.close()
  }), {
    label: "Start over",
    action: "connectController"
  }, "restart_alt", void 0, void 0, ti(), c, void 0, d)
}
zi.B = E;

function Di(a, b, c) {
  Ei(c, a, b.rb)
}

function Ei(a, b, c) {
  Jg(b, Bi(), P(function (d) {
    d.open("p", "HITwyd");
    d.h();
    d.text(D("Your controller is still unlocked. This can cause issues."));
    d.close();
    d.open("p", "mheSh");
    d.h();
    var e = d.m("LpOsne");
    R(d, Ci, null, a);
    d.l(e);
    d.close();
    d.open("p", "fExFHf");
    d.h();
    d.text(D("Only go to the next step if your controller won\u2019t reset properly."));
    d.close()
  }), {
    label: "Start over",
    action: "connectController"
  }, "restart_alt", void 0, void 0, void 0, void 0, {
    label: "Next step",
    action: c
  })
}
Di.B = E;

function Fi(a, b, c) {
  Jg(a, Bi(), P(function (d) {
    d.open("p", "yrHdpd");
    d.h();
    d.text(D("Your controller is still unlocked and needs to be reset."));
    d.close();
    d.open("p", "n1IKSd");
    d.h();
    var e = d.m("FXOiGe");
    R(d, Ci, null, c);
    d.l(e);
    d.close()
  }), {
    label: "Start over",
    action: "connectController"
  }, "restart_alt")
}
Fi.B = E;

function Gi(a, b) {
  Hi(a, b.V)
}

function Hi(a, b) {
  Jg(a, "Manually update Linux udev rules to continue", P(function (c) {
    c.open("p", "qQQTNe");
    c.h();
    c.text(D("You need to manually edit a rules file on your computer to allow Chrome to access Stadia Controllers over USB."));
    c.close();
    c.open("p", "ZmKCId");
    c.h();
    c.text(D("Open and follow the instructions \u2014 this opens in a new tab. Once you\u2019re done, restart this step."));
    c.close()
  }), {
    label: "Restart step",
    action: "closeDialog"
  }, "terminal", "low", void 0, void 0, void 0, {
    label: "Open instructions",
    action: "openUdevInstructions",
    icon: "open_in_new"
  }, b)
}
Gi.B = E;

function Ii(a, b) {
  Ji(a, b.U)
}

function Ji(a, b) {
  Jg(a, "Charge your controller", P(function (c) {
    if (!Ki["Your controller\u2019s battery is \u00010\u0001%. It needs to be charged to 10% or more to continue. \n\nCharging from 0\u201310% can take up to 30 minutes. Restart the step to check the battery again."]) {
      Ki["Your controller\u2019s battery is \u00010\u0001%. It needs to be charged to 10% or more to continue. \n\nCharging from 0\u201310% can take up to 30 minutes. Restart the step to check the battery again."] = [];
      var d = /\x01\d+\x01/g,
        e = 0,
        f = 0;
      do {
        var g = d.exec("Your controller\u2019s battery is \u00010\u0001%. It needs to be charged to 10% or more to continue. \n\nCharging from 0\u201310% can take up to 30 minutes. Restart the step to check the battery again.") || void 0;
        Ki["Your controller\u2019s battery is \u00010\u0001%. It needs to be charged to 10% or more to continue. \n\nCharging from 0\u201310% can take up to 30 minutes. Restart the step to check the battery again."][f] = [D("Your controller\u2019s battery is \u00010\u0001%. It needs to be charged to 10% or more to continue. \n\nCharging from 0\u201310% can take up to 30 minutes. Restart the step to check the battery again.".substring(e,
          g && g.index)), g && g[0]];
        f += 1;
        e = d.lastIndex
      } while (g)
    }
    d = v(Ki["Your controller\u2019s battery is \u00010\u0001%. It needs to be charged to 10% or more to continue. \n\nCharging from 0\u201310% can take up to 30 minutes. Restart the step to check the battery again."]);
    for (e = d.next(); !e.done; e = d.next()) switch (e = e.value, e[0] && c.text(e[0]), e[1]) {
      case "\u00010\u0001":
        S(c, Ne(b))
    }
  }), {
    label: "Restart step",
    action: "connectController"
  }, "battery_very_low", "high")
}
Ii.B = E;
var Ki = {};

function Bi() {
  return "Reset your controller and start over"
}

function Ci() {
  return "Unplug your controller, then hold the Stadia button for 10 seconds to reset it. Once that\u2019s done, you can start over."
}

function ti() {
  return "I confirm that I unplugged and reset my controller"
};

function Li() {
  this.g = [];
  this.j = []
}

function Mi(a) {
  a.j.push(new Promise(function (b, c) {
    a.g.push({
      resolve: b,
      reject: c
    })
  }))
}

function Ni(a, b) {
  0 === a.g.length && Mi(a);
  b instanceof Error ? a.g.shift().reject(b) : a.g.shift().resolve(b)
}

function Oi(a) {
  0 === a.j.length && Mi(a);
  return a.j.shift()
};
var Pi = [209, 0, 32, 65];

function Qi(a) {
  if (1610874880 <= a && 1619001344 >= a) return {
    name: "Application A",
    offset: 1610874880,
    size: 8126464,
    aa: 1
  };
  if (1619263488 <= a && 1627389952 >= a) return {
    name: "Application B",
    offset: 1619263488,
    size: 8126464,
    aa: 2
  };
  if (1619001344 <= a && 1619009536 >= a) return {
    name: "Bootloader A",
    offset: 1619001344,
    size: 131072,
    aa: 3
  };
  if (1619132416 <= a && 1619140608 >= a) return {
    name: "Bootloader B",
    offset: 1619132416,
    size: 131072,
    aa: 4
  };
  throw Error("Cannot determine partition for reset handler " + a.toString(16));
}

function Ri(a) {
  try {
    var b = new Uint8Array(a, 0, 4)
  } catch (k) {
    throw Error("Failed to read 4 bytes to determine bootable/nonbootable state");
  }
  b = b.every(function (k, l) {
    return k === Pi[l]
  });
  var c = 1024;
  b && (c += 4096);
  try {
    var d = new DataView(a, c, 256)
  } catch (k) {
    throw Error("Failed to read build info");
  }
  var e = d.getUint32(0, !0);
  d.getUint32(4, !0);
  var f = d.getUint32(8, !0);
  d.getUint32(12, !0);
  c = d.getUint32(16, !0);
  var g = d.getUint32(20, !0);
  d = d.getUint32(252, !0);
  if (1953699234 !== e) throw Error("Invalid build info. Expected header of 0x" +
    (1953699234).toString(16) + ", got 0x" + e.toString(16) + " instead");
  if (1200016776 !== d) throw Error("Invalid build info. Expected footer of 0x" + (1200016776).toString(16) + ", got 0x" + d.toString(16) + " instead");
  if (256 !== f) throw Error("Unexpected build info size: {buildInfo.size}");
  d = 4;
  b && (d += 4096);
  try {
    var h = (new DataView(a)).getUint32(d, !0)
  } catch (k) {
    throw Error("Failed to read reset handler address at 0x" + d.toString(16));
  }
  a = Qi(h);
  return {
    mb: b,
    pb: 0,
    qb: 4096,
    Cb: g,
    Fb: c,
    da: a,
    Hb: h
  }
}

function Si(a, b, c) {
  return a.slice(b, b + c)
};

function Ti(a) {
  return Number(a).toString(16).padStart(8, "0")
}
var Ui = new Map([
    [7077888, "106XA0"],
    [7077889, "106XA1"]
  ]),
  Vi = new Map([
    [6088, "Giga-16m"],
    [6127, "Winbond-16m"]
  ]);

function Wi(a, b, c) {
  return function (d) {
    return null == a ? void 0 : a(b + d / 100 * (c - b))
  }
}

function Xi() {
  var a = Error.call(this, "HID device disconnected");
  this.message = a.message;
  "stack" in a && (this.stack = a.stack)
}
ra(Xi, Error);

function Yi(a) {
  return Promise.race([a, Sc().then(function () {
    throw Error("Timed out waiting for HID input report");
  })])
}

function Zi(a) {
  var b = this;
  this.device = a;
  this.j = new Li;
  this.g = new Li;
  a.addEventListener("inputreport", function (c) {
    console.debug(c);
    8137 === b.device.vendorId && 309 === b.device.productId && 4 === c.reportId ? (c = c.data.getUint32(0, !1), Ni(b.j, {
      ub: c
    })) : 5538 === b.device.vendorId && 115 === b.device.productId && (3 === c.reportId ? $i(b, c.data) : 4 === c.reportId ? aj(b, c.data) : Ni(b.g, Error("unknown reply packet type " + c.reportId)))
  })
}
Zi.prototype.open = function () {
  var a = this;
  return z(function (b) {
    return a.device.opened ? b.J(0) : x(b, a.device.open(), 0)
  })
};
Zi.prototype.close = function () {
  var a = this;
  return z(function (b) {
    return b.return(a.device.close())
  })
};

function bj(a, b) {
  var c, d, e, f, g;
  return z(function (h) {
    switch (h.g) {
      case 1:
        return c = function (k) {
          k.device === a.device && Ni(a.j, new Xi)
        }, navigator.hid.addEventListener("disconnect", c), wa(h), x(h, cj(a, {
          P: 1028,
          address: 536870912,
          Aa: 0,
          Ia: b.byteLength,
          data: 0
        }), 4);
      case 4:
        d = 0;
      case 5:
        if (!(d < b.byteLength)) return x(h, Yi(Oi(a.j)), 8);
        e = dj(a, 2);
        f = Math.min(d + e.byteLength, b.byteLength);
        ej(b.slice(d, f), e);
        return x(h, a.device.sendReport(2, e), 7);
      case 7:
        d = f;
        h.J(5);
        break;
      case 8:
        return g = h.j, console.log("SDP load result: 0x" +
          Ti(g.ub)), x(h, cj(a, {
          P: 2827,
          address: 536871936,
          Aa: 0,
          Ia: 0,
          data: 0
        }), 2);
      case 2:
        za(h), navigator.hid.removeEventListener("disconnect", c), Ba(h, 0)
    }
  })
}

function fj(a, b, c) {
  var d, e, f, g, h, k;
  return z(function (l) {
    switch (l.g) {
      case 1:
        return d = function (n) {
          n.device === a.device && Ni(a.g, new Xi)
        }, navigator.hid.addEventListener("disconnect", d), wa(l), console.log("Detecting MCU type..."), x(l, gj(a), 4);
      case 4:
        return e = l.j, console.log("MCU: " + e), c(1), console.log("Detecting Flash type..."), x(l, hj(a), 5);
      case 5:
        return f = l.j, console.log("Flash: " + f), c(2), console.log("Setting up flash"), x(l, ij(a, f), 6);
      case 6:
        return c(3), console.log("Clearing GPR flags"), x(l, jj(a, 1074757680,
          0), 7);
      case 7:
        return x(l, jj(a, 1074757684, 0), 8);
      case 8:
        return x(l, jj(a, 1074757688, 0), 9);
      case 9:
        c(4);
        g = Ri(b);
        c(5);
        if (!g.mb) {
          l.J(10);
          break
        }
        console.log("Extracting IVT and flashing");
        h = Si(b, g.pb, g.qb);
        return x(l, kj(a, h, Wi(c, 5, 10)), 10);
      case 10:
        return console.log("Flashing to " + g.da.name + " at 0x" + g.da.offset), x(l, lj(a, b, g.da.offset, Wi(c, 10, 99)), 12);
      case 12:
        if (1 === g.da.aa) return x(l, jj(a, 1074757688, 1), 14);
        if (2 !== g.da.aa) {
          l.J(14);
          break
        }
        return x(l, jj(a, 1074757688, 2), 14);
      case 14:
        return c(100), va(l, 18), console.log("Resetting device"),
          x(l, a.reset(), 20);
      case 20:
        console.log("Device reset complete");
        xa(l, 2);
        break;
      case 18:
        k = ya(l), k instanceof Xi ? console.log("Device disconnected, assuming reset to be complete") : console.log(k);
      case 2:
        za(l), navigator.hid.removeEventListener("disconnect", d), Ba(l, 0)
    }
  })
}

function kj(a, b, c) {
  return z(function (d) {
    return 1 == d.g ? x(d, mj(a, 1610616832, b.byteLength, Wi(c, 0, 50)), 2) : x(d, nj(a, 1610616832, b, Wi(c, 50, 100)), 0)
  })
}

function lj(a, b, c, d) {
  return z(function (e) {
    return 1 == e.g ? x(e, mj(a, c, b.byteLength, Wi(d, 0, 50)), 2) : x(e, nj(a, c, b, Wi(d, 50, 100)), 0)
  })
}

function gj(a) {
  var b, c;
  return z(function (d) {
    if (1 == d.g) return x(d, oj(a, 1074627168), 2);
    b = d.j;
    c = Ui.get(b);
    if (!c) throw Error("Unknown MCU type for 0x" + Ti(b));
    return d.return(c)
  })
}

function hj(a) {
  var b, c, d;
  return z(function (e) {
    switch (e.g) {
      case 1:
        return x(e, getFirmwareURL("flashloader_fcb_get_vendor_id.bin"), 2);
      case 2:
        return b = e.j, x(e, nj(a, 8192, b), 3);
      case 3:
        return x(e, pj(a), 4);
      case 4:
        return console.log("Configuring registers to get flash type"), x(e, qj(a, 128, 2147483648, !0), 5);
      case 5:
        return x(e, qj(a, 20, 30, !0), 6);
      case 6:
        return x(e, qj(a, 160, 0, !1), 7);
      case 7:
        return x(e, qj(a, 184, 1, !1), 8);
      case 8:
        return x(e, qj(a, 188, 1, !1), 9);
      case 9:
        return x(e, qj(a, 164, 2, !1), 10);
      case 10:
        return x(e, qj(a, 176, 1, !1),
          11);
      case 11:
        console.log("Waiting for flash detection"), c = 0;
      case 12:
        if (0 !== c) {
          e.J(13);
          break
        }
        return x(e, rj(a), 14);
      case 14:
        c = e.j;
        e.J(12);
        break;
      case 13:
        d = Vi.get(c);
        if (!d) throw Error("Unknown flash type for 0x" + Number(c).toString(16).padStart(4, "0"));
        return e.return(d)
    }
  })
}

function ij(a, b) {
  var c;
  return z(function (d) {
    if (1 == d.g) {
      if ("Giga-16m" === b) return x(d, jj(a, 8192, 3221225990), 3);
      if ("Winbond-16m" !== b) throw Error("unknown flash type " + b);
      return x(d, getFirmwareURL("flashloader_fcb_w25q128jw.bin"), 5)
    }
    return 3 != d.g ? (c = d.j, x(d, nj(a, 8192, c), 3)) : x(d, pj(a), 0)
  })
}

function rj(a) {
  return z(function (b) {
    return 1 == b.g ? x(b, oj(a, 1076527360), 2) : b.return(b.j)
  })
}

function qj(a, b, c, d) {
  var e;
  return z(function (f) {
    return 1 == f.g ? d ? x(f, oj(a, 1076527104 + b), 3) : f.J(2) : 2 != f.g && (e = f.j, c = (e | c) >>> 0, c === e) ? f.return() : x(f, jj(a, 1076527104 + b, c), 0)
  })
}

function mj(a, b, c, d) {
  var e, f, g;
  return z(function (h) {
    1 == h.g && (console.log("Erasing " + c + " bytes from 0x" + Ti(b)), e = c);
    if (4 != h.g) {
      if (!(0 < e)) return h.J(0);
      f = 16384 < e ? 16384 : e;
      console.debug("Step: erasing 0x" + Ti(f) + " bytes from 0x" + Ti(b));
      return x(h, sj(a, {
        P: 2,
        flags: 0,
        parameters: [b, f, 0]
      }), 4)
    }
    b += f;
    e -= f;
    g = void 0;
    null == (g = d) || g((c - e) / c * 100);
    return h.J(2)
  })
}
Zi.prototype.reset = function () {
  var a = this;
  return z(function (b) {
    console.log("Resetting device...");
    return x(b, sj(a, {
      P: 11,
      flags: 0,
      parameters: []
    }), 0)
  })
};

function pj(a) {
  return z(function (b) {
    return x(b, sj(a, {
      P: 17,
      flags: 0,
      parameters: [9, 8192]
    }), 0)
  })
}

function nj(a, b, c, d) {
  var e, f, g, h;
  return z(function (k) {
    switch (k.g) {
      case 1:
        return console.log("Writing " + c.byteLength + " bytes to 0x" + Ti(b)), x(k, sj(a, {
          P: 4,
          flags: 1,
          parameters: [b, c.byteLength, 0]
        }), 2);
      case 2:
        e = 512, f = 0;
      case 3:
        if (!(f < c.byteLength)) return x(k, tj(a), 6);
        g = Math.min(f + e, c.byteLength);
        return x(k, uj(a, c.slice(f, g)), 5);
      case 5:
        f = g;
        h = void 0;
        null == (h = d) || h(f / c.byteLength * 100);
        k.J(3);
        break;
      case 6:
        console.log("Memory write complete."), k.g = 0
    }
  })
}

function jj(a, b, c) {
  return z(function (d) {
    console.log("Setting *(0x" + Ti(b) + ") to 0x" + Ti(c));
    return x(d, sj(a, {
      P: 5,
      flags: 0,
      parameters: [b, 4, c]
    }), 0)
  })
}

function oj(a, b) {
  var c, d, e;
  return z(function (f) {
    if (1 == f.g) return console.log("Reading 32-bit value at 0x" + Ti(b)), x(f, sj(a, {
      P: 3,
      flags: 0,
      parameters: [b, 4, 0]
    }), 2);
    c = f.j;
    if (!c.la) throw Error("no data received in reply");
    if (4 !== c.la.byteLength) throw Error("invalid reply data size: " + c.la.byteLength);
    d = new DataView(c.la);
    e = d.getUint32(0, !0);
    console.log("    *(0x" + Ti(b) + ") == 0x" + Ti(e));
    return f.return(e)
  })
}

function dj(a, b) {
  var c;
  a = v(null != (c = a.device.collections) ? c : []);
  for (c = a.next(); !c.done; c = a.next()) {
    var d = void 0;
    c = v(null != (d = c.value.outputReports) ? d : []);
    for (d = c.next(); !d.done; d = c.next())
      if (d = d.value, d.reportId === b) {
        a = 0;
        var e = void 0;
        c = v(null != (e = d.items) ? e : []);
        for (d = c.next(); !d.done; d = c.next()) {
          d = d.value;
          var f = e = void 0;
          a += (null != (e = d.reportSize) ? e : 0) * (null != (f = d.reportCount) ? f : 0)
        }
        a >>>= 3;
        console.debug("Report length for reportId " + b + " is " + a + " bytes");
        return new ArrayBuffer(a)
      }
  }
  throw Error("Report descriptor for reportId " +
    b + " not found");
}

function cj(a, b) {
  var c = dj(a, 1),
    d = new DataView(c);
  d.setUint16(0, b.P, !1);
  d.setUint32(2, b.address, !1);
  d.setUint8(6, b.Aa);
  d.setUint32(7, b.Ia, !1);
  d.setUint32(11, b.data, !1);
  d.setUint8(15, 0);
  return a.device.sendReport(1, c)
}

function sj(a, b) {
  var c, d;
  return z(function (e) {
    if (1 == e.g) {
      var f = new ArrayBuffer(4 + 4 * b.parameters.length),
        g = new DataView(f);
      g.setUint8(0, b.P);
      g.setUint8(1, b.flags);
      g.setUint8(2, 0);
      g.setUint8(3, b.parameters.length);
      for (var h = 0; h < b.parameters.length; h++) g.setUint32(4 * h + 4, b.parameters[h], !0);
      c = f;
      d = dj(a, 1);
      vj(d, c);
      return x(e, a.device.sendReport(1, d), 2)
    }
    return e.return(tj(a))
  })
}

function uj(a, b) {
  var c;
  return z(function (d) {
    c = dj(a, 2);
    vj(c, b);
    return d.return(a.device.sendReport(2, c))
  })
}

function tj(a) {
  return z(function (b) {
    return b.return(Yi(Oi(a.g)))
  })
}

function $i(a, b) {
  b = wj(b);
  var c = xj(new DataView(b));
  if (160 === c.P) {
    var d = c.parameters[0],
      e = c.parameters[1];
    0 !== d && Ni(a.g, Error("Command " + e + " failed with status " + d))
  } else 163 === c.P && (d = c.parameters[0], 0 !== d && Ni(a.g, Error("ReadMemory failed with status " + d)));
  1 === (c.flags & 1) ? Ni(a.g, new Promise(function (f, g) {
    tj(a).then(function (h) {
      f(h)
    }, g)
  })) : Ni(a.g, {
    Db: b
  })
}

function aj(a, b) {
  var c = wj(b);
  Ni(a.g, new Promise(function (d, e) {
    tj(a).then(function () {
      d({
        la: c
      })
    }, e)
  }))
}

function ej(a, b) {
  if (a.byteLength > b.byteLength) throw Error("Source length of " + a.byteLength + " exceeds target length of " + b.byteLength);
  var c = new DataView(a);
  b = new DataView(b);
  for (var d = 0; d < a.byteLength; d++) b.setUint8(d, c.getUint8(d))
}

function vj(a, b) {
  a = new DataView(a);
  var c = new DataView(b);
  a.setUint8(0, 0);
  a.setUint16(1, b.byteLength, !0);
  for (var d = 0; d < b.byteLength; d++) a.setUint8(3 + d, c.getUint8(d))
}

function wj(a) {
  for (var b = a.getUint16(1, !0), c = new ArrayBuffer(b), d = new DataView(c), e = 0; e < b; e++) d.setUint8(e, a.getUint8(e + 3));
  return c
}

function xj(a) {
  for (var b = a.getUint8(0), c = a.getUint8(1), d = a.getUint8(3), e = [], f = 0; f < d; f++) e.push(a.getUint32(4 + 4 * f, !0));
  return {
    P: b,
    flags: c,
    parameters: e
  }
};

function yj(a) {
  return 37888 === a.productId && 6353 === a.vendorId
}

function zj() {
  var a = APP_CONFIG.serialNumber,
    b, c, d;
  return z(function (e) {
    if (1 == e.g) return x(e, navigator.usb.getDevices(), 2);
    b = e.j;
    c = b.filter(yj).find(function (f) {
      return f.serialNumber === a
    });
    return e.return(null != (d = c) ? d : null)
  })
}

function Aj(a) {
  var b;
  return z(function (c) {
    return 1 == c.g ? (b = a.configuration.interfaces.find(function (d) {
      return 255 === d.alternate.interfaceClass
    }), x(c, a.claimInterface(b.interfaceNumber), 2)) : c.return(b.interfaceNumber)
  })
}

function Bj(a, b) {
  var c, d, e;
  return z(function (f) {
    if (1 == f.g) return x(f, Aj(a), 2);
    if (3 != f.g) return c = f.j, d = {
      index: c,
      recipient: "interface",
      request: b,
      requestType: "class",
      value: 0
    }, x(f, a.controlTransferIn(d, 64), 3);
    e = f.j;
    if ("ok" !== e.status) throw Error("Control transfer in failed.");
    return f.return(e.data)
  })
}

function Cj(a) {
  var b, c, d;
  return z(function (e) {
    if (1 == e.g) return x(e, Aj(a), 2);
    if (3 != e.g) return b = e.j, c = {
      index: b,
      recipient: "interface",
      request: 131,
      requestType: "class",
      value: 0
    }, x(e, a.controlTransferOut(c), 3);
    d = e.j;
    if ("ok" !== d.status) throw Error("Control transfer out failed.");
    e.g = 0
  })
}

function Dj(a) {
  var b;
  return z(function (c) {
    if (1 == c.g) return x(c, Bj(a, 129), 2);
    b = c.j;
    return c.return(b.getUint32(0, !0))
  })
}

function Ej(a) {
  var b;
  return z(function (c) {
    switch (c.g) {
      case 1:
        return x(c, Cj(a), 2);
      case 2:
        return x(c, new Promise(function (d) {
          return void setTimeout(d, 500)
        }), 3);
      case 3:
        return x(c, Bj(a, 132), 4);
      case 4:
        return b = c.j, c.return(b.getUint16(0, !0))
    }
  })
};
var Fj = void 0;

function Gj() {
  void 0 === Fj && (Fj = "stadia.google.com");
  return Fj
}

function Hj(a, b, c) {
  b = P(function (f) {
    f.text(D("You\u2019ll need a USB data cable for these actions. The cable that came with your controller will work."))
  });
  var d = P(function (f) {
      f.open("div", "z07dwe");
      f.i(Ij || (Ij = ["class", "PanelContent CardsAction GridSpan10Center GridSmSpanFull GridXsSpanFull"]));
      f.h();
      var g = P(function (q) {
          q.text(D("Switch to Bluetooth Mode"))
        }),
        h = P(function (q) {
          if (!Jj["\u00010\u0001Play wirelessly on supported Bluetooth devices. This disables Stadia Wi-Fi wireless play.\u00011\u0001\u00010\u0001\u00012\u0001Switching is permanent\u00013\u0001\u00011\u0001"]) {
            Jj["\u00010\u0001Play wirelessly on supported Bluetooth devices. This disables Stadia Wi-Fi wireless play.\u00011\u0001\u00010\u0001\u00012\u0001Switching is permanent\u00013\u0001\u00011\u0001"] = [];
            var w = /\x01\d+\x01/g,
              m = 0,
              r = 0;
            do {
              var F = w.exec("\u00010\u0001Play wirelessly on supported Bluetooth devices. This disables Stadia Wi-Fi wireless play.\u00011\u0001\u00010\u0001\u00012\u0001Switching is permanent\u00013\u0001\u00011\u0001") || void 0;
              Jj["\u00010\u0001Play wirelessly on supported Bluetooth devices. This disables Stadia Wi-Fi wireless play.\u00011\u0001\u00010\u0001\u00012\u0001Switching is permanent\u00013\u0001\u00011\u0001"][r] = [D("\u00010\u0001Play wirelessly on supported Bluetooth devices. This disables Stadia Wi-Fi wireless play.\u00011\u0001\u00010\u0001\u00012\u0001Switching is permanent\u00013\u0001\u00011\u0001".substring(m,
                F && F.index)), F && F[0]];
              r += 1;
              m = w.lastIndex
            } while (F)
          }
          w = v(Jj["\u00010\u0001Play wirelessly on supported Bluetooth devices. This disables Stadia Wi-Fi wireless play.\u00011\u0001\u00010\u0001\u00012\u0001Switching is permanent\u00013\u0001\u00011\u0001"]);
          for (m = w.next(); !m.done; m = w.next()) switch (m = m.value, m[0] && q.text(m[0]), m[1]) {
            case "\u00010\u0001":
              q.open("p", "sd0Kzc");
              q.h();
              break;
            case "\u00011\u0001":
              q.close();
              break;
            case "\u00012\u0001":
              q.open("strong", "In7aAd");
              q.h();
              break;
            case "\u00013\u0001":
              q.close()
          }
          q.open("p",
            "Nl00lf");
          q.h();
          q.open("a", "eepBqb");
          q.i(Kj || (Kj = ["target", "_blank"]));
          q.o("href", H(Sd()));
          q.h();
          var aa = q.m("W1pELd");
          R(q, stringDevices, null, c);
          q.l(aa);
          q.close();
          q.close()
        }),
        k = P(function (q) {
          var w = q.m("NyLHoc");
          V(q, "Start", "Start switching the controller into Bluetooth mode", "secondary", !0, void 0, void 0, void 0, !0, void 0, void 0, "click:selectBruce");
          q.l(w)
        }),
        l = f.m("bGPAu");
      dh(f, g, h, "bluetooth_searching", "3 min", "Estimated time of 3 minutes", k);
      f.l(l);
      g = P(function (q) {
        q.text(D("Check mode and updates"))
      });
      h = P(function (q) {
        q.text(D("Check if your controller is in Bluetooth mode, and if a Bluetooth update is available."))
      });
      k = P(function (q) {
        var w = q.m("mz6oEd");
        V(q, "Check", void 0, "outlined", !0, void 0, void 0, void 0, void 0, void 0, void 0, "click:checkMode");
        q.l(w)
      });
      var n = f.m("DPxxsb");
      dh(f, g, h, "update", "1 min", "Estimated time of 1 minute", k);
      f.l(n);
      if (checkIfGoogleStaff()) {
        var p = f.m("gdP1Gd");
        V(f, "Revert to Wi-Fi mode (Dogfood only)", void 0, "text", void 0, void 0, void 0, void 0, void 0, void 0, void 0, "click:selectGotham");
        f.l(p)
      }
      f.close()
    }),
    e = a.m("pinEZ");
  xg(a, d, b);
  a.l(e)
}
Hj.B = E;
var Ij, Jj = {},
  Kj;

function Lj(a, b) {
  b = b || {};
  Mj(a, b.C)
}

function Mj(a, b) {
  var c = P(function (e) {
      e.open("div", "iqjG8c");
      e.i(Nj || (Nj = ["class", "PanelContent GridSpan6Center GridSmSpan4Center GridXsSpanFull"]));
      e.h();
      var f = e.m("lmjj8d");
      Yh(e, "Verify_Plug_in_controller.svg", "A Stadia Controller with an arrow indicating that you plug the USB cable into the USB port on the top of the controller.", 1.3333333333333333);
      e.l(f);
      e.close()
    }),
    d = a.m("nidk8e");
  W(a, 1, "First, plug your Stadia Controller into your computer", c, b ? "flasher" : "empty", void 0, "Make sure your controller has been charged for 30 minutes, and you\u2019re using a USB data cable.",
    void 0, void 0, void 0, "click:returnHome", "click:verifyController", "Continue");
  a.l(d)
}
Lj.B = E;
var Nj;

function Oj(a, b) {
  Pj(a, b.locale, b.ga, b.C)
}

function Pj(a, b, c, d) {
  var e = P(function (g) {
      g.open("div", "raBDRc");
      g.i(Qj || (Qj = ["class", "PanelContent GridSpan6Center GridSmSpan4Center GridXsSpanFull"]));
      g.h();
      g.open("div", "NyP9mf");
      g.i(Rj || (Rj = ["class", "PanelTopButtonRow"]));
      g.h();
      var h = g.m("bdTlx");
      V(g, "Allow Chrome to verify", void 0, "secondary", void 0, void 0, void 0, void 0, !0, void 0, void 0, "click:selectControllerUsbDevice");
      g.l(h);
      if (c) {
        g.open("div", "HgC96e");
        g.i(Sj || (Sj = ["class", "TopButtonHelpText"]));
        g.h();
        var k = g.m("xUhbVc");
        Tj(g);
        g.l(k);
        g.close()
      }
      g.close();
      var l = "A two-part image illustrating what to do during this step after selecting the \u201cAllow Chrome to verify\u201d button. The first part shows the Chrome device list dialog with the text \u201c" + Gj() + " wants to connect\u201d. The device list has one entry titled \u201cStadia Controller rev. A\u201d as an example. A mouse is clicking the device to select it. In the second part of the image, a mouse is clicking the \u201cConnect\u201d button in that same dialog.",
        n = g.m("HT9JPc");
      Uj(g, "" + Ve("Chrome_dialog_Verify.svg",
        b), Vj("Stadia Controller", "SP Blank RT Family", "USB COMPOSITE DEVICE", "Bootloader"), l, void 0, "No compatible devices found? Make sure your controller has been charged for 30 minutes and you\u2019re using a USB data cable, then try again.", 1.9722650231124808);
      g.l(n);
      g.close()
    }),
    f = a.m("dVOwy");
  W(a, 1, "Allow Chrome to verify your controller", e, d ? "flasher" : "empty", void 0, "This opens a device list by your URL bar. Select your controller in the list, then click \u201cConnect\u201d.", void 0, null != d);
  a.l(f)
}
Oj.B = E;
var Qj, Rj, Sj;

function Wj(a) {
  var b = Xj(),
    c = stringHome(),
    d = P(function (g) {
      if (!Yj["Your controller has the latest version of Bluetooth mode. It can connect to devices using\u00a0Bluetooth.\n\u00010\u0001List of supported devices\u00011\u0001"]) {
        Yj["Your controller has the latest version of Bluetooth mode. It can connect to devices using\u00a0Bluetooth.\n\u00010\u0001List of supported devices\u00011\u0001"] = [];
        var h = /\x01\d+\x01/g,
          k = 0,
          l = 0;
        do {
          var n = h.exec("Your controller has the latest version of Bluetooth mode. It can connect to devices using\u00a0Bluetooth.\n\u00010\u0001List of supported devices\u00011\u0001") || void 0;
          Yj["Your controller has the latest version of Bluetooth mode. It can connect to devices using\u00a0Bluetooth.\n\u00010\u0001List of supported devices\u00011\u0001"][l] = [D("Your controller has the latest version of Bluetooth mode. It can connect to devices using\u00a0Bluetooth.\n\u00010\u0001List of supported devices\u00011\u0001".substring(k, n && n.index)), n && n[0]];
          l += 1;
          k = h.lastIndex
        } while (n)
      }
      h = v(Yj["Your controller has the latest version of Bluetooth mode. It can connect to devices using\u00a0Bluetooth.\n\u00010\u0001List of supported devices\u00011\u0001"]);
      for (k = h.next(); !k.done; k = h.next()) switch (k = k.value, k[0] && g.text(k[0]), k[1]) {
        case "\u00010\u0001":
          g.open("a", "i7Dbsc");
          g.i(Zj || (Zj = ["target", "_blank"]));
          g.o("href", H(Sd()));
          g.h();
          break;
        case "\u00011\u0001":
          g.close()
      }
    }),
    e = P(function (g) {
      g.open("div", "cEqhUc");
      g.i(ak || (ak = ["class", "PanelContent GridSpan6Center GridSmSpan4Center GridXsSpanFull"]));
      g.h();
      var h = g.m("WrVLNb");
      Yh(g, "Check_Bluetooth_mode.svg", void 0, 1.3333333333333333);
      g.l(h);
      g.close();
      g.open("div", "lN3q3e");
      g.i(bk || (bk = ["class", "ButtonStack GridSpan4Center GridSmSpan4Center GridXsSpanFull"]));
      g.h();
      var k = g.m("o58d6c");
      V(g, b, void 0, "secondary", void 0, void 0, void 0, void 0, !0, void 0, void 0, "click:gettingStartedModal1");
      g.l(k);
      var l = g.m("z9JXwb");
      V(g, "Reinstall Bluetooth mode", void 0, "stadiasecondary", void 0, void 0, void 0, void 0, void 0, void 0, void 0, "click:applyBruce");
      g.l(l);
      var n = g.m("Tan5mc");
      V(g, c, void 0, "stadiatext", void 0, void 0, void 0, void 0, void 0, void 0, void 0, "click:returnHome");
      g.l(n);
      g.close()
    }),
    f = a.m("B80zwb");
  W(a, 1, "Your controller is up to date in Bluetooth mode", e, "empty",
    !0, d, !1);
  a.l(f)
}
Wj.B = E;
var Yj = {},
  Zj, ak, bk;

function ck(a) {
  var b = Xj(),
    c = stringHome(),
    d = P(function (g) {
      g.text(D("Your controller is on an older version of Bluetooth mode. Update to the latest version \u2014 this should only take a few minutes."))
    }),
    e = P(function (g) {
      g.open("div", "atE8G");
      g.i(dk || (dk = ["class", "PanelContent GridSpan6Center GridSmSpan4Center GridXsSpanFull"]));
      g.h();
      var h = g.m("HqXteb");
      Yh(g, "Check_Bluetooth_mode.svg", void 0, 1.3333333333333333);
      g.l(h);
      g.close();
      g.open("div", "PSQ0Vc");
      g.i(ek || (ek = ["class", "ButtonStack GridSpan4Center GridSmSpan4Center GridXsSpanFull"]));
      g.h();
      var k = g.m("dz5ldb");
      V(g, "Update to latest version", void 0, "secondary", !0, void 0, void 0, void 0, !0, void 0, void 0, "click:applyBruce");
      g.l(k);
      var l = g.m("YZpCSc");
      V(g, b, void 0, "stadiasecondary", void 0, void 0, void 0, void 0, void 0, void 0, void 0, "click:gettingStartedModal1");
      g.l(l);
      var n = g.m("pyt4Ze");
      V(g, c, void 0, "stadiatext", void 0, void 0, void 0, void 0, void 0, void 0, void 0, "click:returnHome");
      g.l(n);
      g.close()
    }),
    f = a.m("wL8ggd");
  W(a, 1, "A new version of Bluetooth mode is available", e, void 0, !0, d, !1);
  a.l(f)
}
ck.B = E;
var dk, ek;

function fk(a) {
  var b = stringHome(),
    c = P(function (f) {
      f.text(D("This is the best way to play on Stadia. Switch to Bluetooth mode to play on more devices and services."))
    }),
    d = P(function (f) {
      f.open("div", "dO7n9d");
      f.i(gk || (gk = ["class", "PanelContent GridSpan6Center GridSmSpan4Center GridXsSpanFull"]));
      f.h();
      var g = f.m("CIeIw");
      Yh(f, "Check_Wifi_mode.svg", void 0, 1.3333333333333333);
      f.l(g);
      f.close();
      f.open("div", "wIjGwd");
      f.i(hk || (hk = ["class", "ButtonStack GridSpan4Center GridSmSpan4Center GridXsSpanFull"]));
      f.h();
      var h =
        f.m("NFj8Xb");
      V(f, "Switch to Bluetooth mode", void 0, "secondary", void 0, void 0, void 0, void 0, !0, void 0, void 0, "click:applyBruce");
      f.l(h);
      var k = f.m("e7ApSc");
      V(f, "Check another Stadia Controller", void 0, "stadiasecondary", void 0, void 0, void 0, void 0, void 0, void 0, void 0, "click:selectAction");
      f.l(k);
      var l = f.m("bOhOCc");
      V(f, b, void 0, "stadiatext", void 0, void 0, void 0, void 0, void 0, void 0, void 0, "click:returnHome");
      f.l(l);
      f.close()
    }),
    e = a.m("Xb38Oe");
  W(a, 1, "Your controller is in Stadia Wi-Fi mode", d, "empty",
    !0, c, !1);
  a.l(e)
}
fk.B = E;
var gk, hk;

function ik(a) {
  var b = P(function (d) {
      d.open("div", "x5B42d");
      d.i(jk || (jk = ["class", "PanelContent GridSpan6Center GridSmSpan4Center GridXsSpanFull"]));
      d.h();
      var e = d.m("RYg7mf");
      Yh(d, "Verify_Chrome_verified_your_controller.svg", void 0, 1.3333333333333333);
      d.l(e);
      d.close()
    }),
    c = a.m("OTcTHc");
  W(a, 1, "Chrome verified your Stadia Controller", b, void 0, !0, "Go to the next step to unlock your controller", void 0, void 0, void 0, void 0, "click:enterSdpMode");
  a.l(c)
}
ik.B = E;
var jk;

function kk(a) {
  var b = P(function (d) {
      d.open("div", "BoAfm");
      d.i(lk || (lk = ["class", "PanelContent InstructionCards GridSpanFull"]));
      d.o("aria-label", "Instructions");
      d.h();
      var e = d.m("UauwZ");
      nh(d, "1", "Unlock_Unplug.svg", "Unplug your controller to power it off", "If it turns on again, hold the Stadia button for 4 seconds to power it off.", "A Stadia Controller with the USB cord being unplugged out of the controller\u2019s USB port.");
      d.l(e);
      var f = P(function (l) {
          var n = P(function (r) {
            var F = r.m("y8xX9");
            Dh(r);
            r.l(F)
          });
          if (!mk["Hold \u00010\u0001 while plugging in your controller"]) {
            mk["Hold \u00010\u0001 while plugging in your controller"] = [];
            var p = /\x01\d+\x01/g,
              q = 0,
              w = 0;
            do {
              var m = p.exec("Hold \u00010\u0001 while plugging in your controller") || void 0;
              mk["Hold \u00010\u0001 while plugging in your controller"][w] = [D("Hold \u00010\u0001 while plugging in your controller".substring(q, m && m.index)), m && m[0]];
              w += 1;
              q = p.lastIndex
            } while (m)
          }
          p = v(mk["Hold \u00010\u0001 while plugging in your controller"]);
          for (q = p.next(); !q.done; q =
            p.next()) switch (q = q.value, q[0] && l.text(q[0]), q[1]) {
            case "\u00010\u0001":
              S(l, n)
          }
        }),
        g = P(function (l) {
          l.text(D("The status light should remain off. If it turns on, unplug and try again."))
        }),
        h = d.m("pTGQ6e");
      nh(d, "2", "Unlock_Option_Plug.svg", f, g, "A Stadia Controller with the Menu button being held down, while a USB cord is being plugged into the controller\u2019s USB port. The menu button is the top-left button on the front face of the controller, closest to the directional pad.", "Hold the Menu button while plugging in your controller");
      d.l(h);
      f = P(function (l) {
        var n = P(function (r) {
          var F = r.m("Gy0vYe");
          Dh(r);
          r.l(F);
          r.text(" + ");
          var aa = r.m("cekumc");
          r.open("span", "sYikT");
          r.i(Fh || (Fh = ["class", "ControllerButton assistant", "role", "img"]));
          r.o("aria-label", "the Google Assistant button");
          r.h();
          r.text("google_assistant");
          r.G();
          r.l(aa);
          r.text(" + ");
          var M = r.m("Vz2Ojf");
          r.open("span", "Feym7e");
          r.i(Gh || (Gh = ["class", "ControllerButton btna", "role", "img"]));
          r.o("aria-label", "the A button");
          r.h();
          r.text("A");
          r.G();
          r.l(M);
          r.text(" + ");
          var Q = r.m("jTffE");
          r.open("span", "kY6s3");
          r.i(Hh || (Hh = ["class", "ControllerButton btny", "role", "img"]));
          r.o("aria-label", "the Y button");
          r.h();
          r.text("Y");
          r.G();
          r.l(Q)
        });
        if (!nk["Press \u00010\u0001 at the same time"]) {
          nk["Press \u00010\u0001 at the same time"] = [];
          var p = /\x01\d+\x01/g,
            q = 0,
            w = 0;
          do {
            var m = p.exec("Press \u00010\u0001 at the same time") || void 0;
            nk["Press \u00010\u0001 at the same time"][w] = [D("Press \u00010\u0001 at the same time".substring(q, m && m.index)), m && m[0]];
            w += 1;
            q = p.lastIndex
          } while (m)
        }
        p = v(nk["Press \u00010\u0001 at the same time"]);
        for (q = p.next(); !q.done; q = p.next()) switch (q = q.value, q[0] && l.text(q[0]), q[1]) {
          case "\u00010\u0001":
            S(l, n)
        }
      });
      g = P(function (l) {
        l.text(D("There won\u2019t be any controller feedback. Go to the next step to confirm it unlocked."))
      });
      var k = d.m("qZlFue");
      nh(d, "3", "Unlock_Four_buttons.svg", f, g, "A plugged-in Stadia Controller with the Menu button, the Google Assistant button, the A button, and the Y button indicated. The menu button is the top-left oval button on the front face of the controller, closest to the directional pad. The circular Google Assistant button is just below and slightly to the right of the Menu button. The circular A and Y buttons are on the right side of the front face of the controller in a diamond formation with 2 other circular buttons, 4 buttons total. In this formation, the Y button is the top button, and the A button is the bottom button.",
        "Press the Menu button, the Google Assistant button, the A button, and the Y button at the same time.");
      d.l(k);
      d.close()
    }),
    c = a.m("y7eUhc");
  W(a, 2, "Unlock your Stadia Controller", b, void 0, void 0, "Your controller needs to be unlocked to download updates. Follow these instructions to unlock your controller.", void 0, void 0, void 0, void 0, "click:uploadFlashloader");
  a.l(c)
}
kk.B = E;
var lk, mk = {},
  nk = {};

function ok(a, b, c) {
  pk(c, a, b.C, b.locale, b.ga, b.progress)
}

function pk(a, b, c, d, e, f) {
  var g = void 0 === f ? !1 : f;
  f = "";
  "bruce" == c ? f += "Download Bluetooth mode update" : "gotham" == c && (f += "Download Wi-Fi mode");
  var h = P(function (p) {
      p.text(D("Select your controller in the Chrome device list again, then click \u201cConnect.\u201d\nThis checks that your controller is unlocked, then starts downloading to the controller."))
    }),
    k = P(function (p) {
      p.open("div", "Lg7Vre");
      p.i(qk || (qk = ["class", "PanelContent GridSpan6Center GridSmSpanFull GridXsSpanFull"]));
      p.h();
      if (g) {
        p.open("div",
          "OJg2Gb");
        p.i(rk || (rk = ["class", "LoadingContent"]));
        p.h();
        var q = p.m("UDnWcb");
        Ih(p, "progress-circle");
        p.l(q);
        p.open("div", "njAcjf");
        p.i(sk || (sk = ["class", "LoadingText"]));
        p.h();
        p.open("label", "ijVFed");
        p.i(tk || (tk = ["class", "Major", "for", "progress-circle"]));
        p.h();
        "bruce" == c ? p.text(D("Downloading Bluetooth mode update. Don\u2019t unplug your controller.")) : "gotham" == c && p.text("Downloading Wi-Fi mode. Don\u2019t unplug your controller.");
        p.close();
        p.open("span", "Tpyibb");
        p.i(uk || (uk = ["class", "Minor"]));
        p.h();
        p.text(D("This will only take a moment..."));
        p.close();
        p.close();
        p.close()
      } else {
        p.open("div", "rv60bc");
        p.i(vk || (vk = ["class", "PanelTopButtonRow"]));
        p.h();
        var w = p.m("GrjH3e");
        V(p, "Allow Chrome to download", void 0, "secondary", void 0, void 0, void 0, void 0, !0, void 0, void 0, "click:selectController");
        p.l(w);
        if (e) {
          p.open("div", "dtI4N");
          p.i(wk || (wk = ["class", "TopButtonHelpText"]));
          p.h();
          var m = p.m("ldKEAd");
          Tj(p);
          p.l(m);
          p.close()
        }
        p.close();
        var r = "A two-part image illustrating what to do during this step after selecting the \u201cAllow Chrome to download\u201d button. The first part shows the Chrome device list dialog with the text \u201c" +
          Gj() + " wants to connect to a HID device\u201d. The device list has one entry titled \u201cSP Blank RT Family\u201d as an example. A mouse is clicking the device to select it. In the second part of the image, a mouse is clicking the \u201cConnect\u201d button in that same dialog.",
          F = P(function (Q) {
            var y = Q.m("liTRHe");
            R(Q, xk, {
              Ea: "SP Blank RT Family",
              Sa: "Stadia Controller",
              Ta: "USB COMPOSITE DEVICE"
            }, a);
            Q.l(y)
          }),
          aa = P(function (Q) {
            Q.text(D("No compatible devices found? The controller may still be locked. Go back to the Unlock step and\u00a0try\u00a0again."))
          }),
          M = p.m("So4Pee");
        Uj(p, "" + Ve("Chrome_dialog_Download.svg", d), F, r, void 0, aa, 1.9722650231124808);
        p.l(M)
      }
      p.close()
    }),
    l = P(function (p) {
      var q = p.m("V5FAMe");
      V(p, "Back to Unlock step", void 0, "outlined", void 0, void 0, void 0, void 0, !0, void 0, void 0, "click:enterSdpMode");
      p.l(q)
    }),
    n = b.m("qyj8Ob");
  W(b, 3, f, k, void 0, void 0, h, !g, void 0, l);
  b.l(n)
}
ok.B = E;
var qk, vk, wk, rk, sk, tk, uk;

function yk(a, b) {
  zk(a, b.C)
}

function zk(a, b) {
  var c = "";
  "bruce" == b ? c += "You\u2019re almost done! Go to the final step to install the latest version of Bluetooth mode on your controller." : "gotham" == b && (c += "You\u2019re almost done! Go to the final step to install and enable Wi-Fi mode on your controller.");
  b = c;
  c = P(function (e) {
    e.open("div", "EubiEf");
    e.i(Ak || (Ak = ["class", "PanelContent GridSpan6Center GridSmSpan4Center GridXsSpanFull"]));
    e.h();
    var f = e.m("ug8N5b");
    Yh(e, "Download_Download_complete.svg", void 0, 1.3333333333333333);
    e.l(f);
    e.close()
  });
  var d = a.m("xx9bMc");
  W(a, 3, "Download complete", c, void 0, !0, b, void 0, void 0, void 0, void 0, "click:uploadFirmware");
  a.l(d)
}
yk.B = E;
var Ak;

function Bk(a, b, c) {
  Ck(c, a, b.C, b.locale, b.progress)
}

function Ck(a, b, c, d, e) {
  var f = "";
  "bruce" == c ? f += "Install Bluetooth mode" : "gotham" == c && (f += "Install & enable Wi-Fi mode");
  var g = P(function (l) {
      l.text(D("One more time \u2014 select your controller in the Chrome device list, then click \u201cConnect\u201d.\nInstallation will start automatically, and should only take a minute."))
    }),
    h = P(function (l) {
      l.open("div", "U3Bapc");
      l.i(Dk || (Dk = ["class", "PanelContent GridSpan6Center GridSmSpanFull GridXsSpanFull"]));
      l.h();
      if (null == e) {
        l.open("div", "vfLJmf");
        l.i(Ek ||
          (Ek = ["class", "PanelTopButtonRow"]));
        l.h();
        var n = l.m("YdGuX");
        V(l, "Allow Chrome to install", void 0, "secondary", void 0, void 0, void 0, void 0, !0, void 0, void 0, "click:selectController");
        l.l(n);
        l.close();
        var p = "A two-part image illustrating what to do during this step after selecting the \u201cAllow Chrome to install\u201d button. The first part shows the Chrome device list dialog with the text \u201c" + Gj() + " wants to connect to a HID device\u201d. The device list has one entry titled \u201cUSB COMPOSITE DEVICE\u201d as an example. A mouse is clicking the device to select it. In the second part of the image, a mouse is clicking the \u201cConnect\u201d button in that same dialog.",
          q = P(function (F) {
            var aa = F.m("SSPuh");
            R(F, xk, {
              Ea: "USB COMPOSITE DEVICE",
              Sa: "Stadia Controller",
              Ta: "SP Blank RT Family"
            }, a);
            F.l(aa)
          }),
          w = P(function (F) {
            F.text(D("No compatible device found? Make sure your controller is plugged in and\u00a0try\u00a0again."))
          }),
          m = l.m("Ted0qb");
        Uj(l, "" + Ve("Chrome_dialog_Install.svg", d), q, p, void 0, w, 1.9722650231124808);
        l.l(m)
      } else {
        l.open("div", "gNJfld");
        l.i(Fk || (Fk = ["class", "LoadingContent"]));
        l.h();
        var r = l.m("nTKPs");
        Ih(l, "progress-bar", "Installation progress", e);
        l.l(r);
        l.open("div", "FTvqsf");
        l.i(Gk || (Gk = ["class", "LoadingText"]));
        l.h();
        l.open("label", "aZOubb");
        l.i(Hk || (Hk = ["class", "Major", "for", "progress-bar"]));
        l.h();
        "bruce" == c ? l.text(D("Installing Bluetooth mode update. Don\u2019t unplug your controller.")) : "gotham" == c && l.text("Installing Wi-Fi mode. Don\u2019t unplug your controller.");
        l.close();
        l.close();
        l.close()
      }
      l.close()
    }),
    k = b.m("V4peNc");
  W(b, 4, f, h, void 0, void 0, g, null == e, !1);
  b.l(k)
}
Bk.B = E;
var Dk, Ek, Fk, Gk, Hk;

function Ik(a, b) {
  Jk(a, b.C)
}

function Jk(a, b) {
  if ("bruce" == b) {
    b = P(function (f) {
      f.text(D("Your controller is in Bluetooth mode and can pair to Bluetooth devices.\nYou can now unplug your controller."))
    });
    var c = P(function (f) {
        f.open("div", "GsHmBe");
        f.i(Kk || (Kk = ["class", "PanelContent GridSpan6Center GridSmSpanFull GridXsSpanFull"]));
        f.h();
        var g = P(function (q) {
            q.text(D("Tip: The first time you turn on the controller, it should enter pairing mode \u2014 the status light should flash orange. To enter pairing mode manually, hold the \u201cY + Stadia\u201d buttons for 2 seconds. Once paired, the controller auto-connects to the last paired device when turned on."))
          }),
          h = f.m("cxJQre");
        Uj(f, "Finish_Bluetooth_enabled.svg", g, "A Stadia Controller emitting Bluetooth radio waves to a desktop, laptop, and mobile phone. The screens all have the Bluetooth symbol on them, and a hand-drawn rocket is launching out of the screens towards the controller.", "lightbulb", void 0, 1.9722650231124808);
        f.l(h);
        f.close();
        f.open("div", "E3jusd");
        f.i(Lk || (Lk = ["class", "ButtonStack GridSpan4Center GridSmSpan4Center GridXsSpanFull"]));
        f.h();
        g = Xj();
        var k = stringHome(),
          l = f.m("BpOomf");
        V(f, g, void 0, "secondary",
          void 0, void 0, void 0, void 0, !0, void 0, void 0, "click:gettingStartedModal1");
        f.l(l);
        var n = f.m("cEnfFc");
        V(f, "Update another Stadia Controller", void 0, "stadiasecondary", void 0, void 0, void 0, void 0, void 0, void 0, void 0, "click:selectAction");
        f.l(n);
        var p = f.m("W3n0Eb");
        V(f, k, void 0, "stadiatext", void 0, void 0, void 0, void 0, void 0, void 0, void 0, "click:returnHome");
        f.l(p);
        f.close()
      }),
      d = a.m("LlrLfb");
    W(a, 4, "The latest Bluetooth mode update is installed. Game on!", c, void 0, !0, b, !1);
    a.l(d)
  } else if ("gotham" ==
    b) {
    b = P(function (f) {
      f.text("Your controller is now in Wi-Fi mode. Enjoy gaming on Stadia.\nYou can now unplug the controller.")
    });
    c = P(function (f) {
      f.open("div", "XH68Mc");
      f.i(Mk || (Mk = ["class", "PanelContent GridSpan6Center GridSmSpanFull GridXsSpanFull"]));
      f.h();
      var g = P(function (n) {
          n.open("strong", "ue9kf");
          n.h();
          n.text("Tip:");
          n.close();
          n.text(" Once the controller is unplugged, hold the Stadia button for 4 seconds to turn it on and enter linking mode.")
        }),
        h = f.m("ogtZnd");
      Uj(f, "Finish_Wi_Fi_enabled.svg",
        g, "A Stadia Controller emitting Wi-Fi radio waves with the Stadia logo towards a desktop, laptop, and mobile phone. The screens all have Stadia symbols on them, and a hand-drawn rocket is launching out of the screens towards the controller.", "lightbulb", void 0, 1.966205837173579);
      f.l(h);
      f.close();
      f.open("div", "rqmDSd");
      f.i(Nk || (Nk = ["class", "ButtonStack GridSpan4Center GridSmSpan4Center GridXsSpanFull"]));
      f.h();
      g = stringHome();
      var k = f.m("SiZJif");
      V(f, "Update another Stadia Controller", void 0, "stadiasecondary",
        void 0, void 0, void 0, void 0, !0, void 0, void 0, "click:selectAction");
      f.l(k);
      var l = f.m("roDMtc");
      V(f, g, void 0, "stadiatext", void 0, void 0, void 0, void 0, void 0, void 0, void 0, "click:returnHome");
      f.l(l);
      f.close()
    });
    var e = a.m("ENlWoe");
    W(a, 4, "Wi-Fi mode is enabled. Game on!", c, void 0, !0, b, !1);
    a.l(e)
  }
}
Ik.B = E;
var Kk, Lk, Mk, Nk;

function Ok(a) {
  var b = P(function (e) {
      e.text(D("Chrome couldn\u2019t automatically confirm if installation worked. Check the controller mode to confirm."))
    }),
    c = P(function (e) {
      e.open("div", "usoqif");
      e.i(Pk || (Pk = ["class", "PanelContent GridSpan6Center GridSmSpan4Center GridXsSpanFull"]));
      e.h();
      e.open("div", "aPNRHc");
      e.i(Qk || (Qk = ["class", "PanelTopButtonRow"]));
      e.h();
      var f = e.m("nMTav");
      V(e, "Check controller mode", void 0, "secondary", void 0, void 0, void 0, void 0, !0, void 0, void 0, "click:checkMode");
      e.l(f);
      e.close();
      var g = e.m("AKPpge");
      Yh(e, "Finished_but_needs_confirmation.svg", void 0, 1.3333333333333333);
      e.l(g);
      e.close()
    }),
    d = a.m("mll0K");
  W(a, 4, "Check the controller mode to confirm installation", c, void 0, !0, b, !1);
  a.l(d)
}
Ok.B = E;
var Pk, Qk;

function Uj(a, b, c, d, e, f, g) {
  e = void 0 === e ? "info" : e;
  a.open("div", "cKk6Nc");
  a.i(Rk || (Rk = ["class", "DialogImageWithTipAndHelpText"]));
  a.h();
  a.open("div", "tQUYjc");
  a.i(Sk || (Sk = ["class", "DialogImageWithTip"]));
  a.h();
  a.open("img", "IvTg7d");
  a.i(Tk || (Tk = ["class", "DialogImage"]));
  a.o("src", "assets/" + b);
  a.o("alt", d ? d : "");
  g && a.o("style", "aspect-ratio: " + Cd(g) + ";");
  a.h();
  a.close();
  a.open("div", "Hij3ie");
  a.i(Uk || (Uk = ["class", "DialogTip"]));
  a.h();
  a.open("div", "dHymud");
  a.i(Vk || (Vk = ["class", "DialogTipContent"]));
  a.h();
  a.open("span", "a2k6S");
  a.i(Wk || (Wk = ["class", "DialogTipIcon", "aria-hidden", "true"]));
  a.h();
  S(a, e);
  a.close();
  a.open("span", "jTwfxc");
  a.i(Xk || (Xk = ["class", "DialogTipText"]));
  a.h();
  S(a, c);
  a.close();
  a.close();
  a.close();
  a.close();
  T(f) && (a.open("div", "D04Fyc"), a.i(Yk || (Yk = ["class", "DialogHelpText"])), a.h(), S(a, f), a.close());
  a.G()
}
var Rk, Sk, Tk, Uk, Vk, Wk, Xk, Yk;

function xk(a) {
  return Vj(a.Ea, a.Sa, a.Ta, a.Gb)
}

function Vj(a, b, c, d) {
  return d ? "The Stadia Controller name should include \u201c" + a + "\u201d. The name could instead include \u201c" + b + "\u201d, \u201c" + c + "\u201d, or \u201c" + d + "\u201d." : "The Stadia Controller name should include \u201c" + a + "\u201d. The name could instead include \u201c" + b + "\u201d or \u201c" + c + "\u201d\u201d."
}

function Xj() {
  return "Learn how to pair with Bluetooth"
}

function Tj(a) {
  if (!Zk["If the device list doesn\u2019t open, \u00010\u0001give Chrome permission to connect to USB and HID devices\u00011\u0001."]) {
    Zk["If the device list doesn\u2019t open, \u00010\u0001give Chrome permission to connect to USB and HID devices\u00011\u0001."] = [];
    var b = /\x01\d+\x01/g,
      c = 0,
      d = 0;
    do {
      var e = b.exec("If the device list doesn\u2019t open, \u00010\u0001give Chrome permission to connect to USB and HID devices\u00011\u0001.") || void 0;
      Zk["If the device list doesn\u2019t open, \u00010\u0001give Chrome permission to connect to USB and HID devices\u00011\u0001."][d] = [D("If the device list doesn\u2019t open, \u00010\u0001give Chrome permission to connect to USB and HID devices\u00011\u0001.".substring(c, e && e.index)), e && e[0]];
      d += 1;
      c = b.lastIndex
    } while (e)
  }
  b = v(Zk["If the device list doesn\u2019t open, \u00010\u0001give Chrome permission to connect to USB and HID devices\u00011\u0001."]);
  for (c = b.next(); !c.done; c = b.next()) switch (c = c.value, c[0] && a.text(c[0]), c[1]) {
    case "\u00010\u0001":
      a.open("a", "PBl8yc");
      a.i($k || ($k = ["target", "_blank"]));
      c = a;
      d = c.o;
      e = vd("https://support.google.com/chrome/answer/12576972");
      d.call(c, "href", H(e));
      a.h();
      break;
    case "\u00011\u0001":
      a.close()
  }
}
var Zk = {},
  $k;
/*

 Copyright 2013 Google LLC.
 SPDX-License-Identifier: Apache-2.0
*/
var al = {};
/*

 Copyright 2011 Google LLC.
 SPDX-License-Identifier: Apache-2.0
*/
function bl(a, b) {
  return function (c) {
    c || (c = window.event);
    return b.call(a, c)
  }
}

function cl(a) {
  a.preventDefault ? a.preventDefault() : a.returnValue = !1
}

function dl(a) {
  a = a.target || a.srcElement;
  !a.getAttribute && a.parentNode && (a = a.parentNode);
  return a
}
var el = "undefined" != typeof navigator && /Macintosh/.test(navigator.userAgent),
  fl = "undefined" != typeof navigator && !/Opera/.test(navigator.userAgent) && /WebKit/.test(navigator.userAgent),
  gl = "undefined" != typeof navigator && (/MSIE/.test(navigator.userAgent) || /Trident/.test(navigator.userAgent)),
  hl = "undefined" != typeof navigator && !/Opera|WebKit/.test(navigator.userAgent) && /Gecko/.test(navigator.product),
  il = {
    A: 1,
    INPUT: 1,
    TEXTAREA: 1,
    SELECT: 1,
    BUTTON: 1
  };

function jl() {
  this._mouseEventsPrevented = !0
}

function kl(a) {
  var b = A.document;
  if (b && !b.createEvent && b.createEventObject) try {
    return b.createEventObject(a)
  } catch (c) {
    return a
  } else return a
}
var ll = {
    Enter: 13,
    " ": 32
  },
  ml = {
    A: 13,
    BUTTON: 0,
    CHECKBOX: 32,
    COMBOBOX: 13,
    FILE: 0,
    GRIDCELL: 13,
    LINK: 13,
    LISTBOX: 13,
    MENU: 0,
    MENUBAR: 0,
    MENUITEM: 0,
    MENUITEMCHECKBOX: 0,
    MENUITEMRADIO: 0,
    OPTION: 0,
    RADIO: 32,
    RADIOGROUP: 32,
    RESET: 0,
    SUBMIT: 0,
    SWITCH: 32,
    TAB: 0,
    TREE: 13,
    TREEITEM: 13
  },
  nl = {
    CHECKBOX: !0,
    FILE: !0,
    OPTION: !0,
    RADIO: !0
  },
  ol = {
    COLOR: !0,
    DATE: !0,
    DATETIME: !0,
    "DATETIME-LOCAL": !0,
    EMAIL: !0,
    MONTH: !0,
    NUMBER: !0,
    PASSWORD: !0,
    RANGE: !0,
    SEARCH: !0,
    TEL: !0,
    TEXT: !0,
    TEXTAREA: !0,
    TIME: !0,
    URL: !0,
    WEEK: !0
  },
  pl = {
    A: !0,
    AREA: !0,
    BUTTON: !0,
    DIALOG: !0,
    IMG: !0,
    INPUT: !0,
    LINK: !0,
    MENU: !0,
    OPTGROUP: !0,
    OPTION: !0,
    PROGRESS: !0,
    SELECT: !0,
    TEXTAREA: !0
  };
/*

 Copyright 2008 Google LLC.
 SPDX-License-Identifier: Apache-2.0
*/
function ql(a, b, c, d, e, f) {
  Db.call(this);
  this.ha = a.replace(rl, "_");
  this.N = b || null;
  this.M = c ? kl(c) : null;
  this.Z = e || null;
  this.H = f || null;
  if (a = !this.H && c && c.target) a = c.target, a = Na(a) && 1 == a.nodeType;
  a && (this.H = c.target);
  this.K = [];
  this.S = {};
  this.R = this.O = d || Date.now();
  this.j = {};
  this.j["main-actionflow-branch"] = 1;
  this.v = {};
  this.u = !1;
  this.g = {};
  this.F = {};
  c && b && "click" == c.type && this.action(b);
  sl.push(this);
  this.Y = ++tl;
  b = new ul("created", this);
  null != vl && C(vl, b)
}
ra(ql, Db);
t = ql.prototype;
t.id = function () {
  return this.Y
};
t.done = function (a, b, c) {
  if (this.u || !this.j[a]) wl(this, "done", a, b);
  else {
    if (b) {
      this.u && wl(this, "tick", void 0, b);
      c = c || {};
      b in this.S && (this.v[b] = !0);
      var d = c.time || Date.now();
      !c.lb && !c.Eb && d > this.R && (this.R = d);
      for (var e = d - this.O, f = this.K.length; 0 < f && this.K[f - 1][1] > e;) f--;
      hb(this.K, f, 0, [b, e, c.lb]);
      this.S[b] = d
    }
    this.j[a]--;
    0 == this.j[a] && delete this.j[a];
    a: {
      for (var g in this.j) {
        a = !1;
        break a
      }
      a = !0
    }
    if (a)
      if (vl) {
        b = a = "";
        for (var h in this.v) this.v.hasOwnProperty(h) && (b = b + a + h, a = "|");
        b && (this.F.dup = b);
        h = new ul("beforedone",
          this);
        C(this, h) && C(vl, h) ? ((a = xl(this.F)) && (this.g.cad = a), h.type = "done", a = C(vl, h)) : a = !1
      } else a = !0;
    a && (this.u = !0, gb(sl, this), this.M = this.N = null, this.D || (this.D = !0, this.ca()))
  }
};

function wl(a, b, c, d) {
  if (vl) {
    var e = new ul("error", a);
    e.error = b;
    e.j = c;
    e.u = d;
    e.s = a.u;
    C(vl, e)
  }
}

function xl(a) {
  var b = [];
  qb(a, function (c, d) {
    d = encodeURIComponent(d);
    c = encodeURIComponent(c).replace(/%7C/g, "|");
    b.push(d + ":" + c)
  });
  return b.join(",")
}
t.action = function (a) {
  this.u && wl(this, "action");
  var b = [],
    c = null,
    d = null,
    e = null,
    f = null;
  yl(a, function (g) {
    var h;
    !g.__oi && g.getAttribute && (g.__oi = g.getAttribute("oi"));
    if (h = g.__oi) b.unshift(h), c || (c = g.getAttribute("jsinstance"));
    e || d && "1" != d || (e = g.getAttribute("ved"));
    f || (f = g.getAttribute("vet"));
    d || (d = g.getAttribute("jstrack"))
  });
  f && (this.g.vet = f);
  d && (this.g.ct = this.ha, 0 < b.length && zl(this, b.join(".")), c && (a = c, c = "*" == a.charAt(0) ? parseInt(a.substr(1), 10) : parseInt(a, 10), this.g.cd = c), "1" != d && (this.g.ei = d),
    e && (this.g.ved = e))
};

function zl(a, b) {
  a.u && wl(a, "extradata");
  a.F.oi = b.toString().replace(/[:;,\s]/g, "_")
}

function yl(a, b) {
  for (; a && 1 == a.nodeType; a = a.parentNode) b(a)
}
t.event = function () {
  return this.M
};
t.eventType = function () {
  return this.Z
};
t.target = function () {
  return this.H
};
t.value = function (a) {
  var b = this.N;
  return b ? a in b ? b[a] : b.getAttribute ? b.getAttribute(a) : void 0 : void 0
};
var sl = [],
  vl = new Db,
  rl = /[~.,?&-]/g,
  tl = 0;

function ul(a, b) {
  lb.call(this, a, b)
}
ra(ul, lb);

function Al(a) {
  return function () {
    return a
  }
};
/*

 Copyright 2005 Google LLC.
 SPDX-License-Identifier: Apache-2.0
*/
/*

 Copyright 2020 Google LLC.
 SPDX-License-Identifier: Apache-2.0
*/
function Bl() {
  this.j = {};
  this.g = [];
  var a = Cl;
  this.u = function (b) {
    return a(b)
  };
  this.v = {}
}
Bl.prototype.s = function (a, b) {
  if (Array.isArray(a)) {
    var c = [];
    for (b = 0; b < a.length; b++) {
      var d = Dl(a[b]);
      if (d.needsRetrigger) {
        var e = void 0;
        var f = d.event;
        var g = d.eventType;
        var h = "_custom" == f.type ? "_custom" : g || f.type;
        if ("keypress" == h || "keydown" == h || "keyup" == h) {
          if (document.createEvent)
            if (e = document.createEvent("KeyboardEvent"), e.initKeyboardEvent) {
              if (gl) {
                h = f.ctrlKey;
                var k = f.metaKey,
                  l = f.shiftKey,
                  n = [];
                f.altKey && n.push("Alt");
                h && n.push("Control");
                k && n.push("Meta");
                l && n.push("Shift");
                h = n.join(" ");
                e.initKeyboardEvent(g ||
                  f.type, !0, !0, window, f.key, f.location, h, f.repeat, f.locale)
              } else e.initKeyboardEvent(g || f.type, !0, !0, window, f.key, f.location, f.ctrlKey, f.altKey, f.shiftKey, f.metaKey), Object.defineProperty(e, "repeat", {
                get: Al(f.repeat),
                enumerable: !0
              }), Object.defineProperty(e, "locale", {
                get: Al(f.locale),
                enumerable: !0
              });
              fl && f.key && "" === e.key && Object.defineProperty(e, "key", {
                get: Al(f.key),
                enumerable: !0
              });
              if (fl || gl || hl) Object.defineProperty(e, "charCode", {
                get: Al(f.charCode),
                enumerable: !0
              }), g = Al(f.keyCode), Object.defineProperty(e,
                "keyCode", {
                  get: g,
                  enumerable: !0
                }), Object.defineProperty(e, "which", {
                get: g,
                enumerable: !0
              })
            } else e.initKeyEvent(g || f.type, !0, !0, window, f.ctrlKey, f.altKey, f.shiftKey, f.metaKey, f.keyCode, f.charCode);
          else e = document.createEventObject(), e.type = g || f.type, e.repeat = f.repeat, e.ctrlKey = f.ctrlKey, e.altKey = f.altKey, e.shiftKey = f.shiftKey, e.metaKey = f.metaKey, e.key = f.key, e.keyCode = f.keyCode, e.charCode = f.charCode;
          e.ja = f.timeStamp;
          g = e
        } else if ("click" == h || "dblclick" == h || "mousedown" == h || "mouseover" == h || "mouseout" == h ||
          "mousemove" == h) document.createEvent ? (e = document.createEvent("MouseEvent"), e.initMouseEvent(g || f.type, !0, !0, window, f.detail || 1, f.screenX || 0, f.screenY || 0, f.clientX || 0, f.clientY || 0, f.ctrlKey || !1, f.altKey || !1, f.shiftKey || !1, f.metaKey || !1, f.button || 0, f.relatedTarget || null)) : (e = document.createEventObject(), e.type = g || f.type, e.clientX = f.clientX, e.clientY = f.clientY, e.button = f.button, e.detail = f.detail, e.ctrlKey = f.ctrlKey, e.altKey = f.altKey, e.shiftKey = f.shiftKey, e.metaKey = f.metaKey), e.ja = f.timeStamp, g = e;
        else if ("focus" ==
          h || "blur" == h || "focusin" == h || "focusout" == h || "scroll" == h) document.createEvent ? (e = document.createEvent("UIEvent"), e.initUIEvent(g || f.type, void 0 !== f.bubbles ? f.bubbles : !0, f.cancelable || !1, f.view || window, f.detail || 0)) : (e = document.createEventObject(), e.type = g || f.type, e.bubbles = void 0 !== f.bubbles ? f.bubbles : !0, e.cancelable = f.cancelable || !1, e.view = f.view || window, e.detail = f.detail || 0), e.relatedTarget = f.relatedTarget || null, e.ja = f.timeStamp, g = e;
        else if ("_custom" == h) {
          g = {
            _type: g,
            type: g,
            data: f.detail.data,
            Ib: f.detail.triggeringEvent
          };
          try {
            e = document.createEvent("CustomEvent"), e.initCustomEvent("_custom", !0, !1, g)
          } catch (p) {
            e = document.createEvent("HTMLEvents"), e.initEvent("_custom", !0, !1), e.detail = g
          }
          g = e;
          g.ja = f.timeStamp
        } else document.createEvent ? (e = document.createEvent("Event"), e.initEvent(g || f.type, !0, !0)) : (e = document.createEventObject(), e.type = g || f.type), e.ja = f.timeStamp, g = e;
        d = d.targetElement;
        f = g;
        d.dispatchEvent ? d.dispatchEvent(f) : d.fireEvent("on" + f.type, f)
      } else c.push(d)
    }
    this.g = c
  } else {
    a = Dl(a, b);
    if (a.needsRetrigger) return a.event;
    if (b) {
      c = a.event;
      a = this.v[a.eventType];
      b = !1;
      if (a)
        for (d = 0; f = a[d++];) !1 === f(c) && (b = !0);
      b && cl(c)
    } else b = a.action, c || (c = this.j[b]), c ? (a = this.u(a), c(a), a.done("main-actionflow-branch")) : (c = kl(a.event), a.event = c, this.g.push(a))
  }
};

function Dl(a, b) {
  b = void 0 === b ? !1 : b;
  if ("maybe_click" !== a.eventType) return a;
  var c = {};
  for (d in a) c[d] = a[d];
  var d = c.event;
  var e;
  if (e = b || a.actionElement) {
    var f = a.event;
    a = f.which || f.keyCode;
    !a && f.key && (a = ll[f.key]);
    fl && 3 == a && (a = 13);
    if (13 != a && 32 != a) e = !1;
    else if (e = dl(f), (f = "keydown" != f.type || !!(!("getAttribute" in e) || (e.getAttribute("type") || e.tagName).toUpperCase() in ol || "BUTTON" == e.tagName.toUpperCase() || e.type && "FILE" == e.type.toUpperCase() || e.isContentEditable) || f.ctrlKey || f.shiftKey || f.altKey || f.metaKey ||
        (e.getAttribute("type") || e.tagName).toUpperCase() in nl && 32 == a) || ((f = e.tagName in il) || (f = e.getAttributeNode("tabindex"), f = null != f && f.specified), f = !(f && !e.disabled)), f) e = !1;
    else {
      f = (e.getAttribute("role") || e.type || e.tagName).toUpperCase();
      var g = !(f in ml) && 13 == a;
      e = "INPUT" != e.tagName.toUpperCase() || !!e.type;
      e = (0 == ml[f] % a || g) && e
    }
  }
  e ? (c.actionElement ? (b = c.event, a = dl(b), a = (a.type || a.tagName).toUpperCase(), (a = 32 == (b.which || b.keyCode) && "CHECKBOX" != a) || (b = dl(b), a = b.tagName.toUpperCase(), e = (b.getAttribute("role") ||
    "").toUpperCase(), a = "BUTTON" === a || "BUTTON" === e ? !0 : !(b.tagName.toUpperCase() in pl) || "A" === a || "SELECT" === a || (b.getAttribute("type") || b.tagName).toUpperCase() in nl || (b.getAttribute("type") || b.tagName).toUpperCase() in ol ? !1 : !0), b = a || "A" == c.actionElement.tagName ? !0 : !1) : b = !1, b && cl(d), c.eventType = "click") : (c.eventType = "keydown", b || (d = kl(d), d.a11ysc = !0, d.a11ysgd = !0, c.event = d, c.needsRetrigger = !0));
  return c
}

function Cl(a) {
  return new ql(a.action, a.actionElement, a.event, a.timeStamp, a.eventType, a.targetElement)
};
var El = A._jsa || {};
El._cfc = void 0;
El._aeh = void 0;

function Fl() {
  this.v = [];
  this.s = [];
  this.u = {};
  this.j = null;
  this.g = []
}

function Gl(a) {
  return String.prototype.trim ? a.trim() : a.replace(/^\s+/, "").replace(/\s+$/, "")
}

function Hl(a, b) {
  return function f(d, e) {
    e = void 0 === e ? !0 : e;
    var g = b;
    "click" == g && (el && d.metaKey || !el && d.ctrlKey || 2 == d.which || null == d.which && 4 == d.button || d.shiftKey) && (g = "clickmod");
    for (var h = d.srcElement || d.target, k = Il(g, d, h, "", null), l, n, p, q, w = h; w && w != this; w = w.__owner || ("#document-fragment" !== (null == (p = w.parentNode) ? void 0 : p.nodeName) ? w.parentNode : null == (q = w.parentNode) ? void 0 : q.host)) {
      n = w;
      var m = l = void 0,
        r = n,
        F = g,
        aa = d,
        M = r.__jsaction;
      if (!M) {
        var Q = Jl(r, "jsaction");
        if (Q) {
          M = al[Q];
          if (!M) {
            M = {};
            for (var y = Q.split(Kl),
                Aa = y ? y.length : 0, N = 0; N < Aa; N++) {
              var ca = y[N];
              if (ca) {
                var pa = ca.indexOf(":"),
                  Ea = -1 != pa;
                M[Ea ? Gl(ca.substr(0, pa)) : Ll] = Ea ? Gl(ca.substr(pa + 1)) : ca
              }
            }
            al[Q] = M
          }
          Q = M;
          M = {};
          for (m in Q) {
            y = M;
            Aa = m;
            b: if (N = Q[m], !(0 <= N.indexOf(".")))
              for (ca = r; ca; ca = ca.parentNode) {
                pa = ca;
                Ea = pa.__jsnamespace;
                void 0 === Ea && (Ea = Jl(pa, "jsnamespace"), pa.__jsnamespace = Ea);
                if (pa = Ea) {
                  N = pa + "." + N;
                  break b
                }
                if (ca == this) break
              }
            y[Aa] = N
          }
          r.__jsaction = M
        } else M = Ml, r.__jsaction = M
      }
      m = M;
      El._cfc && m.click ? l = El._cfc(r, aa, m, F, void 0) : l = {
        eventType: F,
        action: m[F] || "",
        event: null,
        ignore: !1
      };
      if (l.ignore || l.action) break
    }
    l && (k = Il(l.eventType, l.event || d, h, l.action || "", n, k.timeStamp));
    k && "touchend" == k.eventType && (k.event._preventMouseEvents = jl);
    l && l.action || (k.action = "", k.actionElement = null);
    g = k;
    a.j && !g.event.a11ysgd && (h = Il(g.eventType, g.event, g.targetElement, g.action, g.actionElement, g.timeStamp), "clickonly" == h.eventType && (h.eventType = "click"), a.j(h, !0));
    if (g.actionElement) {
      h = !1;
      if ("maybe_click" !== g.eventType) {
        if (!hl || "INPUT" != g.targetElement.tagName && "TEXTAREA" != g.targetElement.tagName ||
          "focus" != g.eventType) d.stopPropagation ? d.stopPropagation() : d.cancelBubble = !0
      } else "maybe_click" === g.eventType && (h = !0);
      if (a.j) {
        g.actionElement && "A" == g.actionElement.tagName && ("click" == g.eventType || "clickmod" == g.eventType) && cl(d);
        if ((d = a.j(g)) && e) {
          f.call(this, d, !1);
          return
        }
        h && (e = g.event, e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0)
      } else e = kl(d), g.event = e, a.g.push(g);
      El._aeh && El._aeh(g)
    }
  }
}

function Il(a, b, c, d, e, f) {
  return {
    eventType: a,
    event: b,
    targetElement: c,
    action: d,
    actionElement: e,
    timeStamp: f || Date.now()
  }
}

function Jl(a, b) {
  var c = null;
  "getAttribute" in a && (c = a.getAttribute(b));
  return c
}

function Nl(a, b) {
  return function (c) {
    var d = a,
      e = b,
      f = !1;
    "mouseenter" == d ? d = "mouseover" : "mouseleave" == d ? d = "mouseout" : "pointerenter" == d ? d = "pointerover" : "pointerleave" == d && (d = "pointerout");
    if (c.addEventListener) {
      if ("focus" == d || "blur" == d || "error" == d || "load" == d || "toggle" == d) f = !0;
      c.addEventListener(d, e, f)
    } else c.attachEvent && ("focus" == d ? d = "focusin" : "blur" == d && (d = "focusout"), e = bl(c, e), c.attachEvent("on" + d, e));
    return {
      eventType: d,
      ea: e,
      capture: f
    }
  }
}

function Ol(a) {
  var b = Pl;
  if (!b.u.hasOwnProperty(a) && "mouseenter" != a && "mouseleave" != a && "pointerenter" != a && "pointerleave" != a) {
    var c = Hl(b, a),
      d = Nl(a, c);
    b.u[a] = c;
    b.v.push(d);
    for (a = 0; a < b.s.length; ++a) c = b.s[a], c.j.push(d.call(null, c.g))
  }
}
Fl.prototype.ea = function (a) {
  return this.u[a]
};
var Ql = "undefined" != typeof navigator && /iPhone|iPad|iPod/.test(navigator.userAgent),
  Kl = /\s*;\s*/,
  Ll = "click",
  Ml = {};

function Rl(a) {
  a.toString = function () {
    return "zSoyTemplatez"
  };
  return a
}

function Sl(a, b) {
  function c(d, e, f) {
    a(d, null == e ? b : Object.assign({}, b, e), f)
  }
  c.B = a.B;
  return Rl(c)
};

function Tl() {
  return searchUAString("iPad") || searchUAString("Android") && !searchUAString("Mobile") || searchUAString("Silk")
};

function Ul(a) {
  var b = APP_CONFIG;
  De(a, function () {
    We(b)
  })
}
ze.jsaction = function (a, b, c) {
  c ? a.setAttribute("jsaction", c) : a.removeAttribute("jsaction");
  "__jsaction" in a && delete a.__jsaction
};
var Vl = new URLSearchParams(window.location.search),
  Wl, Xl = document.documentElement.lang || "en-US",
  Yl, Zl = null != (Wl = Vl.get("device_type")) ? Wl : "";
Yl = ["pvt", "dvt", "dev"].includes(Zl) ? Zl : void 0;
var $l;
if ($l = detectIfChrome()) {
  var am;
  for (var bm, cm, dm = getUAString(), em = RegExp("([A-Z][\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?", "g"), eb = [], fm; fm = em.exec(dm);) eb.push([fm[1], fm[2], fm[3] || void 0]);
  var gm = db();
  cm = detectIfChrome() ? gm(["Chrome", "CriOS", "HeadlessChrome"]) : "";
  "" === cm ? am = NaN : (bm = cm.split("."), am = 0 === bm.length ? NaN : Number(bm[0]));
  $l = !(108 <= am)
}
const APP_CONFIG = {
    locale: Xl,
    ra: Yl,
    Va: !1,
    xb: "hid" in navigator,
    wb: $l,
    ob: !(!Tl() && (searchUAString("iPod") || searchUAString("iPhone") || searchUAString("Android") || searchUAString("IEMobile"))) && !Tl(),
    Ca: !1,
    Ga: null,
    ka: null
  },
  im = new IntersectionObserver(function (a) {
    a = v(a).next().value;
    hm({
      Ka: !a.isIntersecting
    })
  }, {
    threshold: 1,
    rootMargin: "0px 0px -20px 0px"
  });

function hm(a) {
  Object.assign(APP_CONFIG, a);
  var b = document.getElementById("app-container"),
    c = b.contains(document.activeElement) || APP_CONFIG.Ua && document.activeElement === document.body,
    d = null != b.querySelector("#active-dialog");
  d || (APP_CONFIG.ka = document.activeElement);
  Ul(b);
  var e = document.querySelector("#active-dialog"),
    f = e && !e.open;
  f && (e.showModal(), e.addEventListener("cancel", function (k) {
    k.preventDefault()
  }));
  if (d && !e && APP_CONFIG.ka instanceof HTMLElement && document.contains(APP_CONFIG.ka)) {
    var g;
    null == (g = APP_CONFIG.ka) || g.focus()
  } else if (f || c && !b.contains(document.activeElement)) {
    var h;
    null == (h = ["[role=dialog] [data-initial-focus]:not([disabled])", "[role=dialog] button:not([disabled]), [role=dialog] input[type=checkbox]", "[data-initial-focus]:not([disabled])", "button:not([disabled]), input[type=checkbox]"].map(function (k) {
      return b.querySelector(k)
    }).find(function (k) {
      return null != k
    })) || h.focus()
  }
  void 0 === (null == a ? void 0 : a.Ka) && (im.disconnect(), (a = document.getElementById("panel-bottom-button-bar")) && im.observe(a))
}
const FIRMWARE_LIST = {
    bruce_dev: "bruce_dvt_a_dev_signed.bin",
    bruce_dvt: "bruce_dvt_a_stage_signed.bin",
    bruce_pvt: "bruce_pvt_a_prod_signed.bin",
    gotham_dev: "gotham_dvt_a_dev_signed.bin",
    gotham_dvt: "gotham_dvt_a_stage_signed.bin",
    gotham_pvt: "ota.316382.stable-channel.gotham-pvt-b.da986392604309ea67eab5fa84f747e955f2875c.bin"
  };

const BUILD_NUMBERS = {
  bruce: 337784,
  gotham: 282115
};

function lm() {
  var a = APP_CONFIG.C;
  APP_CONFIG.ba || APP_CONFIG.ra || console.warn("The verification step was skipped. This may result in the wrong firmware being flashed to DVT controllers.");
  var b, c, d = null != (c = null != (b = APP_CONFIG.ra) ? b : APP_CONFIG.ba) ? c : "pvt";
  return getFirmwareURL(FIRMWARE_LIST[a + "_" + d])
}
var mm = [{
    vendorId: 5538,
    productId: 115
  }, {
    vendorId: 6353,
    productId: 37888
  }, {
    vendorId: 6353,
    productId: 37995
  }, {
    vendorId: 8137,
    productId: 309
  }],
  nm = [ok, yk, Bk];

function om(a) {
  a.returnValue = " "
}

function Y(a, b) {
  var c = !!a && nm.includes(a);
  c ? window.addEventListener("beforeunload", om) : window.removeEventListener("beforeunload", om);
  var d;
  a ? d = Sl(Rl(a), b) : d = null;
  hm({
    sa: void 0,
    Va: c,
    Ua: d
  });
  if (APP_CONFIG.Ga !== a) {
    var e;
    null == (e = document.getElementById("main-scroll-container")) || e.scrollTo(0, 0);
    APP_CONFIG.Ga = a
  }
}

function Z(a, b) {
  a = Sl(Rl(a), b);
  hm({
    Ja: void 0,
    sa: a
  })
}

function pm(a) {
  hm({
    vb: a
  })
}

function qm() {
  APP_CONFIG.Wa = !1;
  Y(null);
  (new IntersectionObserver(function (a) {
    a = v(a).next().value;
    hm({
      Wa: !a.isIntersecting
    })
  }, {
    threshold: 0,
    rootMargin: "-64px 0px 0px 0px"
  })).observe(document.getElementById("main-call-to-action"))
}

function rm() {
  APP_CONFIG.Ca ? Y(Lj, {
    C: APP_CONFIG.C
  }) : Z(oi)
}

function sm() {
  return null != APP_CONFIG.U && 10 > APP_CONFIG.U ? (Z(Ii, {
    U: APP_CONFIG.U
  }), !0) : !1
}

function tm() {
  sm() || Y(kk)
}

function um() {
  var a, b, c, d;
  return z(function (e) {
    if (1 == e.g) return pm(!0), wa(e), a = Date.now(), x(e, navigator.hid.requestDevice({
      filters: mm
    }), 4);
    if (2 != e.g) return b = e.j, c = Date.now() - a, console.log("requestDevice returned after " + c + "ms"), 0 === b.length && 100 > c && hm({
      ga: !0
    }), e.return(null != (d = b[0]) ? d : null);
    za(e);
    pm(!1);
    return Ba(e, 0)
  })
}

function vm() {
  var a, b, c;
  return z(function (d) {
    switch (d.g) {
      case 1:
        return pm(!0), a = Date.now(), va(d, 2, 3), x(d, navigator.usb.requestDevice({
          filters: mm
        }), 5);
      case 5:
        return d.return(d.j);
      case 3:
        za(d);
        pm(!1);
        Ba(d, 0);
        break;
      case 2:
        return b = ya(d), c = Date.now() - a, console.log("requestDevice returned after " + c + "ms"), 100 > c && hm({
          ga: !0
        }), console.log(b), d.return(null)
    }
  })
}

function getFlashloader(a) {
  var b, c;
  return z(function (d) {
    switch (d.g) {
      case 1:
        return Y(ok, {
          C: APP_CONFIG.C,
          progress: !0
        }), va(d, 2), x(d, getFirmwareURL("restricted_ivt_flashloader.bin"), 4);
      case 4:
        return b = d.j, console.log("flashloader image is " + b.byteLength + " bytes"), x(d, Promise.all([bj(a, b), lm(), new Promise(function (e) {
          return void setTimeout(e, 2E3)
        })]), 5);
      case 5:
        Y(yk, {
          C: APP_CONFIG.C
        });
        xa(d, 0);
        break;
      case 2:
        c = ya(d), console.log(c), c instanceof Xi ? Z(wi, {
          action: "uploadFlashloader"
        }) : Z(zi, {
          V: c.toString()
        }), d.g = 0
    }
  })
}

function xm(a) {
  var b, c, d, e, f, g, h;
  return z(function (k) {
    switch (k.g) {
      case 1:
        return b = BUILD_NUMBERS[APP_CONFIG.C], Y(Bk, {
          C: APP_CONFIG.C,
          progress: 0
        }), va(k, 2), x(k, lm(), 4);
      case 4:
        return c = k.j, console.log("Firmware image is " + c.byteLength + " bytes"), x(k, fj(a, c, function (l) {
          return void Y(Bk, {
            C: APP_CONFIG.C,
            progress: Math.min(Math.max(l, 0), 100)
          })
        }), 5);
      case 5:
        if (!APP_CONFIG.serialNumber) return console.log("Unable to confirm flash because verification was skipped."), Y(Ok), k.return();
        d = null;
        e = Date.now();
      case 6:
        if (!(null == d && 1E4 > Date.now() - e)) {
          console.log((d ? "Reconnected" :
            "Failed to reconnect") + (" within " + (Date.now() - e) + "ms"));
          if (d !== b) return Y(Ok), k.return();
          Y(Ik, {
            C: APP_CONFIG.C
          });
          xa(k, 0);
          break
        }
        return x(k, new Promise(function (l) {
          return void setTimeout(l, 250)
        }), 8);
      case 8:
        return x(k, zj(), 9);
      case 9:
        f = k.j;
        if (!f) {
          k.J(6);
          break
        }
        va(k, 11, 12);
        return x(k, f.open(), 14);
      case 14:
        return x(k, Dj(f), 15);
      case 15:
        d = k.j, console.log("Controller firmware version is now " + d);
      case 12:
        return za(k, 2), x(k, f.close(), 16);
      case 16:
        Ba(k, 6);
        break;
      case 11:
        g = ya(k);
        console.log(g);
        k.J(12);
        break;
      case 2:
        h = ya(k),
          console.log(h), h instanceof Xi ? Z(wi, {
            action: "uploadFirmware"
          }) : Z(zi, {
            V: h.toString()
          }), k.g = 0
    }
  })
}
var Pl = new Fl,
  ym = Pl,
  zm = new function (a) {
    this.g = a;
    this.j = []
  }(document.body),
  Am = zm.g;
Ql && (Am.style.cursor = "pointer");
for (var Bm = 0; Bm < ym.v.length; ++Bm) zm.j.push(ym.v[Bm].call(null, zm.g));
ym.s.push(zm);
Ol("click");
Ol("change");
var Cm = new Bl,
  Dm = Pl,
  Em = Cm.s.bind(Cm);
Dm.j = Em;
Dm.g && (0 < Dm.g.length && Em(Dm.g), Dm.g = null);
(function (a) {
  qb(a, Qa(function (b, c) {
    this.j["zatanna." + c] = b
  }, Cm))
})({
  selectBruce: function () {
    APP_CONFIG.C = "bruce";
    rm()
  },
  applyBruce: function () {
    APP_CONFIG.C = "bruce";
    tm()
  },
  selectGotham: function () {
    APP_CONFIG.C = "gotham";
    rm()
  },
  revertToGotham: function () {
    APP_CONFIG.C = "gotham";
    tm()
  },
  checkMode: function () {
    APP_CONFIG.C = void 0;
    rm()
  },
  selectControllerUsbDevice: function () {
    var a, b, c, d, e, f, g, h;
    return z(function (k) {
      switch (k.g) {
        case 1:
          return x(k, vm(), 2);
        case 2:
          a = k.j;
          if (!a) return k.return();
          APP_CONFIG.serialNumber = void 0;
          APP_CONFIG.ba = void 0;
          APP_CONFIG.U = void 0;
          if (!yj(a)) return console.log("Controller is not in OEM mode"),
            APP_CONFIG.C ? (b = "enterSdpMode", 8137 === a.vendorId && 309 === a.productId ? b = "uploadFlashloader" : 5538 === a.vendorId && 115 === a.productId && (b = "uploadFirmware"), Z(Di, {
              rb: b
            })) : Z(Fi), k.return();
          APP_CONFIG.serialNumber = a.serialNumber;
          console.log("Controller serial number: " + APP_CONFIG.serialNumber);
          va(k, 3, 4);
          d = null != (c = APP_CONFIG.serialNumber.slice(0, 2)) ? c : "";
          if (["91", "92", "93", "94"].includes(d)) throw Error("Unable to flash devices with serial number prefix " + d);
          ["95", "96", "97"].includes(d) ? APP_CONFIG.ba = "dvt" : APP_CONFIG.ba = "98" === d && "9809" > APP_CONFIG.serialNumber.slice(0,
            4) ? "dvt" : "pvt";
          console.log("Controller is a " + APP_CONFIG.ba + " device");
          return x(k, a.open(), 6);
        case 6:
          return x(k, Dj(a), 7);
        case 7:
          return e = k.j, f = 320480 >= e ? "gotham" : "bruce", console.log("Current firmware is " + f + " build " + e), g = APP_CONFIG, x(k, Ej(a), 8);
        case 8:
          if (g.U = k.j, console.log("Current battery level: " + APP_CONFIG.U + "%"), APP_CONFIG.C && f !== APP_CONFIG.C) {
            if (sm()) return k.return();
            Y(ik)
          } else "bruce" === f && e >= BUILD_NUMBERS[f] ? Y(Wj) : "bruce" === f && e < BUILD_NUMBERS[f] ? Y(ck) : Y(fk);
        case 4:
          return za(k), x(k, a.close(), 9);
        case 9:
          Ba(k, 0);
          break;
        case 3:
          h = ya(k), console.log(h), Z(ui, {
            nb: searchUAString("CrOS"),
            V: h.toString()
          }), k.J(4)
      }
    })
  },
  selectController: function () {
    var a, b, c;
    return z(function (d) {
      switch (d.g) {
        case 1:
          return x(d, um(), 2);
        case 2:
          a = d.j;
          if (!a) return d.return();
          b = new Zi(a);
          if (6353 === b.device.vendorId && (37888 === b.device.productId || 37995 === b.device.productId)) return Z(yi), d.return();
          va(d, 3);
          return x(d, b.open(), 5);
        case 5:
          xa(d, 4);
          break;
        case 3:
          return c = ya(d), console.log(c), searchUAString("Linux") ? Z(Gi, {
            V: c.toString()
          }) : Z(zi, {
            V: c.toString()
          }), d.return();
        case 4:
          if (8137 === b.device.vendorId && 309 === b.device.productId) return x(d,
            getFlashloader(b), 0);
          if (5538 === b.device.vendorId && 115 === b.device.productId) return x(d, xm(b), 0);
          d.J(0)
      }
    })
  },
  closeDialog: function () {
    hm({
      sa: void 0
    })
  },
  dialogCheckboxChange: function () {
    var a = document.getElementById("dialog-checkbox");
    hm({
      Ja: a.checked
    })
  },
  selectAction: function () {
    return void Y(Hj)
  },
  agreeToTerms: function () {
    APP_CONFIG.Ca = !0;
    rm()
  },
  languageSelected: function () {
    var a = new URLSearchParams(window.location.search),
      b = document.getElementById("language-selector").value;
    0 < a.toString().length && (b += "?" + a.toString());
    a = window.location;
    b = ld(b);
    void 0 !== b && (a.href = b)
  },
  connectController: rm,
  verifyController: function () {
    return void Y(Oj, {
      C: APP_CONFIG.C
    })
  },
  enterSdpMode: tm,
  uploadFlashloader: function () {
    return void Y(ok, {
      C: APP_CONFIG.C
    })
  },
  uploadFirmware: function () {
    return void Y(Bk, {
      C: APP_CONFIG.C
    })
  },
  returnHome: qm,
  cancelAndExit: function () {
    return void Z(ri, {
      tb: APP_CONFIG.Va
    })
  },
  downloadChrome: function () {
    var a = window;
    var b = vd("https://www.google.com/chrome/");
    return void Ae(a, rd(b))
  },
  updateChrome: function () {
    var a = window;
    var b = vd("https://www.google.com/chrome/update/");
    return void Ae(a,
      rd(b))
  },
  openUdevInstructions: function () {
    var url = "https://support.google.com/stadia?p=controllerconnect#linuxrule";
    // var b = checkIfGoogleStaff() ? "http://go/gotham-ble-howto#bookmark=id.3wy2t3ujrxkq" : "https://support.google.com/stadia?p=controllerconnect#linuxrule";
    url = vd(url);
    return void Ae(window, rd(url), "_blank")
  },
  helpCenter: function () {
    return void Ae(window, rd(Rd()), "_blank")
  },
  gettingStartedModal1: function () {
    return void Z(Sh, {
      Ba: 1
    })
  },
  gettingStartedModal2: function () {
    return void Z(Sh, {
      Ba: 2
    })
  }
});
console.log("Currently serving Bruce build 337784");
document.documentElement.hasAttribute("data-is-placeholder") || qm();
