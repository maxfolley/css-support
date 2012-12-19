var SUPPORT = (function () {
    
    var animEvents, belt, numPrefixes, opts, prefixes, style, that, timing, trans, transEvents; 

    animEvents = {'animation': 'animationend', 'MozAnimation': 'animationend', 'WebkitAnimation': 'webkitAnimationEnd'}
    style = (document.body || document.documentElement).style;
    prefixes = ['Moz', 'Webkit', 'O', 'ms'];
    numPrefixes = prefixes.length;
    // Tracks number of running animations for a given element
    runningDict = {};
    transEvents = {'transition': 'transitionend', '-moz-transition': 'transitionend', '-o-transition': 'oTransitionEnd', '-webkit-transition': 'webkitTransitionEnd', '-ms-transition': 'MSTransitionEnd'};

    // Belt, a mini-toolbelt for SUPPORT elements (private)
    belt = {
        // a data-store for selector information, key/value based
        cache: {},

        // assign style properties to an element, or, fetch the value
        css: function (prop, val) {
            if (prop === undefined) return this;
    
            // el.css({marginLeft: "500px"})
            if (typeof prop === "object") {
                for (var key in prop) {
                    var propVal = prop[key];
                    key = convertProp(key);
                    if (typeof propVal !== "string") {
                        propVal = propVal.toString(); 
                    } 
                    this.style[key] = propVal;
                }

            // el.css("margin-left", "500px"); or el.css("margin-left");
            } else {
                prop = convertProp(prop);
                if (val === undefined) {
                    return window.getComputedStyle(this, null)[prop];
                }
                this.style[prop] = val;
            }

            return this;
        },

        // assign a value to a key in this.cache, if a value is not supplied, the value of the key is returned
        data: function (key, val) {
            if (typeof key !== "string") return this;
            // match whitespace in key and throw error
            if (key.match(/\s+/)) {
                throw new Error("Data-key must not contain whitespace");
            }
            // fetch and return key value
            if (val === undefined && this.cache[key] !== undefined) {
                return this.cache[key];
            }
            // assign key value
            if (val !== undefined) {
                this.cache[key] = val;
            }
            return this;
        },

        // copy properties of a source object into the first object argument
        // ex: belt.extend(el, belt.tools);
        extend: function (obj, source) {
            if (obj === null || source === null) return;
            for (var prop in source) {
                if (obj.hasOwnProperty(prop)) continue;
                obj[prop] = source[prop];
            }
            return obj;
        },

        // If a key is supplied, delete that key from this.cache, otherwise, wipe this.cache
        removeData: function (key) {
            if (!key) {
                this.cache = {}; 
            } else {
                delete this.cache[key];
            }
            return this;
        }
    };

    that = {
        // SUPPORT.animate(el, {opacity: 1, duration: 800, delay: 300});
        // SUPPORT.animate(el, [{opacity: 1, duration: 800, delay: 300}, {x: 100, ease: 'inCubic'}]);
        animate: function(el, opts) {
            belt.extend(el, belt);
            var i, prop, propObj, transStr,
                map = {}, numTrans = 0, props = {}, supportData, trans = [];
            // Build animation string 
            if (opts instanceof Array) {
                for (i = 0; i < opts.length; i += 1) {
                    buildProps(props, opts[i]);
                }
            } else {
                // allow one complete
                buildProps(props, opts);
            }
            for (prop in props) {
                propObj = props[prop];

                transStr = prop + ' ' + propObj.duration + ' ' + getEase(propObj.easing);
                if (typeof propObj.delay !== "undefined") {
                    transStr += ' ' + propObj.delay;
                }
                trans.push(transStr);
                map[prop] = propObj.value;
                numTrans += 1;
            }

            if (that.csstransitions === true) {
                supportData = el.data("supportData") || {};
                if (typeof supportData.running === "undefined" || supportData.running === false) {
                    supportData = {
                        oldCSS: el.css(that.transition),
                        onEnd: transEndHelper(el, props) 
                    }
                    el.addEventListener(that.transitionEnd, supportData.onEnd);
                    //el[0].addEventListener(that.transitionEnd, supportData.onEnd);
                }
                supportData.running = true;
                supportData.numTrans = trans.length;
                el.data("supportData", supportData)
                  .css(that.transition, trans.join(', '))
                  .css(map);
            } else {
                el.css(map);
            }
        },
        animation: {
            delay: '',
            name: '',
            endEvent: '',
            playState: ''
        },
        ease: function(id) {
            getEase(id);
        },
        hasProp: function(propID) {
            return (typeof getProp(propID) === "undefined") ? false : true;
        },
        stopAnimation: function(el) {
            sData = el.data("supportData");
            if (typeof sData === "object") {
                el[0].removeEventListener(that.transitionEnd, sData.onEnd);
                el.css(that.transition, sData.oldCSS);
                el.removeData("supportData");
            }
        },
        animation: getProp('animation'),
        animationDelay: getProp('animationDelay'),
        animationDirection: getProp('animationDirection'),
        animationDuration: getProp('animationDuration'),
        animationFillMode: getProp('animationFillMode'),
        animationIterationCount: getProp('animationIterationCount'),
        animationName: getProp('animationName'),
        animationPlayState: getProp('animationPlayState'),
        animationTimingFunction: getProp('animationTimingFunction'),
        perspective: getProp('perspective'),
        perspectiveOrigin: getProp('perspective-origin'),
        transition: getProp('transition'),
        transitionDelay: getProp('transitionDelay'),
        transitionDuration: getProp('transitionDuration'),
        transitionProperty: getProp('transitionProperty'),
        transitionTimingFunction: getProp('transitionTimingFunction'),
        transform: getProp('transform')
    }

    that.animationEnd = animEvents[that.animation];
    that.cssanimations = (typeof that.animation === "undefined") ? false : true;
    that.csstransitions = (typeof that.transition === "undefined") ? false : true;
    that.transitionEnd = transEvents[that.transition];

    defaults = {'duration': '0', 'easing': 'ease', 'delay': '0ms', 'complete': ''};
    specialProps = {transform: that.transform};
    timing = {
        ease: ease('ease', 'swing'),
        easeLinear: ease('linear', 'swing'),
        easeOut: ease('ease-out', 'easeOutQuad'),
        easeIn: ease('ease-in', 'easeInQuad'),
        easeInOut: ease('ease-in-out', 'easeInQuad'),
        easeInQuad: ease('cubic-bezier(0.550, 0.085, 0.680, 0.530)', 'easeInQuad'),
        easeOutQuad: ease('cubic-bezier(0.250, 0.460, 0.450, 0.940)', 'easeOutQuad'),
        easeInOutQuad: ease('cubic-bezier(0.455, 0.030, 0.515, 0.955)', 'easeInOutQuad'),
        easeInCubic: ease('cubic-bezier(0.550, 0.055, 0.675, 0.190)', 'easeInCubic'),
        easeOutCubic: ease('cubic-bezier(0.215, 0.610, 0.355, 1.000)', 'easeOutCubic'),
        easeInOutCubic: ease('cubic-bezier(0.645, 0.045, 0.355, 1.000)', 'easeInOutCubic'),
        easeInQuart: ease('cubic-bezier(0.895, 0.030, 0.685, 0.220)', 'easeInQuart'),
        easeOutQuart: ease('cubic-bezier(0.165, 0.840, 0.440, 1.000)', 'easeOutQuart'),
        easeInOutQuart: ease('cubic-bezier(0.770, 0.000, 0.175, 1.000)', 'easeInOutQuart'),
        easeInQuint: ease('cubic-bezier(0.755, 0.050, 0.855, 0.060)', 'easeInQuint'),
        easeOutQuint: ease('cubic-bezier(0.230, 1.000, 0.320, 1.000)', 'easeOutQuint'),
        easeOnOutQuint: ease('cubic-bezier(0.860, 0.000, 0.070, 1.000)', 'easeInOutQuin'),
        easeInSine: ease('cubic-bezier(0.470, 0.000, 0.745, 0.715)', 'easeInSine'),
        easeOutSine: ease('cubic-bezier(0.390, 0.575, 0.565, 1.000)', 'easeOutSine'),
        easeInOutSine: ease('cubic-bezier(0.445, 0.050, 0.550, 0.950)', 'easeInOutSine'),
        easeInExpo: ease('cubic-bezier(0.950, 0.050, 0.795, 0.035)', 'easeInExpo'),
        easeOutExpo: ease('cubic-bezier(0.190, 1.000, 0.220, 1.000)', 'easeOutExpo'),
        easeInOutExpo: ease('cubic-bezier(1.000, 0.000, 0.000, 1.000)', 'easeInOutExpo'),
        easeInCirc: ease('cubic-bezier(0.600, 0.040, 0.980, 0.335)', 'easeInCirc'),
        easeOutCirc: ease('cubic-bezier(0.075, 0.820, 0.165, 1.000)', 'easeOutCirc'),
        easeInOutCirc: ease('cubic-bezier(0.785, 0.135, 0.150, 0.860)', 'easeInOutCirc'),
        easeInBack: ease('cubic-bezier(0.600, -0.280, 0.735, 0.045)', 'easeInBack'),
        easeOutBack: ease('cubic-bezier(0.175, 0.885, 0.320, 1.275)', 'easeOutBack'),
        easeInOutBack: ease('cubic-bezier(0.680, -0.550, 0.265, 1.550)', 'easeInOutBack'),
    };

    function convertProp(str) {
        var i, matches = str.match(/\b-[A-Za-z]/g), len = matches.length;
        if (!len) return str;
        for (i = 0; i < len; i += 1) {
            str = str.replace(matches[i], matches[i][1].toUpperCase());
        }
        return str;
    }

    function ease(css, js) {
        var str = (that.csstransitions === true) ? css : js;
        return str;
    }

    function init() {
    }

    function getEase(id) {
        var ease = timing[id] || timing['ease' + id.charAt(0).toUpperCase()+ id.substr(1)];
        return ease;
    }

    function getProp(prop) {
        var i, cased, styleProp;
        if (prop in style) {
            return normalize(prop);
        }
        cased = prop.charAt(0).toUpperCase() + prop.substr(1); 
        for (i = 0; i < numPrefixes; i += 1) {
           styleProp = prefixes[i] + cased; 
           if (styleProp in style) {
               return normalize(styleProp);
           }
        }
    }

    // Normalizes the style properties for css declartions (E.g. WebkiteTransition -> -webkit-transition)
    function normalize(str) {
        return str.replace(/([A-Z])/g, function(i) { return '-' + i.toLowerCase(); });
    }

    function buildProps(props, values) {
        var prop, hasComplete = false;
        for(key in values) {
            // Extract properties from the object 
            if(typeof defaults[key] === "undefined") {
                prop = key;
                if(specialProps[prop]) {
                    prop = specialProps[key];
                }
                props[prop] = {
                    value: values[key], 
                    easing: values.easing || defaults.easing,
                    delay: unit(values.delay, 'ms'),
                    duration: unit(values.duration || defaults.duration, 'ms')
                };
                if (hasComplete === false && values.complete) {
                    hasComplete = true;
                    props[prop].complete = values.complete;
                }
            }
        }
    }

    function transEndHelper(el, props, oldTransCSS) {
        return function onEnd(e) {
            // Prevent bubbled events from triggering this
            if (e.target !== this || e.propertyName in props === false) {
                return;
            }
            var propObj = props[e.propertyName],
                completeFN = propObj.complete;
            supportData = el.data("supportData");
            // Check if it exists, in jQuery if item is removed it no longer has data
            if (typeof supportData !== "undefined") {
                if (supportData.numTrans === 1) {
                    this.removeEventListener(that.transitionEnd, onEnd);
                    el.css(that.transition, supportData.oldCSS);
                    el.removeData("supportData");
                } else {
                    supportData.numTrans -= 1;
                    el.data("supportData", supportData);
                }
            // If not data found, all is lost, the item has been removed, clear the css
            } else {
                el.css(that.transition, "");
            }

            // Call the complete callback for this properties transition
            if (typeof completeFN === "function") {
                // Remove complete to prevent duplicate calls
                propObj.complete = undefined;
                completeFN();
            }
        }
    }

    function unit(i, abbr) {
        if(typeof i === 'string' && !i.match(/^[\-0-9\.]+$/)) {
            return i;
        } else if(typeof i !== "undefined") {
            return i + abbr;
        }
    }

    init();

    return that;
}());
