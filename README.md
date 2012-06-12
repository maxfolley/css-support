CSS Support
==========

A javascript support object for accessing CSS3 animation declaration and event names. Makes use of the modernizr prefixed method. Make sure your modernizr build is compiled with the prefixed extension.


Usage
-----

    var myEl = document.getElementById("my-id");
    myEl.style[SUPPORT.animation.shortHand] = "opacity 1s ease-in-out"
