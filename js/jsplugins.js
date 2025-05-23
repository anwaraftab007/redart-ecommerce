/*! pace 0.5.6 */
jQuery.noConflict();
(function() {
    var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W = [].slice,
        X = {}.hasOwnProperty,
        Y = function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b) X.call(b, d) && (a[d] = b[d]);
            return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
        },
        Z = [].indexOf || function(a) {
            for (var b = 0, c = this.length; c > b; b++)
                if (b in this && this[b] === a) return b;
            return -1
        };
    for (t = {
            catchupTime: 500,
            initialRate: .03,
            minTime: 500,
            ghostTime: 500,
            maxProgressPerFrame: 10,
            easeFactor: 1.25,
            startOnPageLoad: !0,
            restartOnPushState: !0,
            restartOnRequestAfter: 500,
            target: "body",
            elements: {
                checkInterval: 100,
                selectors: ["body"]
            },
            eventLag: {
                minSamples: 10,
                sampleCount: 3,
                lagThreshold: 3
            },
            ajax: {
                trackMethods: ["GET"],
                trackWebSockets: !0,
                ignoreURLs: []
            }
        }, B = function() {
            var a;
            return null != (a = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance.now() : void 0) ? a : +new Date
        }, D = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, s = window.cancelAnimationFrame || window.mozCancelAnimationFrame, null == D && (D = function(a) {
            return setTimeout(a, 50)
        }, s = function(a) {
            return clearTimeout(a)
        }), F = function(a) {
            var b, c;
            return b = B(), (c = function() {
                var d;
                return d = B() - b, d >= 33 ? (b = B(), a(d, function() {
                    return D(c)
                })) : setTimeout(c, 33 - d)
            })()
        }, E = function() {
            var a, b, c;
            return c = arguments[0], b = arguments[1], a = 3 <= arguments.length ? W.call(arguments, 2) : [], "function" == typeof c[b] ? c[b].apply(c, a) : c[b]
        }, u = function() {
            var a, b, c, d, e, f, g;
            for (b = arguments[0], d = 2 <= arguments.length ? W.call(arguments, 1) : [], f = 0, g = d.length; g > f; f++)
                if (c = d[f])
                    for (a in c) X.call(c, a) && (e = c[a], null != b[a] && "object" == typeof b[a] && null != e && "object" == typeof e ? u(b[a], e) : b[a] = e);
            return b
        }, p = function(a) {
            var b, c, d, e, f;
            for (c = b = 0, e = 0, f = a.length; f > e; e++) d = a[e], c += Math.abs(d), b++;
            return c / b
        }, w = function(a, b) {
            var c, d, e;
            if (null == a && (a = "options"), null == b && (b = !0), e = document.querySelector("[data-pace-" + a + "]")) {
                if (c = e.getAttribute("data-pace-" + a), !b) return c;
                try {
                    return JSON.parse(c)
                } catch (f) {
                    return d = f, "undefined" != typeof console && null !== console ? console.error("Error parsing inline pace options", d) : void 0
                }
            }
        }, g = function() {
            function a() {}
            return a.prototype.on = function(a, b, c, d) {
                var e;
                return null == d && (d = !1), null == this.bindings && (this.bindings = {}), null == (e = this.bindings)[a] && (e[a] = []), this.bindings[a].push({
                    handler: b,
                    ctx: c,
                    once: d
                })
            }, a.prototype.once = function(a, b, c) {
                return this.on(a, b, c, !0)
            }, a.prototype.off = function(a, b) {
                var c, d, e;
                if (null != (null != (d = this.bindings) ? d[a] : void 0)) {
                    if (null == b) return delete this.bindings[a];
                    for (c = 0, e = []; c < this.bindings[a].length;) e.push(this.bindings[a][c].handler === b ? this.bindings[a].splice(c, 1) : c++);
                    return e
                }
            }, a.prototype.trigger = function() {
                var a, b, c, d, e, f, g, h, i;
                if (c = arguments[0], a = 2 <= arguments.length ? W.call(arguments, 1) : [], null != (g = this.bindings) ? g[c] : void 0) {
                    for (e = 0, i = []; e < this.bindings[c].length;) h = this.bindings[c][e], d = h.handler, b = h.ctx, f = h.once, d.apply(null != b ? b : this, a), i.push(f ? this.bindings[c].splice(e, 1) : e++);
                    return i
                }
            }, a
        }(), null == window.Pace && (window.Pace = {}), u(Pace, g.prototype), C = Pace.options = u({}, t, window.paceOptions, w()), T = ["ajax", "document", "eventLag", "elements"], P = 0, R = T.length; R > P; P++) J = T[P], C[J] === !0 && (C[J] = t[J]);
    i = function(a) {
        function b() {
            return U = b.__super__.constructor.apply(this, arguments)
        }
        return Y(b, a), b
    }(Error), b = function() {
        function a() {
            this.progress = 0
        }
        return a.prototype.getElement = function() {
            var a;
            if (null == this.el) {
                if (a = document.querySelector(C.target), !a) throw new i;
                this.el = document.createElement("div"), this.el.className = "pace pace-active", document.body.className = document.body.className.replace(/pace-done/g, ""), document.body.className += " pace-running", this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>', null != a.firstChild ? a.insertBefore(this.el, a.firstChild) : a.appendChild(this.el)
            }
            return this.el
        }, a.prototype.finish = function() {
            var a;
            return a = this.getElement(), a.className = a.className.replace("pace-active", ""), a.className += " pace-inactive", document.body.className = document.body.className.replace("pace-running", ""), document.body.className += " pace-done"
        }, a.prototype.update = function(a) {
            return this.progress = a, this.render()
        }, a.prototype.destroy = function() {
            try {
                this.getElement().parentNode.removeChild(this.getElement())
            } catch (a) {
                i = a
            }
            return this.el = void 0
        }, a.prototype.render = function() {
            var a, b;
            return null == document.querySelector(C.target) ? !1 : (a = this.getElement(), a.children[0].style.width = "" + this.progress + "%", (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) && (a.children[0].setAttribute("data-progress-text", "" + (0 | this.progress) + "%"), this.progress >= 100 ? b = "99" : (b = this.progress < 10 ? "0" : "", b += 0 | this.progress), a.children[0].setAttribute("data-progress", "" + b)), this.lastRenderedProgress = this.progress)
        }, a.prototype.done = function() {
            return this.progress >= 100
        }, a
    }(), h = function() {
        function a() {
            this.bindings = {}
        }
        return a.prototype.trigger = function(a, b) {
            var c, d, e, f, g;
            if (null != this.bindings[a]) {
                for (f = this.bindings[a], g = [], d = 0, e = f.length; e > d; d++) c = f[d], g.push(c.call(this, b));
                return g
            }
        }, a.prototype.on = function(a, b) {
            var c;
            return null == (c = this.bindings)[a] && (c[a] = []), this.bindings[a].push(b)
        }, a
    }(), O = window.XMLHttpRequest, N = window.XDomainRequest, M = window.WebSocket, v = function(a, b) {
        var c, d, e, f;
        f = [];
        for (d in b.prototype) try {
            e = b.prototype[d], f.push(null == a[d] && "function" != typeof e ? a[d] = e : void 0)
        } catch (g) {
            c = g
        }
        return f
    }, z = [], Pace.ignore = function() {
        var a, b, c;
        return b = arguments[0], a = 2 <= arguments.length ? W.call(arguments, 1) : [], z.unshift("ignore"), c = b.apply(null, a), z.shift(), c
    }, Pace.track = function() {
        var a, b, c;
        return b = arguments[0], a = 2 <= arguments.length ? W.call(arguments, 1) : [], z.unshift("track"), c = b.apply(null, a), z.shift(), c
    }, I = function(a) {
        var b;
        if (null == a && (a = "GET"), "track" === z[0]) return "force";
        if (!z.length && C.ajax) {
            if ("socket" === a && C.ajax.trackWebSockets) return !0;
            if (b = a.toUpperCase(), Z.call(C.ajax.trackMethods, b) >= 0) return !0
        }
        return !1
    }, j = function(a) {
        function b() {
            var a, c = this;
            b.__super__.constructor.apply(this, arguments), a = function(a) {
                var b;
                return b = a.open, a.open = function(d, e) {
                    return I(d) && c.trigger("request", {
                        type: d,
                        url: e,
                        request: a
                    }), b.apply(a, arguments)
                }
            }, window.XMLHttpRequest = function(b) {
                var c;
                return c = new O(b), a(c), c
            };
            try {
                v(window.XMLHttpRequest, O)
            } catch (d) {}
            if (null != N) {
                window.XDomainRequest = function() {
                    var b;
                    return b = new N, a(b), b
                };
                try {
                    v(window.XDomainRequest, N)
                } catch (d) {}
            }
            if (null != M && C.ajax.trackWebSockets) {
                window.WebSocket = function(a, b) {
                    var d;
                    return d = null != b ? new M(a, b) : new M(a), I("socket") && c.trigger("request", {
                        type: "socket",
                        url: a,
                        protocols: b,
                        request: d
                    }), d
                };
                try {
                    v(window.WebSocket, M)
                } catch (d) {}
            }
        }
        return Y(b, a), b
    }(h), Q = null, x = function() {
        return null == Q && (Q = new j), Q
    }, H = function(a) {
        var b, c, d, e;
        for (e = C.ajax.ignoreURLs, c = 0, d = e.length; d > c; c++)
            if (b = e[c], "string" == typeof b) {
                if (-1 !== a.indexOf(b)) return !0
            } else if (b.test(a)) return !0;
        return !1
    }, x().on("request", function(b) {
        var c, d, e, f, g;
        return f = b.type, e = b.request, g = b.url, H(g) ? void 0 : Pace.running || C.restartOnRequestAfter === !1 && "force" !== I(f) ? void 0 : (d = arguments, c = C.restartOnRequestAfter || 0, "boolean" == typeof c && (c = 0), setTimeout(function() {
            var b, c, g, h, i, j;
            if (b = "socket" === f ? e.readyState < 2 : 0 < (h = e.readyState) && 4 > h) {
                for (Pace.restart(), i = Pace.sources, j = [], c = 0, g = i.length; g > c; c++) {
                    if (J = i[c], J instanceof a) {
                        J.watch.apply(J, d);
                        break
                    }
                    j.push(void 0)
                }
                return j
            }
        }, c))
    }), a = function() {
        function a() {
            var a = this;
            this.elements = [], x().on("request", function() {
                return a.watch.apply(a, arguments)
            })
        }
        return a.prototype.watch = function(a) {
            var b, c, d, e;
            return d = a.type, b = a.request, e = a.url, H(e) ? void 0 : (c = "socket" === d ? new m(b) : new n(b), this.elements.push(c))
        }, a
    }(), n = function() {
        function a(a) {
            var b, c, d, e, f, g, h = this;
            if (this.progress = 0, null != window.ProgressEvent)
                for (c = null, a.addEventListener("progress", function(a) {
                        return h.progress = a.lengthComputable ? 100 * a.loaded / a.total : h.progress + (100 - h.progress) / 2
                    }), g = ["load", "abort", "timeout", "error"], d = 0, e = g.length; e > d; d++) b = g[d], a.addEventListener(b, function() {
                    return h.progress = 100
                });
            else f = a.onreadystatechange, a.onreadystatechange = function() {
                var b;
                return 0 === (b = a.readyState) || 4 === b ? h.progress = 100 : 3 === a.readyState && (h.progress = 50), "function" == typeof f ? f.apply(null, arguments) : void 0
            }
        }
        return a
    }(), m = function() {
        function a(a) {
            var b, c, d, e, f = this;
            for (this.progress = 0, e = ["error", "open"], c = 0, d = e.length; d > c; c++) b = e[c], a.addEventListener(b, function() {
                return f.progress = 100
            })
        }
        return a
    }(), d = function() {
        function a(a) {
            var b, c, d, f;
            for (null == a && (a = {}), this.elements = [], null == a.selectors && (a.selectors = []), f = a.selectors, c = 0, d = f.length; d > c; c++) b = f[c], this.elements.push(new e(b))
        }
        return a
    }(), e = function() {
        function a(a) {
            this.selector = a, this.progress = 0, this.check()
        }
        return a.prototype.check = function() {
            var a = this;
            return document.querySelector(this.selector) ? this.done() : setTimeout(function() {
                return a.check()
            }, C.elements.checkInterval)
        }, a.prototype.done = function() {
            return this.progress = 100
        }, a
    }(), c = function() {
        function a() {
            var a, b, c = this;
            this.progress = null != (b = this.states[document.readyState]) ? b : 100, a = document.onreadystatechange, document.onreadystatechange = function() {
                return null != c.states[document.readyState] && (c.progress = c.states[document.readyState]), "function" == typeof a ? a.apply(null, arguments) : void 0
            }
        }
        return a.prototype.states = {
            loading: 0,
            interactive: 50,
            complete: 100
        }, a
    }(), f = function() {
        function a() {
            var a, b, c, d, e, f = this;
            this.progress = 0, a = 0, e = [], d = 0, c = B(), b = setInterval(function() {
                var g;
                return g = B() - c - 50, c = B(), e.push(g), e.length > C.eventLag.sampleCount && e.shift(), a = p(e), ++d >= C.eventLag.minSamples && a < C.eventLag.lagThreshold ? (f.progress = 100, clearInterval(b)) : f.progress = 100 * (3 / (a + 3))
            }, 50)
        }
        return a
    }(), l = function() {
        function a(a) {
            this.source = a, this.last = this.sinceLastUpdate = 0, this.rate = C.initialRate, this.catchup = 0, this.progress = this.lastProgress = 0, null != this.source && (this.progress = E(this.source, "progress"))
        }
        return a.prototype.tick = function(a, b) {
            var c;
            return null == b && (b = E(this.source, "progress")), b >= 100 && (this.done = !0), b === this.last ? this.sinceLastUpdate += a : (this.sinceLastUpdate && (this.rate = (b - this.last) / this.sinceLastUpdate), this.catchup = (b - this.progress) / C.catchupTime, this.sinceLastUpdate = 0, this.last = b), b > this.progress && (this.progress += this.catchup * a), c = 1 - Math.pow(this.progress / 100, C.easeFactor), this.progress += c * this.rate * a, this.progress = Math.min(this.lastProgress + C.maxProgressPerFrame, this.progress), this.progress = Math.max(0, this.progress), this.progress = Math.min(100, this.progress), this.lastProgress = this.progress, this.progress
        }, a
    }(), K = null, G = null, q = null, L = null, o = null, r = null, Pace.running = !1, y = function() {
        return C.restartOnPushState ? Pace.restart() : void 0
    }, null != window.history.pushState && (S = window.history.pushState, window.history.pushState = function() {
        return y(), S.apply(window.history, arguments)
    }), null != window.history.replaceState && (V = window.history.replaceState, window.history.replaceState = function() {
        return y(), V.apply(window.history, arguments)
    }), k = {
        ajax: a,
        elements: d,
        document: c,
        eventLag: f
    }, (A = function() {
        var a, c, d, e, f, g, h, i;
        for (Pace.sources = K = [], g = ["ajax", "elements", "document", "eventLag"], c = 0, e = g.length; e > c; c++) a = g[c], C[a] !== !1 && K.push(new k[a](C[a]));
        for (i = null != (h = C.extraSources) ? h : [], d = 0, f = i.length; f > d; d++) J = i[d], K.push(new J(C));
        return Pace.bar = q = new b, G = [], L = new l
    })(), Pace.stop = function() {
        return Pace.trigger("stop"), Pace.running = !1, q.destroy(), r = !0, null != o && ("function" == typeof s && s(o), o = null), A()
    }, Pace.restart = function() {
        return Pace.trigger("restart"), Pace.stop(), Pace.start()
    }, Pace.go = function() {
        var a;
        return Pace.running = !0, q.render(), a = B(), r = !1, o = F(function(b, c) {
            var d, e, f, g, h, i, j, k, m, n, o, p, s, t, u, v;
            for (k = 100 - q.progress, e = o = 0, f = !0, i = p = 0, t = K.length; t > p; i = ++p)
                for (J = K[i], n = null != G[i] ? G[i] : G[i] = [], h = null != (v = J.elements) ? v : [J], j = s = 0, u = h.length; u > s; j = ++s) g = h[j], m = null != n[j] ? n[j] : n[j] = new l(g), f &= m.done, m.done || (e++, o += m.tick(b));
            return d = o / e, q.update(L.tick(b, d)), q.done() || f || r ? (q.update(100), Pace.trigger("done"), setTimeout(function() {
                return q.finish(), Pace.running = !1, Pace.trigger("hide")
            }, Math.max(C.ghostTime, Math.max(C.minTime - (B() - a), 0)))) : c()
        })
    }, Pace.start = function(a) {
        u(C, a), Pace.running = !0;
        try {
            q.render()
        } catch (b) {
            i = b
        }
        return document.querySelector(".pace") ? (Pace.trigger("start"), Pace.go()) : setTimeout(Pace.start, 50)
    }, "function" == typeof define && define.amd ? define(function() {
        return Pace
    }) : "object" == typeof exports ? module.exports = Pace : C.startOnPageLoad && Pace.start()
}).call(this);

