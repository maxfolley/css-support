var SUPPORT = (function () {
    
    var animEvents, numPrefixes, opts, prefixes, style, that, timing, trans, transEvents; 

    animEvents = {'animation': 'animationend', 'MozAnimation': 'animationend', 'WebkitAnimation': 'webkitAnimationEnd'}
    style = (document.body || document.documentElement).style;
    prefixes = ['Moz', 'Webkit', 'O', 'ms'];
    numPrefixes = prefixes.length;
    transEvents = {'transition': 'transitionend', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'WebkitTransition': 'webkitTransitionEnd', 'msTransition': 'MSTransitionEnd'};
    that = {
        // SUPPORT.animate(el, {opacity: 1, duration: 800, delay: 300});
        // SUPPORT.animate(el, [{opacity: 1, duration: 800, delay: 300}, {x: 100, ease: 'inCubic'}]);
        animate: function(el, opts) {
            var i, prop, propObj,
                map = {}, props = {}, trans = [];
            if(that.csstransitions === true) {
                // Build animation string 
                if(opts instanceof Array) {
                    for(i = 0; i < opts.length; i += 1) {
                        buildProps(props, opts[i]);
                    }
                } else {
                    buildProps(props, opts);
                }
                for(prop in props) {
                    propObj = props[prop];
                    trans.push(prop + ' ' + propObj.duration + ' ' + getEase(propObj.easing) + ' ' + propObj.delay);
                    map[prop] = propObj.value;
                }
                el.css(that.transition, trans.join(', ')).css(map);
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
        animation: getProp('animation'),
        animationDelay: getProp('animationDelay'),
        animationDirection: getProp('animationDirection'),
        animationDuration: getProp('animationDuration'),
        animationFillMode: getProp('animationFillMode'),
        animationIterationCount: getProp('animationIterationCount'),
        animationName: getProp('animationName'),
        animationPlayState: getProp('animationPlayState'),
        animationTimingFunction: getProp('animationTimingFunction'),
        transition: getProp('transition'),
        transitionDelay: getProp('transitionDelay'),
        transitionDuration: getProp('transitionDuration'),
        transitionProperty: getProp('transitionProperty'),
        transitionTimingFunction: getProp('transitionTimingFunction'),
        transform: getProp('transform')
    }

    that.animationEnd = animEvents[that.animation];
    that.csstransitions = (typeof that.transition === "undefined") ? false : true;
    that.transitionEnd = transEvents[that.transition];

    defaults = {'duration': '0', 'easing': 'ease', 'delay': '0'};
    specialProps = {'transform': that.transform};
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

    function ease(css, js) {
        var str = (that.csstransitions === true) ? css : js;
        return str;
    }

    function init() {
    }

    function getEase(id) {
        var ease = timing[id] || timing['ease' + id.charAt(0).toUpperCase()+ id.substr(1)];
        console.log("ease",  ease);
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
        var prop;
        for(key in values) {
            // Extract properties from the object 
            if(typeof defaults[key] === "undefined") {
                prop = key;
                if(specialProps[key]) {
                    prop = specialProps[key];
                }
                props[prop] = {
                    value: values[key], 
                    easing: values.easing || defaults.easing,
                    delay: values.delay || defaults.delay,
                    duration: values.duration || defaults.duration,
                };
            }
        }
    }

    init();

    return that;
}());
