var SUPPORT = (function () {
    var animationID = Modernizr.prefixed("animation"), 
        transformID = Modernizr.prefixed("transform");
    
    var that = {
        animation: {
            delay: '',
            name: '',
            endEvent: '',
            playState: ''
        },
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
    return that;
}());