//Sticky Navigation
jQuery.noConflict();
! function(t) {
    var e = {
            topSpacing: 0,
            bottomSpacing: 0,
            className: "is-sticky",
            wrapperClassName: "sticky-wrapper",
            center: !1,
            getWidthFrom: ""
        },
        i = t(window),
        n = t(document),
        a = [],
        s = i.height(),
        r = function() {
            var e, r = jQuery("#header").height(),
                o = jQuery("#main-menu").height();
            e = -r;
            for (var c = i.scrollTop(), p = n.height(), l = p - s, h = c > l ? l - c : e, d = 0; d < a.length; d++) {
                var m = a[d],
                    u = m.stickyWrapper.offset().top,
                    g = u - m.topSpacing - h;
                if (g >= c) null !== m.currentTop && (m.stickyElement.css("position", "").css("top", "").css("height", ""), m.stickyElement.parent().hasClass(m.className) && m.stickyElement.parent().animate({}, {
                    queue: !1,
                    duration: 250,
                    easing: "linear",
                    complete: function() {
                        m.stickyElement.parent().removeClass(m.className)
                    }
                }), m.currentTop = null);
                else {
                    var y = p - m.stickyElement.outerHeight() - m.topSpacing - m.bottomSpacing - c - h;
                    0 > y ? y += m.topSpacing : y = m.topSpacing, m.currentTop != y && (m.stickyElement.css("position", "fixed").css("top", y).css("height", o), "undefined" != typeof m.getWidthFrom && m.stickyElement.css("width", t(m.getWidthFrom).width()), m.stickyElement.parent().hasClass(m.className) || m.stickyElement.parent().animate({}, {
                        queue: !1,
                        duration: 250,
                        easing: "linear",
                        complete: function() {
                            m.stickyElement.parent().addClass(m.className)
                        }
                    }), m.currentTop = y)
                }
            }
        },
        o = function() {
            s = i.height()
        },
        c = {
            init: function(i) {
                var n = t.extend(e, i);
                return this.each(function() {
                    var e = t(this),
                        i = e.attr("id"),
                        s = t("<div></div>").attr("id", i + "-sticky-wrapper").addClass(n.wrapperClassName);
                    e.wrapAll(s), n.center && e.parent().css({
                        width: e.outerWidth(),
                        marginLeft: "auto",
                        marginRight: "auto"
                    }), "right" == e.css("float") && e.css({
                        "float": "none"
                    }).parent().css({
                        "float": "right"
                    });
                    var r = e.parent();
                    r.css("height", e.outerHeight()), a.push({
                        topSpacing: n.topSpacing,
                        bottomSpacing: n.bottomSpacing,
                        stickyElement: e,
                        currentTop: null,
                        stickyWrapper: r,
                        className: n.className,
                        getWidthFrom: n.getWidthFrom
                    })
                })
            },
            update: r
        };
    window.addEventListener ? (window.addEventListener("scroll", r, !1), window.addEventListener("resize", o, !1)) : window.attachEvent && (window.attachEvent("onscroll", r), window.attachEvent("onresize", o)), t.fn.sticky = function(e) {
        return c[e] ? c[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof e && e ? void t.error("Method " + e + " does not exist on jQuery.sticky") : c.init.apply(this, arguments)
    }, t(function() {
        setTimeout(r, 0)
    })
}(jQuery);

//Jquery Inview
jQuery.noConflict();
! function(e) {
    function n() {
        var n = window.innerHeight,
            t = document.compatMode;
        return (t || !e.support.boxModel) && (n = "CSS1Compat" == t ? document.documentElement.clientHeight : document.body.clientHeight), n
    }
    e(window).scroll(function() {
        var t = n(),
            o = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop,
            i = [];
        e.each(e.cache, function() {
            this.events && this.events.inview && i.push(this.handle.elem)
        }), i.length && e(i).each(function() {
            var n = e(this),
                i = n.offset().top,
                c = n.height(),
                d = n.data("inview") || !1;
            o > i + c || i > o + t ? d && (n.data("inview", !1), n.trigger("inview", [!1])) : i + c > o && (d || (n.data("inview", !0), n.trigger("inview", [!0])))
        })
    }), e(function() {
        e(window).scroll()
    })
}(jQuery);

//Jquery Parallax
jQuery.noConflict();
! function(n) {
    var t = n(window),
        e = t.height();
    t.resize(function() {
        e = t.height()
    }), n.fn.parallax = function(o, i, r) {
        function u() {
            var r = t.scrollTop();
            a.each(function() {
                var t = n(this),
                    u = t.offset().top,
                    c = h(t);
                r > u + c || u > r + e || a.css("backgroundPosition", o + " " + Math.round((l - r) * i) + "px")
            })
        }
        var h, l, a = n(this);
        a.each(function() {
            l = a.offset().top
        }), h = r ? function(n) {
            return n.outerHeight(!0)
        } : function(n) {
            return n.height()
        }, (arguments.length < 1 || null === o) && (o = "50%"), (arguments.length < 2 || null === i) && (i = .1), (arguments.length < 3 || null === r) && (r = !0), t.bind("scroll", u).resize(u), u()
    }
}(jQuery);

//Jquery Cookie
jQuery.noConflict();
! function(e, n, o) {
    function r(e) {
        return e
    }

    function t(e) {
        return decodeURIComponent(e.replace(i, " "))
    }
    var i = /\+/g,
        u = e.cookie = function(i, a, s) {
            if (a !== o) {
                if (s = e.extend({}, u.defaults, s), null === a && (s.expires = -1), "number" == typeof s.expires) {
                    var p = s.expires,
                        c = s.expires = new Date;
                    c.setDate(c.getDate() + p)
                }
                return a = u.json ? JSON.stringify(a) : String(a), n.cookie = [encodeURIComponent(i), "=", u.raw ? a : encodeURIComponent(a), s.expires ? "; expires=" + s.expires.toUTCString() : "", s.path ? "; path=" + s.path : "", s.domain ? "; domain=" + s.domain : "", s.secure ? "; secure" : ""].join("")
            }
            for (var f = u.raw ? r : t, l = n.cookie.split("; "), d = 0, m = l.length; m > d; d++) {
                var x = l[d].split("=");
                if (f(x.shift()) === i) {
                    var g = f(x.join("="));
                    return u.json ? JSON.parse(g) : g
                }
            }
            return null
        };
    u.defaults = {}, e.removeCookie = function(n, o) {
        return null !== e.cookie(n) ? (e.cookie(n, null, o), !0) : !1
    }
}(jQuery, document);

/// UItoTop jQuery Plugin 1.2 | Matt Varone | http://www.mattvarone.com/web-design/uitotop-jquery-plugin
jQuery.noConflict();
(function($) {
    $.fn.UItoTop = function(options) {
        var defaults = {
                text: 'To Top',
                min: 200,
                inDelay: 600,
                outDelay: 400,
                containerID: 'toTop',
                containerHoverID: 'toTopHover',
                scrollSpeed: 1200,
                easingType: 'linear'
            },
            settings = $.extend(defaults, options),
            containerIDhash = '#' + settings.containerID,
            containerHoverIDHash = '#' + settings.containerHoverID;
        $('body').append('<a href="#" id="' + settings.containerID + '">' + settings.text + '</a>');
        $(containerIDhash).hide().on('click.UItoTop', function() {
            $('html, body').animate({
                scrollTop: 0
            }, settings.scrollSpeed, settings.easingType);
            $('#' + settings.containerHoverID, this).stop().animate({
                'opacity': 0
            }, settings.inDelay, settings.easingType);
            return false;
        }).prepend('<span id="' + settings.containerHoverID + '"></span>').hover(function() {
            $(containerHoverIDHash, this).stop().animate({
                'opacity': 1
            }, 600, 'linear');
        }, function() {
            $(containerHoverIDHash, this).stop().animate({
                'opacity': 0
            }, 700, 'linear');
        });
        $(window).scroll(function() {
            var sd = $(window).scrollTop();
            if (typeof document.body.style.maxHeight === "undefined") {
                $(containerIDhash).css({
                    'position': 'absolute',
                    'top': sd + $(window).height() - 50
                });
            }
            if (sd > settings.min)
                $(containerIDhash).fadeIn(settings.inDelay);
            else
                $(containerIDhash).fadeOut(settings.Outdelay);
        });
    };
})(jQuery);

//Jquery Easing
jQuery.noConflict();
jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(n, e, t, u, a) {
        return jQuery.easing[jQuery.easing.def](n, e, t, u, a)
    },
    easeInQuad: function(n, e, t, u, a) {
        return u * (e /= a) * e + t
    },
    easeOutQuad: function(n, e, t, u, a) {
        return -u * (e /= a) * (e - 2) + t
    },
    easeInOutQuad: function(n, e, t, u, a) {
        return (e /= a / 2) < 1 ? u / 2 * e * e + t : -u / 2 * (--e * (e - 2) - 1) + t
    },
    easeInCubic: function(n, e, t, u, a) {
        return u * (e /= a) * e * e + t
    },
    easeOutCubic: function(n, e, t, u, a) {
        return u * ((e = e / a - 1) * e * e + 1) + t
    },
    easeInOutCubic: function(n, e, t, u, a) {
        return (e /= a / 2) < 1 ? u / 2 * e * e * e + t : u / 2 * ((e -= 2) * e * e + 2) + t
    },
    easeInQuart: function(n, e, t, u, a) {
        return u * (e /= a) * e * e * e + t
    },
    easeOutQuart: function(n, e, t, u, a) {
        return -u * ((e = e / a - 1) * e * e * e - 1) + t
    },
    easeInOutQuart: function(n, e, t, u, a) {
        return (e /= a / 2) < 1 ? u / 2 * e * e * e * e + t : -u / 2 * ((e -= 2) * e * e * e - 2) + t
    },
    easeInQuint: function(n, e, t, u, a) {
        return u * (e /= a) * e * e * e * e + t
    },
    easeOutQuint: function(n, e, t, u, a) {
        return u * ((e = e / a - 1) * e * e * e * e + 1) + t
    },
    easeInOutQuint: function(n, e, t, u, a) {
        return (e /= a / 2) < 1 ? u / 2 * e * e * e * e * e + t : u / 2 * ((e -= 2) * e * e * e * e + 2) + t
    },
    easeInSine: function(n, e, t, u, a) {
        return -u * Math.cos(e / a * (Math.PI / 2)) + u + t
    },
    easeOutSine: function(n, e, t, u, a) {
        return u * Math.sin(e / a * (Math.PI / 2)) + t
    },
    easeInOutSine: function(n, e, t, u, a) {
        return -u / 2 * (Math.cos(Math.PI * e / a) - 1) + t
    },
    easeInExpo: function(n, e, t, u, a) {
        return 0 == e ? t : u * Math.pow(2, 10 * (e / a - 1)) + t
    },
    easeOutExpo: function(n, e, t, u, a) {
        return e == a ? t + u : u * (-Math.pow(2, -10 * e / a) + 1) + t
    },
    easeInOutExpo: function(n, e, t, u, a) {
        return 0 == e ? t : e == a ? t + u : (e /= a / 2) < 1 ? u / 2 * Math.pow(2, 10 * (e - 1)) + t : u / 2 * (-Math.pow(2, -10 * --e) + 2) + t
    },
    easeInCirc: function(n, e, t, u, a) {
        return -u * (Math.sqrt(1 - (e /= a) * e) - 1) + t
    },
    easeOutCirc: function(n, e, t, u, a) {
        return u * Math.sqrt(1 - (e = e / a - 1) * e) + t
    },
    easeInOutCirc: function(n, e, t, u, a) {
        return (e /= a / 2) < 1 ? -u / 2 * (Math.sqrt(1 - e * e) - 1) + t : u / 2 * (Math.sqrt(1 - (e -= 2) * e) + 1) + t
    },
    easeInElastic: function(n, e, t, u, a) {
        var r = 1.70158,
            i = 0,
            s = u;
        if (0 == e) return t;
        if (1 == (e /= a)) return t + u;
        if (i || (i = .3 * a), s < Math.abs(u)) {
            s = u;
            var r = i / 4
        } else var r = i / (2 * Math.PI) * Math.asin(u / s);
        return -(s * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e * a - r) * Math.PI / i)) + t
    },
    easeOutElastic: function(n, e, t, u, a) {
        var r = 1.70158,
            i = 0,
            s = u;
        if (0 == e) return t;
        if (1 == (e /= a)) return t + u;
        if (i || (i = .3 * a), s < Math.abs(u)) {
            s = u;
            var r = i / 4
        } else var r = i / (2 * Math.PI) * Math.asin(u / s);
        return s * Math.pow(2, -10 * e) * Math.sin(2 * (e * a - r) * Math.PI / i) + u + t
    },
    easeInOutElastic: function(n, e, t, u, a) {
        var r = 1.70158,
            i = 0,
            s = u;
        if (0 == e) return t;
        if (2 == (e /= a / 2)) return t + u;
        if (i || (i = .3 * a * 1.5), s < Math.abs(u)) {
            s = u;
            var r = i / 4
        } else var r = i / (2 * Math.PI) * Math.asin(u / s);
        return 1 > e ? -.5 * s * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e * a - r) * Math.PI / i) + t : s * Math.pow(2, -10 * (e -= 1)) * Math.sin(2 * (e * a - r) * Math.PI / i) * .5 + u + t
    },
    easeInBack: function(n, e, t, u, a, r) {
        return void 0 == r && (r = 1.70158), u * (e /= a) * e * ((r + 1) * e - r) + t
    },
    easeOutBack: function(n, e, t, u, a, r) {
        return void 0 == r && (r = 1.70158), u * ((e = e / a - 1) * e * ((r + 1) * e + r) + 1) + t
    },
    easeInOutBack: function(n, e, t, u, a, r) {
        return void 0 == r && (r = 1.70158), (e /= a / 2) < 1 ? u / 2 * e * e * (((r *= 1.525) + 1) * e - r) + t : u / 2 * ((e -= 2) * e * (((r *= 1.525) + 1) * e + r) + 2) + t
    },
    easeInBounce: function(n, e, t, u, a) {
        return u - jQuery.easing.easeOutBounce(n, a - e, 0, u, a) + t
    },
    easeOutBounce: function(n, e, t, u, a) {
        return (e /= a) < 1 / 2.75 ? 7.5625 * u * e * e + t : 2 / 2.75 > e ? u * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + t : 2.5 / 2.75 > e ? u * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + t : u * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + t
    },
    easeInOutBounce: function(n, e, t, u, a) {
        return a / 2 > e ? .5 * jQuery.easing.easeInBounce(n, 2 * e, 0, u, a) + t : .5 * jQuery.easing.easeOutBounce(n, 2 * e - a, 0, u, a) + .5 * u + t
    }
});

