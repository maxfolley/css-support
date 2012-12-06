CSS Support
==========

A javascript support object for accessing CSS3 animation declaration and event names. SUPPORT also contains an animation helper that uses css transitions.

SUPPORT only has one dependeny at this time, jQuery. This dependency will be removed on the next iteration.

Usage
-----

    var myEl = document.getElementById("my-id");
    myEl.style[SUPPORT.transition] = "opacity 1s ease-in-out";  

    // Transformations
    myEl.style[SUPPORT.transform] = "rotate(120deg) translate3d(100px, 200px, 100px)";  

    // To animate
    SUPPORT.animate(el, {
      height: 200,
      easing: 'inOutCubic',
      duration: 600,
      complete: function() {
        console.log("do something!");
      }
    });   

    // Seuencig animations
    SUPPORT.animate(el, [{
      height: 200,
      easing: 'inOutCubic',
      duration: 600
    }, {
      opactiy: 1,
      delay: 400
    }]);   

    // Getting ease types
    SUPPORT.ease('inOut');
    SUPPORT.ease('inOutCubic');

    // Get event names
    SUPPORT.animationEnd
    SUPPORT.transitionEnd

    // Check if animations or transition are supported
    SUPPORT.animation
    SUPPORT.transition

     // Animate using css transitions and supply a fallback
    if (SUPPORT.transition) {
      SUPPORT.animate(el, [{
        height: 200,
        easing: 'inOutCubic',
        duration: 600
      }, {
        opactiy: 1,
        delay: 400
      }]);
    } else {
      // Fallback could use jQuery animate or just set some css values
    }
