/** 
* @wearejust/navigate 
* Animated navigation on one-pagers using anchors. 
* 
* @version 1.12.1 
* @author Emre Koc <emre.koc@wearejust.com> 
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.init = init;
var $body = $('body');
var $bodyHtml = $('body, html');
var $window = $(window);
var changePoint = void 0;
var hash = '';
var hashInit = void 0;
var items = void 0;
var resizeTimeout = void 0;
var animating = void 0;

var options = {
    active: 'active',
    history: true,
    item: '.navigate-item',
    prefix: 'navigate-',
    replace: false,
    resetAtTop: true,
    offset: 0,
    speed: 500
};

function init(opts) {
    options = _extends(options, opts || {});
    options.historyAvailable = !!history.pushState;

    if (!items) {
        items = [];

        $window.on('resize', resize);
        $window.on('scroll', scroll);

        if (options.history) {
            hashInit = !!location.hash.replace('#', '');
            $window.on('hashchange', hashchange);
        }
    }

    $(options.item).each(function (index, item) {
        item = $(item);
        if (!item.data('navigate')) {
            item = { 'element': item };
            item.element.on('click', click);
            item.hash = item.element.attr('href');
            item.id = item.hash.replace('#', '');

            if (!item.id) {
                item.target = $body;
            } else {
                item.target = $(item.hash + ', #' + options.prefix + item.id);
                if (!item.target.data('navigate')) {
                    item.target.data('navigate', item);
                    if (options.history) {
                        item.target.attr('id', options.prefix + item.id);
                    }
                }
            }

            item.element.data('navigate', item);
            items.push(item);
        }
    });

    $('img').on('load', resize);
    resize();
}

function click(e) {
    e.preventDefault();
    resize();

    var item = $(e.currentTarget).data('navigate');
    if (options.history) {
        change(item.hash);
    } else {
        select(item.id);
        slide(item.top);
    }
}

function resize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeCalculate, 100);
}

function resizeCalculate() {
    changePoint = $window.height() / 2;

    var i = void 0,
        item = void 0;
    for (i = 0; i < items.length; i++) {
        item = items[i];
        item.top = item.target.offset().top;
    }

    items.sort(function (a, b) {
        return a.top < b.top ? -1 : a.top > b.top ? 1 : 0;
    });

    if (hashInit) {
        hashInit = false;
        hashchange();
    } else {
        scroll();
    }
}

function scroll() {
    if (!animating) {
        var i = void 0,
            b = void 0,
            item = void 0,
            top = $window.scrollTop() + changePoint;
        if (!options.resetAtTop || top > changePoint) {
            for (i = items.length - 1; i >= 0; i--) {
                item = items[i];
                if (item.top <= top) {
                    b = true;
                    if (hash != item.id) {
                        if (options.history) {
                            change(item.hash, true);
                        } else {
                            select(item.id);
                        }
                    }
                    break;
                }
            }
        }

        if (!b) {
            if (hash) {
                change('#', true);
            } else {
                select();
            }
        }
    }
}

function change(hash, prevent) {

    if (options.replace) {
        if (options.historyAvailable) {
            history.replaceState(null, '', hash);
        } else {
            window.location.replace(window.location.pathname + hash);
        }
    } else {
        if (options.historyAvailable) {
            history.pushState(null, '', hash);
        } else {
            window.location.hash = hash;
        }
    }
    hashchange(null, prevent);
}

function hashchange(e, prevent) {

    var h = location.hash.replace('#', '');
    if (hash != h || !e) {
        hash = h;
        var i = void 0,
            item = void 0;
        for (i = 0; i < items.length; i++) {
            item = items[i];
            item.element.toggleClass(options.active, item.id == hash);
            if (!prevent && item.id == hash) {
                slide(item.top);
            }
        }
    }
}

function select(id) {
    var i = void 0,
        item = void 0;
    for (i = 0; i < items.length; i++) {
        item = items[i];
        item.element.toggleClass(options.active, item.id == id);
    }
}

function slide(top) {
    animating = true;
    top = top - options.offset;
    $bodyHtml.stop(true).animate({ 'scrollTop': top }, options.speed, function () {
        animating = false;
    });
}