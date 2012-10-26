var SUPPORT = (function () {
    var animationID = Modernizr.prefixed("animation"), 
        transformID = Modernizr.prefixed("transform");
    
    var that = {
        animate: function(el, options) {
            opts = {
                delay: 0,
                duration: 1000,
                easing: that.linear,
                props: {opacity: 1},
            }
            $.extend(opts, options);
            if(Modernizr.csstransitions === true) {
                var shorts = [],
                    $el = $(el);
                for(key in opts.props) {
                    shorts.push([key, opts.duration + "ms", opts.easing.css, opts.delay + "ms"].join(" "));
                }
                $el.css(that.transition.shortHand, shorts.join(", ")).css(opts.props);
            } else {
                $(el).animate(
                    opts.props,
                    {duration: opts.duration, easing: opts.easing.js}
                );
            }
        },
        animation: {
            delay: '',
            name: '',
            endEvent: '',
            playState: ''
        },
        linear: ease('linear', 'swing'),
        easeOut: ease('ease-out', 'easeOutQuad'),
        easerIn: ease('ease-in', 'easeInQuad'),
        easeInOut: ease('ease-in-out', 'easeInQuad'),
        easeInQuad: ease('cubic-bezier(0.550, 0.085, 0.680, 0.530)', 'easeInQuad'),
        easeOutQuad: ease('cubic-bezier(0.250, 0.460, 0.450, 0.940)', 'easeOutQuad'),
        easeInOutQuad: ease('cubic-bezier(0.455, 0.030, 0.515, 0.955)', 'easeInOutQuad'),
        easeInCubic: ease('cubic-bezier(0.550, 0.055, 0.675, 0.190', 'easeInCubic'),
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
        transition: {
            delay: '',
            duration: '',
            endEvent: '',
            property: '',
            shortHand: '',
            timingFunction: ''
        },
        transform: Modernizr.prefixed("transform")
    }
    switch(Modernizr.prefixed("animation")) {
        case 'WebkitAnimation':
            that.animation.delay = '-webkit-animation-delay'; 
            that.animation.name = '-webkit-animation-name'; 
            that.animation.endEvent = 'webkitAnimationEnd'; 
            that.animation.playState = '-webkit-animation-play-state'; 
            break;

        case 'MozAnimation':
            that.animation.delay = '-moz-animation-delay'; 
            that.animation.name = '-moz-animation-name'; 
            that.animation.endEvent = 'animationend';
            that.animation.playState = '-moz-animation-play-state'; 
            break;
        
        case 'animation':
            that.animation.delay = 'animation-delay'; 
            that.animation.name = 'animation-name'; 
            that.animation.endEvent = 'animationend';
            that.animation.playState = 'animation-play-state'; 
            break;

        default:
            break;
    }
    switch(Modernizr.prefixed("transition")) {
       case 'WebkitTransition':
            that.transition.property = '-webkit-transition-property'; 
            that.transition.duration = '-webkit-transition-duration'; 
            that.transition.timingFunction = '-webkit-transition-timing-function';
            that.transition.delay = '-webkit-transition-delay';
            that.transition.shortHand = '-webkit-transition';
            that.transition.endEvent = 'webkitTransitionEnd'; 
            break;

        case 'MozTransition':
            that.transition.property = '-moz-transition-property'; 
            that.transition.duration = '-moz-transition-duration'; 
            that.transition.timingFunction = '-moz-transition-timing-function';
            that.transition.delay = '-moz-transition-delay';
            that.transition.shortHand = '-moz-transition';
            that.transition.endEvent = 'transitionend';
            break;
        
        case 'OTransition':
            that.transition.property = '-o-transition-property'; 
            that.transition.duration = '-o-transition-duration'; 
            that.transition.timingFunction = '-o-transition-timing-function';
            that.transition.delay = '-o-transition-delay';
            that.transition.shortHand = '-o-transition';
            that.transition.endEvent = 'oTransitionEnd';
            break;

        case 'msTransition':
            that.transition.property = '-ms-transition-property'; 
            that.transition.duration = '-ms-transition-duration'; 
            that.transition.timingFunction = '-ms-transition-timing-function';
            that.transition.delay = '-ms-transition-delay';
            that.transition.shortHand = '-ms-transition';
            that.transition.endEvent = 'MSTransitionEnd';
            break;

        case 'transition':
            that.transition.property = 'transition-property'; 
            that.transition.duration = 'transition-duration'; 
            that.transition.timingFunction = 'transition-timing-function';
            that.transition.delay = 'transition-delay';
            that.transition.shortHand = 'transition';
            that.animation.endEvent = 'transitionend'; 
            break;

        default:
            break;
    }

    function ease(css, js) {
        return {css: css, js: js};
    }

    return that;
}());
