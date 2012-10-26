CSS Support
==========

A javascript support object for accessing CSS3 animation declaration and event names. Makes use of the modernizr prefixed method. Make sure your modernizr build is compiled with the prefixed extension.  

Also has an animation helper that will use css transitions if available and will fallback to jQuery if not.

Usage
-----

    var myEl = document.getElementById("my-id");
    myEl.style[SUPPORT.animation.shortHand] = "opacity 1s ease-in-out"  

    // To animate
    SUPPORT.animate(el, {height: 200, easing: SUPPORT.easeInOutCubic, duration: 600})   