/*! Init - Pricing Table jQuery */

! function(t) {
    t(function() {
        t(".cmn-toggle").each(function() {
            t(this).change(function() {
                var a = "." + t(this).attr("id"),
                    n = t(this).attr("data-price"),
                    s = t(".dt-sc-pr-tb-col.type2 .dt-sc-pricing-table .dt-sc-price span");
                t(a).toggleClass("active"), n && s.html(t(a).hasClass("active") ? parseInt(s.html()) + parseInt(n) : parseInt(s.html()) - parseInt(n))
            })
        })
    })
}(jQuery);

//Jquery Retina
jQuery.noConflict();
! function() {
    function t() {}

    function e(t) {
        return r.retinaImageSuffix + t
    }

    function i(t, i) {
        if (this.path = t || "", "undefined" != typeof i && null !== i) this.at_2x_path = i, this.perform_check = !1;
        else {
            if (void 0 !== document.createElement) {
                var n = document.createElement("a");
                n.href = this.path, n.pathname = n.pathname.replace(o, e), this.at_2x_path = n.href
            } else {
                var a = this.path.split("?");
                a[0] = a[0].replace(o, e), this.at_2x_path = a.join("?")
            }
            this.perform_check = !0
        }
    }

    function n(t) {
        this.el = t, this.path = new i(this.el.getAttribute("src"), this.el.getAttribute("data-at2x"));
        var e = this;
        this.path.check_2x_variant(function(t) {
            t && e.swap()
        })
    }
    var a = "undefined" == typeof exports ? window : exports,
        r = {
            retinaImageSuffix: "@2x",
            check_mime_type: !0,
            force_original_dimensions: !0
        };
    a.Retina = t, t.configure = function(t) {
        null === t && (t = {});
        for (var e in t) t.hasOwnProperty(e) && (r[e] = t[e])
    }, t.init = function(t) {
        null === t && (t = a);
        var e = t.onload || function() {};
        t.onload = function() {
            var t, i, a = document.getElementsByTagName("img"),
                r = [];
            for (t = 0; t < a.length; t += 1) i = a[t], i.getAttributeNode("data-no-retina") || r.push(new n(i));
            e()
        }
    }, t.isRetina = function() {
        var t = "(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)";
        return a.devicePixelRatio > 1 ? !0 : a.matchMedia && a.matchMedia(t).matches ? !0 : !1
    };
    var o = /\.\w+$/;
    a.RetinaImagePath = i, i.confirmed_paths = [], i.prototype.is_external = function() {
        return !(!this.path.match(/^https?\:/i) || this.path.match("//" + document.domain))
    }, i.prototype.check_2x_variant = function(t) {
        var e, n = this;
        return this.is_external() ? t(!1) : this.perform_check || "undefined" == typeof this.at_2x_path || null === this.at_2x_path ? this.at_2x_path in i.confirmed_paths ? t(!0) : (e = new XMLHttpRequest, e.open("HEAD", this.at_2x_path), e.onreadystatechange = function() {
            if (4 !== e.readyState) return t(!1);
            if (e.status >= 200 && e.status <= 399) {
                if (r.check_mime_type) {
                    var a = e.getResponseHeader("Content-Type");
                    if (null === a || !a.match(/^image/i)) return t(!1)
                }
                return i.confirmed_paths.push(n.at_2x_path), t(!0)
            }
            return t(!1)
        }, e.send(), void 0) : t(!0)
    }, a.RetinaImage = n, n.prototype.swap = function(t) {
        function e() {
            i.el.complete ? (r.force_original_dimensions && (i.el.setAttribute("width", i.el.offsetWidth), i.el.setAttribute("height", i.el.offsetHeight)), i.el.setAttribute("src", t)) : setTimeout(e, 5)
        }
        "undefined" == typeof t && (t = this.path.at_2x_path);
        var i = this;
        e()
    }, t.isRetina() && t.init(a)
}();