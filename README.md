CSS Support
==========

A javascript support object for accessing CSS3 animation declaration and event names.  

Also contains an animation helper that will use css transitions if available and will fallback to jQuery if not.

Usage
-----

    var myEl = document.getElementById("my-id");
    myEl.style[SUPPORT.transition] = "opacity 1s ease-in-out";  

    // Transformations
    myEl.style[SUPPORT.transform] = "rotate(120deg) translate3d(100px, 200px, 100px)";  

    // To animate
    SUPPORT.animate(el, {height: 200, easing: 'inOutCubic', duration: '600ms'});   

    // Seuencig animations
    SUPPORT.animate(el, [{height: 200, easing: 'inOutCubic', duration: '600ms'}, {opactiy: 1, delay: '400ms'}]);   

    // Getting ease types
    SUPPORT.ease('inOut');
    SUPPORT.ease('inOutCubic');

    // Get event names
    SUPPORT.animationEnd
    SUPPORT.transitionEnd

    // Check if animations or transition are supported
    SUPPORT.cssanimations
    SUPPORT.csstransitions
