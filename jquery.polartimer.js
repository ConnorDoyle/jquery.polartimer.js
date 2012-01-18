(function($) {
    var seconds_left;

    $.fn.polartimer = function(method) {
        // Method calling logic
        if(methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if( typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.polartimer');
        }
    };
    var methods = {
        init : function(options) {
            var state = {
                timerSeconds : 10,
                callback : function() {
                },
                color : '#CCC',
                opacity : 1
            };
            state = $.extend(state, options);

            return this.each(function() {
                var $this = $(this);
                var data = $this.data('polartimer');
                if(!data) {
                    $this.addClass('polartimer');
                    $this.height($this.width());
                    state.timer = null;
                    state.timerCurrent = 0;
                    state.pi2 = Math.PI * 2;
                    state.piOver2 = Math.PI / 2;
                    state.width = $this.width();
                    state.height = $this.height();
                    state.raphael = Raphael($this.context, state.width, state.height);
                    $this.data('polartimer', state);
                }
            });
        },
        stopWatch : function() {
            return this.each(function() {
                var data = $(this).data('polartimer');
                if(data) {
                    var seconds = (data.timerFinish - (new Date().getTime())) / 1000;
                    if(seconds <= 0) {
                        clearInterval(data.timer);
                        $(this).polartimer('drawTimer', 100);
                        data.callback();
                    } else {
                        var percent = 100 - ((seconds / (data.timerSeconds)) * 100);
                        $(this).polartimer('drawTimer', percent);
                    }
                }
            });
        },
        drawTimer : function(percent) {
            return this.each(function() {
                $this = $(this);
                var data = $this.data('polartimer');
                if(data) {
                    var w = data.width;
                    var h = data.height;
                    var cx = w / 2;

                    data.raphael.clear();

                    if(percent == 100) {
                        data.raphael.circle(cx, cx, cx).attr({
                            fill : data.color,
                            stroke : 'none',
                            opacity : data.opacity
                        });
                    } else {
                        percent_left = percent;

                        var theta = data.pi2 * percent / 100 - data.piOver2;

                        var x1 = Math.cos(theta) * cx + cx;
                        var y1 = Math.sin(theta) * cx + cx;

                        var longArcFlag = (percent <= 50) ? 0 : 1;

                        var path = "M" + cx + "," + cx + " L" + cx + ",0 ";
                        path += "A" + cx + "," + cx + " 0 " + longArcFlag + ",1 " + x1 + "," + y1 + " ";
                        path += "L" + cx + "," + cx + "z";

                        var frame = data.raphael.path(path);
                        frame.attr({
                            fill : data.color,
                            stroke : 'none',
                            opacity : data.opacity
                        });
                    }
                }
            });
        },
        pause : function() {
            return this.each(function() {
                var data = $(this).data('polartimer');
                seconds_left = (data.timerFinish - (new Date().getTime())) / 1000;
                if(data) {

                    clearInterval(data.timer);
                }
            });
        },
        resume : function() {
            return this.each(function() {
                var data = $(this).data('polartimer');
                if(data) {
                    clearInterval(data.timer);
                    data.timerFinish = new Date().getTime() + (seconds_left * 1000);
                    $(this).polartimer('drawTimer', 0);
                    data.timer = setInterval("$this.polartimer('stopWatch')", 50);
                }
            });
        },
        start : function() {
            return this.each(function() {
                var data = $(this).data('polartimer');
                if(data) {
                    clearInterval(data.timer);
                    data.timerFinish = new Date().getTime() + (data.timerSeconds * 1000);
                    $(this).polartimer('drawTimer', 0);
                    data.timer = setInterval("$this.polartimer('stopWatch')", 50);
                }
            });
        },
        reset : function() {
            return this.each(function() {
                var data = $(this).data('polartimer');
                if(data) {
                    clearInterval(data.timer);
                    $(this).polartimer('drawTimer', 0);
                }
            });
        },
        destroy : function() {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data('polartimer');
                if(data) {
                    clearInterval(data.timer);
                    data.raphael.remove();
                    $this.removeData('polartimer');
                }
            });
        }
    };
})(jQuery);
