polartimer.js
=============

Polartimer is a circular progress widget supporting basic options and a callback function.

See the **Demo** at http://oneorangesoftware.com/polartimer.

Dependencies
------------

* [jQuery](http://jquery.com)
* [Raphael SVG library](http://raphaeljs.com)

Usage Example
-------------

### Include dependencies

    <script type="text/javascript" src="jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="raphael-min.js"></script>
    <script type="text/javascript" src="jquery.polartimer.min.js"></script>

### Markup

    <div id="demoTimer"></div>

### CSS

    #demoTimer { width: 150px; }

### Javascript

    // create the timer
    $('#demoTimer').polartimer({
     timerSeconds: 6,
     color: '#F00',
     opacity: 0.7,
     callback: function () {
      alert('jquery.polartimer.js: done!');
     }
    });

    // start the timer
    $('#demoTimer').polartimer('start');

Options
-------

* __timerSeconds:__  The amount of time in seconds between starting this timer and its completion. *(Default: 10)*
* __color:__  Fill color for the animated progress circle. *(Default: "#CCC")*
* __opacity:__  Opacity of the animated progress circle. *(Default: 1)*
* __callback:__  A function to invoke when the timer completes. *(Default: `function() {}`)*

**Note:** the SVG canvas gets its width and height from the rendered width of the element `polartimer()` is invoked on. Easy to change!

Methods
-------

* __init:__  Creates the timer state and its backing SVG canvas. This method may take as an argument an object containing options which override the default settings.

    `$('#myElem').polartimer([options]);`

* __start:__  Starts the timer. The timer must be created with a call to init first.

    `$('#myElem').polartimer('start');`

* __pause:__  Pauses the running timer. The timer must be created with a call to init first.

    `$('#myElem').polartimer('pause');`

* __resume:__  Resumes the timer, once paused. The timer must be created with a call to init first.

    `$('#myElem').polartimer('resume');`

* __reset:__  Resets the timer the initial position, stops the animation, and cancels the callback timeout. The timer must be created with a call to init first.

    `$('#myElem').polartimer('reset');`

* __destroy:__  Completely removes all data related to the timer as well as the SVG canvas element from the DOM. The timer may not be used again after this call, as it is destructive. Therefore for subsequent use, a new timer must be created with a call to init.

    `$('#myElem').polartimer('destroy');`


License
-------

![Creative Commons license logo](http://i.creativecommons.org/l/by/3.0/88x31.png)

polartimer jQuery plugin by [Connor Doyle](mailto:connor@oneorangesoftware.com)
is licensed under a [Creative Commons Attribution 3.0 Unported License](http://creativecommons.org/licenses/by/3.0/).
Based in part on a work at http://blakek.us/css3-pie-graph-timer-with-jquery/.
