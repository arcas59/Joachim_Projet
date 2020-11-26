!(function (window, document, undefined) {
    var tests = [],
        ModernizrProto = {
            _version: "3.7.1",
            _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 },
            _q: [],
            on: function (e, t) {
                var n = this;
                setTimeout(function () {
                    t(n[e]);
                }, 0);
            },
            addTest: function (e, t, n) {
                tests.push({ name: e, fn: t, options: n });
            },
            addAsyncTest: function (e) {
                tests.push({ name: null, fn: e });
            },
        },
        Modernizr = function () {};
    (Modernizr.prototype = ModernizrProto), (Modernizr = new Modernizr());
    var classes = [];
    function is(e, t) {
        return typeof e === t;
    }
    function testRunner() {
        var e, t, n, r, o, i;
        for (var s in tests)
            if (tests.hasOwnProperty(s)) {
                if (((e = []), (t = tests[s]).name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length))) for (n = 0; n < t.options.aliases.length; n++) e.push(t.options.aliases[n].toLowerCase());
                for (r = is(t.fn, "function") ? t.fn() : t.fn, o = 0; o < e.length; o++)
                    1 === (i = e[o].split(".")).length ? (Modernizr[i[0]] = r) : (!Modernizr[i[0]] || Modernizr[i[0]] instanceof Boolean || (Modernizr[i[0]] = new Boolean(Modernizr[i[0]])), (Modernizr[i[0]][i[1]] = r)),
                        classes.push((r ? "" : "no-") + i.join("-"));
            }
    }
    var docElement = document.documentElement,
        isSVG = "svg" === docElement.nodeName.toLowerCase();
    function setClasses(e) {
        var t = docElement.className,
            n = Modernizr._config.classPrefix || "";
        if ((isSVG && (t = t.baseVal), Modernizr._config.enableJSClass)) {
            var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
            t = t.replace(r, "$1" + n + "js$2");
        }
        Modernizr._config.enableClasses && (e.length > 0 && (t += " " + n + e.join(" " + n)), isSVG ? (docElement.className.baseVal = t) : (docElement.className = t));
    }
    function createElement() {
        return "function" != typeof document.createElement
            ? document.createElement(arguments[0])
            : isSVG
            ? document.createElementNS.call(document, "http://www.w3.org/2000/svg", arguments[0])
            : document.createElement.apply(document, arguments);
    }
    Modernizr.addTest("svg", !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect);
    var prefixes = ModernizrProto._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
    function getBody() {
        var e = document.body;
        return e || ((e = createElement(isSVG ? "svg" : "body")).fake = !0), e;
    }
    function injectElementWithStyles(e, t, n, r) {
        var o,
            i,
            s,
            d,
            l = "modernizr",
            a = createElement("div"),
            c = getBody();
        if (parseInt(n, 10)) for (; n--; ) ((s = createElement("div")).id = r ? r[n] : l + (n + 1)), a.appendChild(s);
        return (
            ((o = createElement("style")).type = "text/css"),
            (o.id = "s" + l),
            (c.fake ? c : a).appendChild(o),
            c.appendChild(a),
            o.styleSheet ? (o.styleSheet.cssText = e) : o.appendChild(document.createTextNode(e)),
            (a.id = l),
            c.fake && ((c.style.background = ""), (c.style.overflow = "hidden"), (d = docElement.style.overflow), (docElement.style.overflow = "hidden"), docElement.appendChild(c)),
            (i = t(a, e)),
            c.fake ? (c.parentNode.removeChild(c), (docElement.style.overflow = d), docElement.offsetHeight) : a.parentNode.removeChild(a),
            !!i
        );
    }
    (ModernizrProto._prefixes = prefixes),
        Modernizr.addTest("csscalc", function () {
            var e = createElement("a");
            return (e.style.cssText = "width:" + prefixes.join("calc(10px);width:")), !!e.style.length;
        });
    var testStyles = (ModernizrProto.testStyles = injectElementWithStyles);
    function computedStyle(e, t, n) {
        var r;
        if ("getComputedStyle" in window) {
            r = getComputedStyle.call(window, e, t);
            var o = window.console;
            if (null !== r) n && (r = r.getPropertyValue(n));
            else if (o) o[o.error ? "error" : "log"].call(o, "getComputedStyle returning null, its possible modernizr test results are inaccurate");
        } else r = !t && e.currentStyle && e.currentStyle[n];
        return r;
    }
    function roundedEquals(e, t) {
        return e - 1 === t || e === t || e + 1 === t;
    }
    testStyles("#modernizr { width: 50vw; }", function (e) {
        var t = parseInt(window.innerWidth / 2, 10),
            n = parseInt(computedStyle(e, null, "width"), 10);
        Modernizr.addTest("cssvwunit", roundedEquals(n, t));
    });
    var mq =
            ((matchMedia = window.matchMedia || window.msMatchMedia),
            matchMedia
                ? function (e) {
                      var t = matchMedia(e);
                      return (t && t.matches) || !1;
                  }
                : function (e) {
                      var t = !1;
                      return (
                          injectElementWithStyles("@media " + e + " { #modernizr { position: absolute; } }", function (e) {
                              t = "absolute" === (window.getComputedStyle ? window.getComputedStyle(e, null) : e.currentStyle).position;
                          }),
                          t
                      );
                  }),
        matchMedia;
    (ModernizrProto.mq = mq),
        Modernizr.addTest("touchevents", function () {
            if ("ontouchstart" in window || window.TouchEvent || (window.DocumentTouch && document instanceof DocumentTouch)) return !0;
            var e = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join("");
            return mq(e);
        }),
        Modernizr.addTest("arrow", function () {
            try {
                eval("()=>{}");
            } catch (e) {
                return !1;
            }
            return !0;
        });
    var omPrefixes = "Moz O ms Webkit",
        cssomPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.split(" ") : [];
    function contains(e, t) {
        return !!~("" + e).indexOf(t);
    }
    ModernizrProto._cssomPrefixes = cssomPrefixes;
    var modElem = { elem: createElement("modernizr") };
    Modernizr._q.push(function () {
        delete modElem.elem;
    });
    var mStyle = { style: modElem.elem.style };
    function domToCSS(e) {
        return e
            .replace(/([A-Z])/g, function (e, t) {
                return "-" + t.toLowerCase();
            })
            .replace(/^ms-/, "-ms-");
    }
    function nativeTestProps(e, t) {
        var n = e.length;
        if ("CSS" in window && "supports" in window.CSS) {
            for (; n--; ) if (window.CSS.supports(domToCSS(e[n]), t)) return !0;
            return !1;
        }
        if ("CSSSupportsRule" in window) {
            for (var r = []; n--; ) r.push("(" + domToCSS(e[n]) + ":" + t + ")");
            return injectElementWithStyles("@supports (" + (r = r.join(" or ")) + ") { #modernizr { position: absolute; } }", function (e) {
                return "absolute" === computedStyle(e, null, "position");
            });
        }
        return undefined;
    }
    function cssToDOM(e) {
        return e
            .replace(/([a-z])-([a-z])/g, function (e, t, n) {
                return t + n.toUpperCase();
            })
            .replace(/^-/, "");
    }
    function testProps(e, t, n, r) {
        if (((r = !is(r, "undefined") && r), !is(n, "undefined"))) {
            var o = nativeTestProps(e, n);
            if (!is(o, "undefined")) return o;
        }
        for (var i, s, d, l, a, c = ["modernizr", "tspan", "samp"]; !mStyle.style && c.length; ) (i = !0), (mStyle.modElem = createElement(c.shift())), (mStyle.style = mStyle.modElem.style);
        function u() {
            i && (delete mStyle.style, delete mStyle.modElem);
        }
        for (d = e.length, s = 0; s < d; s++)
            if (((l = e[s]), (a = mStyle.style[l]), contains(l, "-") && (l = cssToDOM(l)), mStyle.style[l] !== undefined)) {
                if (r || is(n, "undefined")) return u(), "pfx" !== t || l;
                try {
                    mStyle.style[l] = n;
                } catch (e) {}
                if (mStyle.style[l] !== a) return u(), "pfx" !== t || l;
            }
        return u(), !1;
    }
    Modernizr._q.unshift(function () {
        delete mStyle.style;
    });
    var domPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(" ") : [];
    function fnBind(e, t) {
        return function () {
            return e.apply(t, arguments);
        };
    }
    function testDOMProps(e, t, n) {
        var r;
        for (var o in e) if (e[o] in t) return !1 === n ? e[o] : is((r = t[e[o]]), "function") ? fnBind(r, n || t) : r;
        return !1;
    }
    function testPropsAll(e, t, n, r, o) {
        var i = e.charAt(0).toUpperCase() + e.slice(1),
            s = (e + " " + cssomPrefixes.join(i + " ") + i).split(" ");
        return is(t, "string") || is(t, "undefined") ? testProps(s, t, r, o) : testDOMProps((s = (e + " " + domPrefixes.join(i + " ") + i).split(" ")), t, n);
    }
    (ModernizrProto._domPrefixes = domPrefixes), (ModernizrProto.testAllProps = testPropsAll);
    var atRule = function (e) {
        var t,
            n = prefixes.length,
            r = window.CSSRule;
        if (void 0 === r) return undefined;
        if (!e) return !1;
        if ((t = (e = e.replace(/^@/, "")).replace(/-/g, "_").toUpperCase() + "_RULE") in r) return "@" + e;
        for (var o = 0; o < n; o++) {
            var i = prefixes[o];
            if (i.toUpperCase() + "_" + t in r) return "@-" + i.toLowerCase() + "-" + e;
        }
        return !1;
    };
    ModernizrProto.atRule = atRule;
    var prefixed = (ModernizrProto.prefixed = function (e, t, n) {
        return 0 === e.indexOf("@") ? atRule(e) : (-1 !== e.indexOf("-") && (e = cssToDOM(e)), t ? testPropsAll(e, t, n) : testPropsAll(e, "pfx"));
    });
    Modernizr.addTest("objectfit", !!prefixed("objectFit"), { aliases: ["object-fit"] }), testRunner(), setClasses(classes), delete ModernizrProto.addTest, delete ModernizrProto.addAsyncTest;
    for (var i = 0; i < Modernizr._q.length; i++) Modernizr._q[i]();
    window.Modernizr = Modernizr;
})(window, document);

        /* LoadJS */
        !function(e){var t=function(t,o,n){"use strict";var r,a=e.document.getElementsByTagName("script")[0],c=e.document.createElement("script");return"boolean"==typeof o&&(r=n,n=o,o=r),c.src=t,c.async=!n,a.parentNode.insertBefore(c,a),o&&"function"==typeof o&&(c.onload=o),c};"undefined"!=typeof module?module.exports=t:e.loadJS=t}("undefined"!=typeof global?global:this);

        /* Load JavaScript if browser cuts the mustard, and babel-polyfill when needed */
        var cutsMustard = 'querySelector' in document && 'addEventListener' in window;
        var cutsEdge = 'Symbol' in window && 'WeakMap' in window;
        if (cutsMustard && cutsEdge) {
            loadJS('https://wijnandsschilderwerken.nl/app/themes/isa/assets/build/scripts/main-283db7b886.js');
        } else if (cutsMustard) {
            loadJS('https://wijnandsschilderwerken.nl/app/themes/isa/assets/build/scripts/vendor/babel-polyfill-880cda81be.js', function() {
                loadJS('https://wijnandsschilderwerken.nl/app/themes/isa/assets/build/scripts/main-283db7b886.js');
            });
        } else {
            var doc = document.documentElement;
            var reJS = new RegExp('(^|\\s)js(\\s|$)');
            doc.className = doc.className.replace(reJS, '$1no-js$2');
        }

        /* SVG for Everybody (polyfill svg `use` with external source) */
        function svgSupportsExternalSource() {
            var newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/, webkitUA = /\bAppleWebKit\/(\d+)\b/, olderEdgeUA = /\bEdge\/12\.(\d+)\b/;
            return newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 ? false : true;
        }
        if (!svgSupportsExternalSource()) {
            loadJS('https://wijnandsschilderwerken.nl/app/themes/isa/assets/build/scripts/vendor/svg4everybody-7c62c503b9.js', function() {
                svg4everybody({
                    nosvg: false,
                    polyfill: true
                });
            });
        }